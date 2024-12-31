import React, { useState } from "react";
import "./GameSettings.scss";
function GameSettings({
  handleStartGame,
}: {
  handleStartGame: ({ numCols, numRows, numMines }: Partial<GameState>) => void;
}) {
  const [numCols, setNumCols] = useState(3);
  const [numRows, setNumRows] = useState(3);
  const [numMines, setNumMines] = useState(2);
  const [error, setError] = useState("");

  const formSanetizer = () => {
    let isOk = true;
    let error = "";
    if (!numCols) {
      isOk = false;
      error = "Number of Columns must be greater than 0";
    } else if (!numRows) {
      isOk = false;
      error = "Number of Rows must be greater than 0";
    } else if (!numMines) {
      isOk = false;
      error = "Number of Mines must be greater than 0";
    } else if (numMines >= numRows * numCols) {
      isOk = false;
      error = "Number of Mines should be less than number of all Tiles";
    }
    return {
      ok: isOk,
      error,
    };
  };

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formSanetizeStatus = formSanetizer();
    if (formSanetizeStatus.ok) {
      handleStartGame({ numCols, numRows, numMines });
      setError("");
    } else {
      setError(formSanetizeStatus.error);
    }
  }
  return (
    <form className="game-settings" onSubmit={(e) => handleFormSubmit(e)}>
      <div className="options-wrapper">
        <div className="option">
          Number of Columns
          <input
            type="number"
            onChange={(e) => setNumCols(parseInt(e.target.value) || 0)}
            value={numCols}
            placeholder="Number of Columns"
          />
        </div>
        <div className="option">
          Number of Rows
          <input
            type="number"
            onChange={(e) => setNumRows(parseInt(e.target.value))}
            value={numRows}
            placeholder="Number of Rows"
          />
        </div>
        <div className="option">
          Number of Mines
          <input
            type="number"
            onChange={(e) => setNumMines(parseInt(e.target.value))}
            value={numMines}
            placeholder="Number of Mines"
          />
        </div>
      </div>
      {error && error !== "" ? <p className="error">{error}</p> : null}
      <button type="submit">Start Game</button>
    </form>
  );
}

export default GameSettings;
