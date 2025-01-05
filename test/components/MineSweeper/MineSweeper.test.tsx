import {
  render,
  screen,
  fireEvent,
  within,
  cleanup,
} from "@testing-library/react";
import MineSweeper from "../../../src/components/MineSweeper/MineSweeper";
import { Game_STATUSES, TILE_STATUSES } from "../../../src/utils/utils";

const createMockGameState = () => ({
  tilesState: [
    [
      {
        tileId: "1",
        status: TILE_STATUSES.INIT,
        hasMine: false,
        approximity: 1,
        adjustentTiles: [],
      },
      {
        tileId: "2",
        status: TILE_STATUSES.INIT,
        hasMine: true,
        approximity: 0,
        adjustentTiles: [],
      },
    ],
    [
      {
        tileId: "3",
        status: TILE_STATUSES.INIT,
        hasMine: false,
        approximity: 1,
        adjustentTiles: [],
      },
      {
        tileId: "4",
        status: TILE_STATUSES.INIT,
        hasMine: false,
        approximity: 1,
        adjustentTiles: [],
      },
    ],
  ],
  numMines: 1,
  numRows: 2,
  numCols: 2,
  time: 0,
});

describe("MineSweeper Component test suite", () => {
  const mockOnGameStatusChange = jest.fn();

  beforeEach(() => {
    cleanup(); // Ensure everything is cleaned up before each test
    mockOnGameStatusChange.mockReset(); // Reset the mock function

    render(
      <MineSweeper
        gameState={createMockGameState()} // Use the function to get a fresh game state
        onGameStatuschange={mockOnGameStatusChange}
      />
    );
  });

  test("renders correctly with initial state", () => {
    expect(screen.getByRole("flag-count")).toBeInTheDocument(); // Check flag count
    expect(screen.getByRole("timer")).toBeInTheDocument(); // Check timer
  });

  test("pauses the game", () => {
    fireEvent.click(screen.getByRole("pause-game"));
    expect(mockOnGameStatusChange).toHaveBeenCalledWith(Game_STATUSES.PAUSED);
  });

  test("resume the game", () => {
    fireEvent.click(screen.getByRole("pause-game"));
    fireEvent.click(screen.getByRole("resume-game"));
    expect(mockOnGameStatusChange).toHaveBeenCalledWith(Game_STATUSES.RUNNING);
  });

  test("opens a tile without a mine", () => {
    fireEvent.click(screen.getByTestId("1"));
    expect(mockOnGameStatusChange).not.toHaveBeenCalledWith(Game_STATUSES.LOST); // Game should not be lost
  });

  test("loses the game when clicking on a mine", () => {
    fireEvent.click(screen.getByTestId("2"));
    expect(mockOnGameStatusChange).toHaveBeenCalledWith(Game_STATUSES.LOST);
  });

  test("flags a tile", () => {
    const tile = screen.getByTestId("3");
    fireEvent.contextMenu(tile);
    expect(tile.classList).toContain("flagged");
  });

  test("unflags a tile", () => {
    const tile = screen.getByTestId("3");
    fireEvent.contextMenu(tile);
    fireEvent.contextMenu(tile);
    const overlay = within(tile).getByRole("overlay");
    fireEvent.contextMenu(overlay);
    expect(tile.classList).not.toContain("flagged");
  });

  test("wins the game when all none mines are open and mines flagged", () => {
    fireEvent.click(screen.getByTestId("1"));
    fireEvent.click(screen.getByTestId("3"));
    fireEvent.click(screen.getByTestId("4"));
    fireEvent.contextMenu(screen.getByTestId("2"));
    expect(mockOnGameStatusChange).toHaveBeenCalledWith(Game_STATUSES.WON);
  });
});
