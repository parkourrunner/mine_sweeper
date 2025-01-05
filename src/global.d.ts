// global.d.ts
import "@testing-library/jest-dom";

declare global {
  // Extend Jest matchers
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      // Add other matchers as needed
    }
  }

  type GameState = {
    time: number;
    numCols: number;
    numRows: number;
    numMines: number;
    tilesState: TileState[][];
  };
  type TileState = {
    tileId: string;
    hasMine: boolean;
    approximity: number;
    adjustentTiles: TileState[];
    status: typeof TILE_STATUSES;
  };
}
