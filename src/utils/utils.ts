export enum TILE_STATUSES {
  INIT = "init",
  OPEN = "open",
  FLAGGED = "flagged",
}
export enum Game_STATUSES {
  INIT = "init",
  RUNNING = "running",
  PAUSED = "paused",
  WON = "won",
  LOST = "lost",
}

export function gameStateGenerator({
  numCols = 0,
  numRows = 0,
  numMines = 0,
}: Partial<GameState>): GameState {
  const tilesState: TileState[][] = Array(numRows);
  for (let i = 0; i < numRows; i++) {
    tilesState[i] = Array(numCols);
    for (let j = 0; j < numCols; j++) {
      tilesState[i][j] = {
        tileId: `${i + 1}-${j + 1}`,
        status: TILE_STATUSES.INIT,
        approximity: 0,
        hasMine: false,
        adjustentTiles: [],
      };
    }
  }
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const tile = tilesState[i][j];
      //Upper Row
      if (i - 1 >= 0) {
        if (j - 1 >= 0) {
          tile.adjustentTiles.push(tilesState[i - 1][j - 1]);
        }
        tile.adjustentTiles.push(tilesState[i - 1][j]);
        if (j + 1 <= numCols - 1) {
          tile.adjustentTiles.push(tilesState[i - 1][j + 1]);
        }
      }
      // Same row
      if (j - 1 >= 0) {
        tile.adjustentTiles.push(tilesState[i][j - 1]);
      }
      if (j + 1 <= numCols - 1) {
        tile.adjustentTiles.push(tilesState[i][j + 1]);
      }
      // Lower Row
      if (i + 1 <= numRows - 1) {
        tile.adjustentTiles.push(tilesState[i + 1][j]);
        if (j - 1 >= 0) {
          tile.adjustentTiles.push(tilesState[i + 1][j - 1]);
        }
        if (j + 1 <= numCols - 1) {
          tile.adjustentTiles.push(tilesState[i + 1][j + 1]);
        }
      }
    }
  }

  let minesPlaced = 0;
  while (minesPlaced < numMines) {
    const randRow = Math.round(Math.random() * (numRows - 1));
    const randCol = Math.round(Math.random() * (numCols - 1));
    const tile = tilesState[randRow][randCol];
    if (!tile.hasMine) {
      tile.hasMine = true;
      tile.adjustentTiles.forEach((adj) => adj.approximity++);
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
