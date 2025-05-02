import { database } from './firebaseConfig';
import { ref, get, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';

// Function to get the questions for a subject
const getQuestions = async (subject) => {
  try {
    const questionsRef = ref(database, `Questions/${subject}`);
    const snapshot = await get(questionsRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log(`No questions found for subject: ${subject}`);
      return [];
    }
  } catch (error) {
    console.error("Error fetching questions: ", error.message);
    throw new Error(error.message);
  }
};

// Function to save test results for a user
const saveResult = async (userId, resultData) => {
  try {
    const questions = await getQuestions(resultData.subject);
    if (!questions || questions.length === 0) {
      throw new Error(`No questions found for subject: ${resultData.subject}`);
    }

    const userAnswers = resultData.answers || [];
    let gotScore = 0;
    const totalScore = questions.length;

    // Calculate the score
    questions.forEach((question, index) => {
      if (index < userAnswers.length && userAnswers[index] === question.correctOption) {
        gotScore += 1;
      }
    });

    // Get current user email
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const userEmail = currentUser ? currentUser.email : "unknown";

    // Save subject result
    const subjectRef = ref(database, `Results/${userId}/${resultData.subject}`);
    await set(subjectRef, {
      ...resultData,
      score: gotScore,
      total: totalScore
    });

    // Save email at user level (one time)
    const emailRef = ref(database, `Results/${userId}/email`);
    await set(emailRef, userEmail);

    console.log(`${resultData.subject} result saved successfully for user ${userId}`);
  } catch (error) {
    console.error("Error saving result: ", error.message);
    throw new Error(error.message);
  }
};

// Function to check if a test is already submitted for a user and subject
const checkIfTestSubmitted = async (userId, subject) => {
  try {
    const resultRef = ref(database, `Results/${userId}/${subject}`);
    const snapshot = await get(resultRef);
    return snapshot.exists();
  } catch (error) {
    console.error("Error checking test submission: ", error.message);
    throw new Error(error.message);
  }
};

// Function to fetch all students and their test results
const getStudentsWithResults = async () => {
  try {
    const resultsRef = ref(database, 'Results');
    const snapshot = await get(resultsRef);
    if (!snapshot.exists()) {
      console.log("No student results found.");
      return [];
    }

    const resultsData = snapshot.val();
    const students = Object.keys(resultsData).map((userId) => {
      const studentData = resultsData[userId];
      const email = studentData.email || userId;

      const resultDetails = Object.entries(studentData)
        .filter(([key]) => key !== 'email')
        .map(([subject, result]) => ({
          subject,
          score: result.score || 0,
          total: result.total || 0
        }));

      return {
        email,
        results: resultDetails,
      };
    });

    return students;
  } catch (error) {
    console.error("Error fetching students with results: ", error.message);
    throw new Error(error.message);
  }
};

export { 
  getQuestions, 
  saveResult, 
  checkIfTestSubmitted, 
  getStudentsWithResults 
};
