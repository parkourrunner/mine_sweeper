import "./MineSweeper.scss";
import Tile from "../Tile/Tile";
import { TILE_STATUSES } from "../../utils/utils";
function MineSweeper({
  gameState,
  gameStatus,
}: {
  gameState: GameState;
  gameStatus: string;
}) {
  if (!gameState) {
    return "No game State";
  }
  function handleTileClick(tileId: string) {
    console.log(tileId);
  }
  console.log(gameState);
  console.log(gameStatus);
  return (
    <>
      <div className="mine-sweeper">
        {gameState.tilesState.map((row, index) => (
          <div className="row" key={"row-" + index + 1}>
            {row.map((tile) => (
              <Tile key={tile.tileId} state={{ ...tile, handleTileClick }} />
            ))}
          </div>
        ))}
      </div>

      {/* Remove below later */}
      <div style={{display:"flex", marginTop:"10px"}}>
        <Tile
          state={{
            tileId: "1-2",
            status: TILE_STATUSES.OPEN,
            approximity: 0,
            hasMine: false,
            handleTileClick,
          }}
        />
        <Tile
          state={{
            tileId: "1-3",
            status: TILE_STATUSES.OPEN,
            approximity: 1,
            hasMine: false,
            handleTileClick,
          }}
        />
        <Tile
          state={{
            tileId: "1-4",
            status: TILE_STATUSES.OPEN,
            approximity: 2,
            hasMine: false,
            handleTileClick,
          }}
        />
        <Tile
          state={{
            tileId: "1-4",
            status: TILE_STATUSES.OPEN,
            approximity: 3,
            hasMine: false,
            handleTileClick,
          }}
        />
        <Tile
          state={{
            tileId: "1-4",
            status: TILE_STATUSES.OPEN,
            approximity: 4,
            hasMine: false,
            handleTileClick,
          }}
        />
        <Tile
          state={{
            tileId: "1-4",
            status: TILE_STATUSES.OPEN,
            approximity: 5,
            hasMine: false,
            handleTileClick,
          }}
        />
        <Tile
          state={{
            tileId: "1-4",
            status: TILE_STATUSES.OPEN,
            approximity: 6,
            hasMine: false,
            handleTileClick,
          }}
        />
        <Tile
          state={{
            tileId: "1-4",
            status: TILE_STATUSES.OPEN,
            approximity: 7,
            hasMine: false,
            handleTileClick,
          }}
        />
        <Tile
          state={{
            tileId: "1-4",
            status: TILE_STATUSES.OPEN,
            approximity: 8,
            hasMine: false,
            handleTileClick,
          }}
        />
        <Tile
          state={{
            tileId: "1-1",
            status: TILE_STATUSES.INIT,
            approximity: 0,
            hasMine: false,
            handleTileClick,
          }}
        />
        <Tile
          state={{
            tileId: "1-5",
            status: TILE_STATUSES.FLAGGED,
            approximity: 5,
            hasMine: false,
            handleTileClick,
          }}
        />
        <Tile
          state={{
            tileId: "1-6",
            status: TILE_STATUSES.OPEN,
            approximity: 0,
            hasMine: true,
            handleTileClick,
          }}
        />
        <Tile
          state={{
            tileId: "1-7",
            status: TILE_STATUSES.REVEALED,
            approximity: 0,
            hasMine: true,
            handleTileClick,
          }}
        />
      </div>
    </>
  );
}

export default MineSweeper;
