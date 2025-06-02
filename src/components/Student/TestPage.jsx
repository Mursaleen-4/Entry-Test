import React, { useState, useEffect, useCallback } from 'react';
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
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const fetchedQuestions = await getQuestions(subject);
        if (!fetchedQuestions || fetchedQuestions.length === 0) {
          setError('No questions found for this subject');
          return;
        }
        const questionsWithIds = fetchedQuestions.map((q, index) => ({ ...q, id: index }));
        setQuestions(questionsWithIds);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setError('Failed to load questions. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [subject]);

  useEffect(() => {
    const checkSubmission = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const userId = user.uid;
          const submitted = await checkIfTestSubmitted(userId, subject);
          setIsSubmitted(submitted);
        }
      } catch (error) {
        console.error('Error checking submission:', error);
      }
    };
    checkSubmission();
  }, [subject]);

  const handleAutoSubmit = useCallback(async () => {
    if (questions.every((q) => answers[q.id] !== undefined)) {
      await submitTest();
    } else {
      alert('You did not complete all the questions before time ran out.');
      navigate('/student/dashboard');
    }
  }, [questions, answers, submitTest, navigate]);

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
  }, [timer, handleAutoSubmit]);

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
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
      alert('Failed to submit test. Please try again.');
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="test-container">
        <h2>Loading test...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="test-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/student/dashboard')}>Return to Dashboard</button>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="test-container">
        <h2>You have already submitted this test.</h2>
        <button onClick={() => navigate('/student/dashboard')}>Return to Dashboard</button>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="test-container">
        <h2>No questions available for this test.</h2>
        <button onClick={() => navigate('/student/dashboard')}>Return to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="test-container">
      <div className="test-header">
        <h2>{subject} Test</h2>
        <div className="test-timer">
          Time Remaining: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
        </div>
      </div>

      <div className="progress-indicator">
        {questions.map((_, index) => (
          <div
            key={index}
            className={`progress-dot ${index === currentQuestion ? 'active' : ''} ${
              answers[index] !== undefined ? 'completed' : ''
            }`}
          />
        ))}
      </div>

      <form onSubmit={submitTest}>
        {questions.length > 0 && (
          <div className="question-container">
            <p className="question-text">
              {currentQuestion + 1}. {questions[currentQuestion].question}
            </p>
            <div className="options-container">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={`${currentQuestion}-${index}`}
                  type="button"
                  className={`option-button ${
                    answers[questions[currentQuestion].id] === index ? 'selected' : ''
                  }`}
                  onClick={() => handleAnswerChange(questions[currentQuestion].id, index)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="test-navigation">
          <button
            type="button"
            className="nav-button"
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>
          
          {currentQuestion === questions.length - 1 ? (
            <button type="submit" className="nav-button">
              Submit Test
            </button>
          ) : (
            <button
              type="button"
              className="nav-button"
              onClick={nextQuestion}
              disabled={currentQuestion === questions.length - 1}
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TestPage;
