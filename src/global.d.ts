type TilesState = {
  tileId: string;
  status: typeof TILE_STATUSES;
  approximity: number;
  hasMine: boolean;
};
type GameState = {
  numCols: number;
  numRows: number;
  numMines: number;
  tilesState: TilesState[][];
  time: number;
};
