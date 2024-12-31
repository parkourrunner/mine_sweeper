export enum TILE_STATUSES {
  INIT = "init",
  OPEN = "open",
  FLAGGED = "flagged",
  REVEALED = "revealed",
}
export enum Game_STATUSES {
  INIT = "init",
  RUNNING = "running",
  PAUSED = "paused",
  ENDED = "ended",
}

export function gameStateGenerator({
  numCols = 0,
  numRows = 0,
  numMines = 99,
}: Partial<GameState>): GameState {
  const tilesState: TilesState[][] = Array(numRows);
  for (let i = 0; i < numRows; i++) {
    tilesState[i] = Array(numCols);
    for (let j = 0; j < numCols; j++) {
      tilesState[i][j] = {
        tileId: `${i + 1}-${j + 1}`,
        status: TILE_STATUSES.INIT,
        approximity: 0,
        hasMine: false,
      };
    }
  }

  const increaseAdjustentApproximity = (rowInd: number, colInd: number) => {
    //Upper Row
    if (rowInd - 1 >= 0) {
      if (colInd - 1 >= 0) {
        tilesState[rowInd - 1][colInd - 1].approximity++;
      }
      tilesState[rowInd - 1][colInd].approximity++;
      if (colInd + 1 <= numCols - 1) {
        tilesState[rowInd - 1][colInd + 1].approximity++;
      }
    }
    // Same row
    if (colInd - 1 >= 0) {
      tilesState[rowInd][colInd - 1].approximity++;
    }
    if (colInd + 1 <= numCols - 1) {
      tilesState[rowInd][colInd + 1].approximity++;
    }
    // Lower Row
    if (rowInd + 1 <= numRows - 1) {
      tilesState[rowInd + 1][colInd].approximity++;
      if (colInd - 1 >= 0) {
        tilesState[rowInd + 1][colInd - 1].approximity++;
      }
      if (colInd + 1 <= numCols - 1) {
        tilesState[rowInd + 1][colInd + 1].approximity++;
      }
    }
  };
  let minesPlaced = 0;
  while (minesPlaced < numMines) {
    const randRow = Math.round(Math.random() * (numRows - 1));
    const randCol = Math.round(Math.random() * (numCols - 1));
    console.log(randRow, randCol);
    const tile = tilesState[randRow][randCol];
    if (!tile.hasMine) {
      tile.hasMine = true;
      increaseAdjustentApproximity(randRow, randCol);
      minesPlaced++;
    }
  }

  return {
    numCols,
    numRows,
    numMines,
    tilesState,
    time: 0,
  };
}
