export const getRandomQuestions = (questions, numberOfQuestions) => {
    const randomQuestions = [];
    while (randomQuestions.length < numberOfQuestions) {
      const randomIndex = Math.floor(Math.random() * questions.length);
      if (!randomQuestions.includes(questions[randomIndex])) {
        randomQuestions.push(questions[randomIndex]);
      }
    }
    return randomQuestions;
  };
  