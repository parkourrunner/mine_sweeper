import { render, screen, fireEvent, within } from "@testing-library/react";
import Tile from "../../../src/components/Tile/Tile";
import { TILE_STATUSES } from "../../../src/utils/utils";

// Mocking images
jest.mock("../../../src/img/land-mine.png", () => "land-mine.png");
jest.mock("../../../src/img/red-flag.png", () => "red-flag.png");

describe("Tile Component test suite", () => {
  const mockOnTileClick = jest.fn();
  const mockOnTileRightClick = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly for INIT status", () => {
    render(
      <Tile
        tile={{
          tileId: "1",
          status: TILE_STATUSES.INIT,
          hasMine: false,
          approximity: 0,
          adjustentTiles: [],
        }}
        onTileClick={mockOnTileClick}
        onTileRightClick={mockOnTileRightClick}
      />
    );

    const tileElement = screen.getByTestId("1");
    expect(tileElement).toHaveClass("init");
  });

  it("renders correctly for OPEN status without a mine and handles colors", () => {
    const testCases = [
      { tileId: "1", approximity: 1, expectedClass: "blue" },
      { tileId: "2", approximity: 2, expectedClass: "green" },
      { tileId: "3", approximity: 3, expectedClass: "red" },
      { tileId: "4", approximity: 4, expectedClass: "orange" },
      { tileId: "5", approximity: 5, expectedClass: "purple" },
      { tileId: "6", approximity: 6, expectedClass: "aqua" },
      { tileId: "7", approximity: 7, expectedClass: "brown" },
      { tileId: "8", approximity: 8, expectedClass: "cadetblue" },
      { tileId: "9", approximity: 0, expectedClass: "" },
    ];

    testCases.forEach(({ approximity, expectedClass, tileId }) => {
      render(
        <Tile
          tile={{
            tileId,
            status: TILE_STATUSES.OPEN,
            hasMine: false,
            approximity,
            adjustentTiles: [],
          }}
          onTileClick={mockOnTileClick}
          onTileRightClick={mockOnTileRightClick}
        />
      );

      const tileElement = screen.getByTestId(tileId);
      const spanElement = within(tileElement).getByRole("approximity");
      if (approximity > 0) {
        expect(spanElement).toHaveClass(expectedClass);
      } else {
        expect(spanElement).toHaveTextContent("");
      }
    });
  });

  it("handles click event for INIT status", () => {
    render(
      <Tile
        tile={{
          tileId: "1",
          status: TILE_STATUSES.INIT,
          hasMine: false,
          approximity: 0,
          adjustentTiles: [],
        }}
        onTileClick={mockOnTileClick}
        onTileRightClick={mockOnTileRightClick}
      />
    );

    const tileElement = screen.getByTestId("1");
    fireEvent.click(tileElement);
    expect(mockOnTileClick).toHaveBeenCalledWith("1");
  });

  it("renders correctly for OPEN status with a mine", () => {
    render(
      <Tile
        tile={{
          tileId: "2",
          status: TILE_STATUSES.OPEN,
          hasMine: true,
          approximity: 0,
          adjustentTiles: [],
        }}
        onTileClick={mockOnTileClick}
        onTileRightClick={mockOnTileRightClick}
      />
    );

    const landMineImage = screen.getByAltText("land mine");
    expect(landMineImage).toBeInTheDocument();
  });

  it("renders correctly for OPEN status without a mine", () => {
    render(
      <Tile
        tile={{
          tileId: "3",
          status: TILE_STATUSES.OPEN,
          hasMine: false,
          approximity: 2,
          adjustentTiles: [],
        }}
        onTileClick={mockOnTileClick}
        onTileRightClick={mockOnTileRightClick}
      />
    );

    const numberElement = screen.getByText("2");
    expect(numberElement).toBeInTheDocument();
    expect(numberElement).toHaveClass("green"); // Check the color class based on proximity
  });

  it("renders correctly for FLAGGED status", () => {
    render(
      <Tile
        tile={{
          tileId: "4",
          status: TILE_STATUSES.FLAGGED,
          hasMine: false,
          approximity: 0,
          adjustentTiles: [],
        }}
        onTileClick={mockOnTileClick}
        onTileRightClick={mockOnTileRightClick}
      />
    );

    const flagImage = screen.getByAltText("red flag");
    expect(flagImage).toBeInTheDocument();
  });

  it("handles right-click event for INIT status", () => {
    render(
      <Tile
        tile={{
          tileId: "5",
          status: TILE_STATUSES.INIT,
          hasMine: false,
          approximity: 0,
          adjustentTiles: [],
        }}
        onTileClick={mockOnTileClick}
        onTileRightClick={mockOnTileRightClick}
      />
    );

    const tileElement = screen.getByTestId("5");
    fireEvent.contextMenu(tileElement);
    expect(mockOnTileRightClick).toHaveBeenCalledWith("5");
  });

  it("handles right-click event for FLAGGED status", () => {
    render(
      <Tile
        tile={{
          tileId: "5",
          status: TILE_STATUSES.FLAGGED,
          hasMine: false,
          approximity: 0,
          adjustentTiles: [],
        }}
        onTileClick={mockOnTileClick}
        onTileRightClick={mockOnTileRightClick}
      />
    );

    const tileElement = screen.getByTestId("5");
    const overlay = within(tileElement).getByRole("overlay");
    fireEvent.contextMenu(overlay);
    expect(mockOnTileRightClick).toHaveBeenCalledWith("5");
  });
});
