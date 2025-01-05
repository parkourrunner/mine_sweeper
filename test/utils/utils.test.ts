import {
  TILE_STATUSES,
  Game_STATUSES,
  gameStateGenerator,
} from "../../src/utils/utils";
describe("utils test suite", () => {
  describe("TILE_STATUSES Enum", () => {
    it("should have all defined statuses", () => {
      expect(TILE_STATUSES.INIT).toBe("init");
      expect(TILE_STATUSES.OPEN).toBe("open");
      expect(TILE_STATUSES.FLAGGED).toBe("flagged");
    });
  });

  describe("Game_STATUSES Enum", () => {
    it("should have all defined statuses", () => {
      expect(Game_STATUSES.INIT).toBe("init");
      expect(Game_STATUSES.RUNNING).toBe("running");
      expect(Game_STATUSES.PAUSED).toBe("paused");
      expect(Game_STATUSES.WON).toBe("won");
      expect(Game_STATUSES.LOST).toBe("lost");
    });
  });

  describe("gameStateGenerator", () => {
    it("should generate a game state with default parameters", () => {
      const state = gameStateGenerator({});
      expect(state.numCols).toBe(0);
      expect(state.numRows).toBe(0);
      expect(state.numMines).toBe(0);
      expect(state.tilesState).toEqual([]);
      expect(state.time).toBe(0);
    });

    it("should generate a game state with specified parameters", () => {
      const mockInput = { numCols: 3, numRows: 2, numMines: 1 };
      const state = gameStateGenerator(mockInput);
      expect(state.numCols).toBe(mockInput.numCols);
      expect(state.numRows).toBe(mockInput.numRows);
      expect(state.numMines).toBe(mockInput.numMines);
      expect(state.tilesState.length).toBe(mockInput.numRows);
      expect(state.tilesState[0].length).toBe(mockInput.numCols);
    });

    it("should place the correct number of mines", () => {
      const mockInput = { numCols: 3, numRows: 3, numMines: 2 };
      const state = gameStateGenerator(mockInput);
      const mineCount = state.tilesState
        .flat()
        .filter((tile) => tile.hasMine).length;
      expect(mineCount).toBe(mockInput.numMines);
    });

    it("should assign correct proximity values to adjacent tiles", () => {
      const state = gameStateGenerator({ numCols: 2, numRows: 2, numMines: 1 });
      const mineTile = state.tilesState.flat().find((tile) => tile.hasMine);
      expect(mineTile).toBeDefined();
      expect(mineTile.adjustentTiles.length).toBeGreaterThan(0);

      mineTile.adjustentTiles.forEach((tile) => {
        expect(tile.approximity).toBe(1); // Each adjacent tile should have proximity 1
      });
    });
  });
});
