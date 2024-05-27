import { useContext, useEffect } from "react";
import { QuizContext } from "../context/quiz";
import WellDone from "../img/blood research-bro.svg";
import PlayerImage from "../img/image.jpeg";
import "./GameOver.css";

const GameOver = () => {
  const [quizState, dispatch] = useContext(QuizContext);

  useEffect(() => {
    const storedRanking = JSON.parse(localStorage.getItem("ranking")) || [];
    const newRanking = [
      ...storedRanking,
      { name: quizState.playerName, score: quizState.score },
    ];
    newRanking.sort((a, b) => b.score - a.score);
    if (newRanking.length > 5) newRanking.pop();
    localStorage.setItem("ranking", JSON.stringify(newRanking));
  }, [quizState.playerName, quizState.score]);

  const resetRanking = () => {
    localStorage.removeItem("ranking");
    window.location.reload();
  };

  const ranking = JSON.parse(localStorage.getItem("ranking")) || [];

  return (
    <div id="gameover">
      <h2>Game Over!</h2>
      <div className="player-info">
        <div className="player-image">
          <img
            src={quizState.playerImage || PlayerImage}
            alt="Imagem do Jogador"
          />
        </div>
        <div className="player-name-score">
          <p>Player: {quizState.playerName}</p>
          <p>Score: {quizState.score}</p>
        </div>
      </div>
      <img src={WellDone} alt="Fim do Quiz" />
      <button onClick={() => dispatch({ type: "NEW_GAME" })}>Restart</button>

      <div className="ranking">
        <h3>Ranking of the last 5 players</h3>
        <ul>
          {ranking.map((player, index) => (
            <li key={index} className="ranking-item">
              <span className="ranking-position">{index + 1}.</span>
              <span className="ranking-name">{player.name}</span>
              <span className="ranking-score">{player.score} pontos</span>
            </li>
          ))}
        </ul>
        <button className="reset-button" onClick={resetRanking}>
          Reset Ranking
        </button>
      </div>
    </div>
  );
};

export default GameOver;
