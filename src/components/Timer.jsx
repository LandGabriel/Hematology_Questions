// Timer.js
import React, { useState, useEffect } from "react";
import "./Timer.css";

const Timer = ({ duration, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        onTimeout();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, onTimeout]);

  const timerRadius = 50; // Raio do cronômetro
  const circumference = 2 * Math.PI * timerRadius;
  const progress = (1 - timeLeft / duration) * circumference;

  return (
    <div className="timer">
      <svg className="timer-svg">
        <circle
          className="timer-circle"
          cx="50%"
          cy="50%"
          r={timerRadius}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
        />
      </svg>
      <div className="timer-text">{timeLeft}</div>
    </div>
  );
};

export default Timer;
