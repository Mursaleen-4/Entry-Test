import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuestions, saveResult, checkIfTestSubmitted } from '../../services/dataService';
import { getAuth } from 'firebase/auth';
import '../../styles/test.css';

const TestPage = () => {
  const { subject } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(600);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const fetchedQuestions = await getQuestions(subject);
      const questionsWithIds = fetchedQuestions.map((q, index) => ({ ...q, id: index }));
      setQuestions(questionsWithIds);
    };
    fetchQuestions();
  }, [subject]);

  useEffect(() => {
    const checkSubmission = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        const submitted = await checkIfTestSubmitted(userId, subject);
        setIsSubmitted(submitted);
      }
    };
    checkSubmission();
  }, [subject]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    if (timer === 0) {
      clearInterval(interval);
      alert('Time is up! Submitting your test automatically.');
      handleAutoSubmit();
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleAutoSubmit = async () => {
    if (questions.every((q) => answers[q.id] !== undefined)) {
      await submitTest();
    } else {
      alert('You did not complete all the questions before time ran out.');
      navigate('/student/dashboard');
    }
  };

  const submitTest = async (e) => {
    if (e) e.preventDefault();

    const allAnswered = questions.every((q) => answers[q.id] !== undefined);
    if (!allAnswered) {
      alert('Please answer all the questions before submitting the test.');
      return;
    }

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        alert('User not authenticated.');
        return;
      }

      const userId = user.uid;
      let correctCount = 0;

      const userAnswers = questions.map((q) => {
        const selected = answers[q.id];
        if (selected === q.correctOption) correctCount++;
        return selected;
      });

      const resultData = {
        subject,
        answers: userAnswers,
        score: correctCount,
        total: questions.length,
      };

      await saveResult(userId, resultData);
      alert('Test submitted successfully!');
      navigate('/student/dashboard');
    } catch (error) {
      console.error('Error submitting test:', error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="test-container">
        <h2>You have already submitted this test.</h2>
      </div>
    );
  }

  return (
    <div className="test-container">
      <h2>Test: {subject}</h2>
      <div>Time remaining: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}</div>
      <form onSubmit={submitTest}>
        {questions.map((question) => (
          <div key={question.id} className="question-container">
            <p>{question.question}</p>
            {question.options.map((option, index) => (
              <label key={`${question.id}-${index}`} className="option-label">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={index}
                  checked={answers[question.id] === index}
                  onChange={() => handleAnswerChange(question.id, index)}
                />
                {option}
              </label>
            ))}
          </div>
        ))}
        <button type="submit">Submit Test</button>
      </form>
    </div>
  );
};

export default TestPage;
