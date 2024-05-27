// Welcome.js
import React, { useState, useContext } from "react";
import { QuizContext } from "../context/quiz";
import "./Welcome.css";
import Quiz from "../img/question.jpg";

const Welcome = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  const [name, setName] = useState("");

  const startQuiz = () => {
    if (name.trim() === "") {
      alert("Por favor, insira seu nome.");
      return;
    }

    dispatch({ type: "SET_PLAYER_NAME", payload: name });
    dispatch({ type: "CHANGE_STAGE" });

    // Verifica se todas as respostas foram respondidas
    if (quizState.currentQuestion === quizState.questions.length) {
      dispatch({ type: "CHANGE_QUESTION" }); // Muda para a tela de Game Over
    }
  };

  return (
    <div id="welcome">
      <img src={Quiz} alt="Start of quiz" />
      <h2 className="name">Enter your name</h2>
      <input
        className="player"
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={startQuiz}>START</button>
    </div>
  );
};

export default Welcome;
