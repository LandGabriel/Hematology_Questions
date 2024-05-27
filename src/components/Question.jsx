// Question.js

import React, { useContext, useState, useEffect } from "react";
import { QuizContext } from "../context/quiz";
import Option from "./Option";
import Timer from "./Timer";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./Question.css";

const Question = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  const currentQuestion = quizState.questions[quizState.currentQuestion];
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerConfirmed, setIsAnswerConfirmed] = useState(false);
  const [key, setKey] = useState(0);

  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  useEffect(() => {
    const answeredQuestion = answeredQuestions.find(
      (item) => item.index === quizState.currentQuestion
    );
    if (answeredQuestion) {
      setSelectedOption(answeredQuestion.option);
      setIsAnswerConfirmed(true);
    } else {
      setSelectedOption(null);
      setIsAnswerConfirmed(false);
    }
  }, [quizState.currentQuestion, answeredQuestions]);

  const onSelectOption = (option) => {
    if (!isAnswerConfirmed) {
      setSelectedOption(option);
    }
  };

  const onConfirmAnswer = () => {
    if (!isAnswerConfirmed && selectedOption) {
      setIsAnswerConfirmed(true);
      dispatch({
        type: "CHECK_ANSWER",
        payload: { answer: currentQuestion.answer, option: selectedOption },
      });
      setAnsweredQuestions([
        ...answeredQuestions,
        { index: quizState.currentQuestion, option: selectedOption },
      ]);
    }
  };

  const onNextQuestion = () => {
    setKey((prevKey) => prevKey + 1);
    dispatch({ type: "CHANGE_QUESTION" });
  };

  const onSkipQuestion = () => {
    setKey((prevKey) => prevKey + 1);
    dispatch({ type: "CHANGE_QUESTION" });
  };

  const onPreviousQuestion = () => {
    if (quizState.currentQuestion > 0) {
      dispatch({ type: "PREVIOUS_QUESTION" });
    }
  };

  return (
    <div id="question" className="question-page">
      <button className="back-button" onClick={onPreviousQuestion}>
        &larr; Previous
      </button>

      <div className="timer-container">
        <Timer duration={60} onTimeout={onSkipQuestion} key={key} />
      </div>
      <TransitionGroup>
        <CSSTransition
          key={quizState.currentQuestion}
          timeout={500}
          classNames="fade"
        >
          <div>
            <p>
              Question {quizState.currentQuestion + 1} of{" "}
              {quizState.questions.length}
            </p>
            <h2>{currentQuestion.question}</h2>
            <div id="options-container">
              {currentQuestion.options.map((option) => (
                <Option
                  option={option}
                  key={option}
                  selectOption={() => onSelectOption(option)}
                  hide={quizState.optionToHide === option ? "hide" : null}
                  selected={selectedOption === option}
                  isCorrect={
                    option === currentQuestion.answer && isAnswerConfirmed
                  }
                  isWrong={
                    selectedOption === option &&
                    selectedOption !== currentQuestion.answer &&
                    isAnswerConfirmed
                  }
                  disabled={isAnswerConfirmed}
                />
              ))}
            </div>
            {!isAnswerConfirmed && selectedOption && (
              <div className="button-container">
                <button className="skip-button" onClick={onSkipQuestion}>
                  Skip
                </button>
                <button onClick={onConfirmAnswer}>Confirm Answer</button>
              </div>
            )}
            {isAnswerConfirmed && (
              <button className="next-button" onClick={onNextQuestion}>
                Confirm
              </button>
            )}
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default Question;
