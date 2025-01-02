type TileState = {
  tileId: string;
  hasMine: boolean;
  approximity: number;
  adjustentTiles: TileState[];
  status: typeof TILE_STATUSES;
};
type GameState = {
  time: number;
  numCols: number;
  numRows: number;
  numMines: number;
  tilesState: TileState[][];
};
