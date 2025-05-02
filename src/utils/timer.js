export const startTimer = (timeInSeconds, onTick, onComplete) => {
    let timeLeft = timeInSeconds;
    const interval = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(interval);
        onComplete();
      } else {
        onTick(timeLeft);
        timeLeft--;
      }
    }, 1000);
  };
  