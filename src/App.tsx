import { useState } from "react";
import "./App.scss";
import { Game_STATUSES, gameStateGenerator } from "./utils/utils";
import MineSweeper from "./components/MineSweeper/MineSweeper";
import GameSettings from "./components/GameSettings/GameSettings";

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
  function onGameStatuschange(status: Game_STATUSES) {
    setGameStatus(status);
  }
  return (
    <>
      {[Game_STATUSES.INIT].includes(gameStatus) ? (
        <GameSettings handleStartGame={handleStartGame} />
      ) : null}
      {gameState !== null && gameStatus !== Game_STATUSES.INIT ? (
        <MineSweeper
          gameState={gameState}
          onGameStatuschange={onGameStatuschange}
        />
      ) : null}
    </>
  );
}

export default App;
