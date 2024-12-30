export enum TILE_STATUSES {
  INIT = "init",
  OPEN = "open",
  FLAGGED = "flagged",
  REVEALED = "revealed",
}

export type GameState = {
  numCols: number,
  numrow: number,
  numMines: number,
  gridState: [],
  time: number,
}