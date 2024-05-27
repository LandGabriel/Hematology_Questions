// Option.js
import React from "react";
import "./Option.css";

const Option = ({
  option,
  selectOption,
  selected,
  isCorrect,
  isWrong,
  disabled,
}) => {
  let className = "option";
  if (selected) className += " selected";
  if (isCorrect) className += " correct";
  if (isWrong) className += " wrong";

  return (
    <div className={className} onClick={!disabled ? selectOption : null}>
      {option}
    </div>
  );
};

export default Option;
