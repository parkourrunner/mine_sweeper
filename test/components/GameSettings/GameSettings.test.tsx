import { render, screen, fireEvent } from "@testing-library/react";
import GameSettings from "../../../src/components/GameSettings/GameSettings";

describe("GameSettings Component test suite", () => {
  const mockHandleStartGame = jest.fn();

  beforeEach(() => {
    mockHandleStartGame.mockClear();
    render(<GameSettings handleStartGame={mockHandleStartGame} />);
  });

  test("renders correctly with initial state", () => {
    expect(screen.getByPlaceholderText("Number of Columns")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Number of Rows")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Number of Mines")).toBeInTheDocument();
    expect(screen.getByText("Start Game")).toBeInTheDocument();
  });

  test("submits valid form", () => {
    fireEvent.change(screen.getByPlaceholderText("Number of Columns"), {
      target: { value: "6" },
    });
    fireEvent.change(screen.getByPlaceholderText("Number of Rows"), {
      target: { value: "6" },
    });
    fireEvent.change(screen.getByPlaceholderText("Number of Mines"), {
      target: { value: "2" },
    });
    fireEvent.click(screen.getByText("Start Game"));

    expect(mockHandleStartGame).toHaveBeenCalledWith({
      numCols: 6,
      numRows: 6,
      numMines: 2,
    });
    expect(screen.queryByText("Number of Mines should be less than number of all Tiles")).toBeNull();
  });

  test("shows error for number of columns less than or equal to 0", () => {
    fireEvent.change(screen.getByPlaceholderText("Number of Columns"), {
      target: { value: "0" },
    });
    fireEvent.click(screen.getByText("Start Game"));

    expect(screen.getByText("Number of Columns must be greater than 0")).toBeInTheDocument();
    expect(mockHandleStartGame).not.toHaveBeenCalled();
  });

  test("shows error for number of rows less than or equal to 0", () => {
    fireEvent.change(screen.getByPlaceholderText("Number of Rows"), {
      target: { value: "0" },
    });
    fireEvent.click(screen.getByText("Start Game"));

    expect(screen.getByText("Number of Rows must be greater than 0")).toBeInTheDocument();
    expect(mockHandleStartGame).not.toHaveBeenCalled();
  });

  test("shows error for number of mines less than or equal to 0", () => {
    fireEvent.change(screen.getByPlaceholderText("Number of Mines"), {
      target: { value: "0" },
    });
    fireEvent.click(screen.getByText("Start Game"));

    expect(screen.getByText("Number of Mines must be greater than 0")).toBeInTheDocument();
    expect(mockHandleStartGame).not.toHaveBeenCalled();
  });

  test("shows error when number of mines exceeds total tiles", () => {
    fireEvent.change(screen.getByPlaceholderText("Number of Columns"), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByPlaceholderText("Number of Rows"), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByPlaceholderText("Number of Mines"), {
      target: { value: "5" },
    });
    fireEvent.click(screen.getByText("Start Game"));

    expect(screen.getByText("Number of Mines should be less than number of all Tiles")).toBeInTheDocument();
    expect(mockHandleStartGame).not.toHaveBeenCalled();
  });

  test("clears error message on valid submission after invalid inputs", () => {
    fireEvent.change(screen.getByPlaceholderText("Number of Columns"), {
      target: { value: "0" },
    });
    fireEvent.click(screen.getByText("Start Game"));
    
    expect(screen.getByText("Number of Columns must be greater than 0")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Number of Columns"), {
      target: { value: "6" },
    });
    fireEvent.change(screen.getByPlaceholderText("Number of Rows"), {
      target: { value: "6" },
    });
    fireEvent.change(screen.getByPlaceholderText("Number of Mines"), {
      target: { value: "2" },
    });
    fireEvent.click(screen.getByText("Start Game"));

    expect(screen.queryByText("Number of Columns must be greater than 0")).toBeNull();
    expect(mockHandleStartGame).toHaveBeenCalledWith({ numCols: 6, numRows: 6, numMines: 2 });
  });
});