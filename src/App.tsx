import { useState } from "react";
import "./App.scss";
import { Game_STATUSES, gameStateGenerator } from "./utils/utils";
import MineSweeper from "./components/MineSweeper/MineSweeper";
import GameSettings from "./components/GmaeSettings/GameSettings";

function App() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [gameStatus, setGameStatus] = useState(Game_STATUSES.INIT);

  function handleStartGame({
    numCols = 0,
    numRows = 0,
    numMines = 0,
  }: Partial<GameState>) {
    setGameState(gameStateGenerator({ numCols, numRows, numMines }));
    setGameStatus(Game_STATUSES.RUNNING);
  }
  return (
    <>
      {[
        Game_STATUSES.INIT,
        Game_STATUSES.WON,
        Game_STATUSES.LOST,
        Game_STATUSES.PAUSED,
      ].includes(gameStatus) ? (
        <GameSettings handleStartGame={handleStartGame} />
      ) : null}
      {gameState !== null && gameStatus !== Game_STATUSES.PAUSED ? (
        <MineSweeper gameState={gameState} gameStatus={gameStatus} />
      ) : null}
    </>
  );
}

export default App;
