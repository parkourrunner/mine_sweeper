import "./MineSweeper.scss";
import Tile from "../Tile/Tile";
import { Game_STATUSES, TILE_STATUSES } from "../../utils/utils";
import { useEffect, useState } from "react";
function MineSweeper({
  gameState,
  gameStatus,
}: {
  gameState: GameState;
  gameStatus: Game_STATUSES;
}) {
  const [currentGameState, setCurrentGameState] = useState(gameState);
  const [currentGameStatus, setCurrentGameStatus] = useState(gameStatus);
  const [flaggedTiles, setFlagedtiles] = useState<string[]>([]);
  const [timer, setTimer] = useState(gameState.time | 0);
  const [tilesWithMine, setTilesWithMine] = useState<string[]>([]);
  const [openedTilesCount, setOpenedTilesCount] = useState(0);
  const flatTiles = gameState.tilesState.flat();
  const tilesCount = flatTiles.length;

  useEffect(() => {
    setTilesWithMine(
      flatTiles.filter((t) => t.hasMine === true).map((t) => t.tileId)
    );
  }, []);

  useEffect(() => {
    let interval = undefined;
    if (currentGameStatus === Game_STATUSES.RUNNING) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [currentGameStatus]);

  function onTileClick(tileId: string) {
    if (currentGameStatus !== Game_STATUSES.RUNNING) {
      return;
    }
    const tile = currentGameState.tilesState
      .flat()
      .find((t) => t.tileId === tileId)!;
    if (tilesWithMine.includes(tile.tileId)) {
      if (tile.status === TILE_STATUSES.FLAGGED) {
        setFlagedtiles((prev) => prev.filter((t) => t !== tile.tileId));
      }
      tile.status = TILE_STATUSES.OPEN;
      setCurrentGameStatus(Game_STATUSES.LOST);
    } else {
      openTile(tile);
    }
  }

  function openTile(tile: TileState) {
    if (tile.status === TILE_STATUSES.FLAGGED) {
      setFlagedtiles((prev) =>
        prev.filter((flaggedTileId) => flaggedTileId !== tile.tileId)
      );
    }
    tile.status = TILE_STATUSES.OPEN;
    setOpenedTilesCount((prev) => prev + 1);
    if (tile.approximity === 0) {
      tile.adjustentTiles.forEach((adj) => {
        if (adj.status !== TILE_STATUSES.OPEN) {
          openTile(adj);
        }
      });
    }
    setCurrentGameState({ ...currentGameState });
  }

  function onTileRightClick(tileId: string) {
    if (currentGameStatus !== Game_STATUSES.RUNNING) {
      return;
    }
    const tile = currentGameState.tilesState
      .flat()
      .find((t) => t.tileId === tileId)!;
    if (tile.status === TILE_STATUSES.FLAGGED) {
      tile.status = TILE_STATUSES.INIT;
      setFlagedtiles((prev) =>
        prev.filter((flaggedTileId) => flaggedTileId !== tileId)
      );
    } else {
      tile.status = TILE_STATUSES.FLAGGED;
      setFlagedtiles((prev) => [...prev, tile.tileId]);
    }
    setCurrentGameState({ ...currentGameState });
  }

  useEffect(() => {
    if (flaggedTiles.length === tilesWithMine.length) {
      const allFlagged = flaggedTiles.every((flaggedTileId) =>
        tilesWithMine.includes(flaggedTileId)
      );
      if (allFlagged) {
        const hasNotOpenedTile =
          openedTilesCount === tilesCount - tilesWithMine.length;
        if (hasNotOpenedTile) {
          setCurrentGameStatus(Game_STATUSES.WON);
        }
      }
    }
  }, [openedTilesCount, flaggedTiles]);

  return (
    <>
      <div className="mine-sweeper">
        <span>{timer}</span>
        <span>{currentGameStatus}</span>
        {currentGameState.tilesState.map((row, index) => (
          <div className="row" key={"row-" + index + 1}>
            {row.map((tile) => (
              <Tile
                key={tile.tileId}
                tile={tile}
                onTileClick={onTileClick}
                onTileRightClick={onTileRightClick}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Remove below later */}
      <div style={{ display: "flex", marginTop: "10px" }}>
        <Tile
          tile={{
            tileId: "1-2",
            status: TILE_STATUSES.OPEN,
            approximity: 0,
            hasMine: false,
            adjustentTiles: [],
          }}
          onTileClick={onTileClick}
          onTileRightClick={onTileRightClick}
        />
        <Tile
          tile={{
            tileId: "1-3",
            status: TILE_STATUSES.OPEN,
            approximity: 1,
            hasMine: false,
            adjustentTiles: [],
          }}
          onTileClick={onTileClick}
          onTileRightClick={onTileRightClick}
        />
        <Tile
          tile={{
            tileId: "1-4",
            status: TILE_STATUSES.OPEN,
            approximity: 2,
            hasMine: false,
            adjustentTiles: [],
          }}
          onTileClick={onTileClick}
          onTileRightClick={onTileRightClick}
        />
        <Tile
          tile={{
            tileId: "1-4",
            status: TILE_STATUSES.OPEN,
            approximity: 3,
            hasMine: false,
            adjustentTiles: [],
          }}
          onTileClick={onTileClick}
          onTileRightClick={onTileRightClick}
        />
        <Tile
          tile={{
            tileId: "1-4",
            status: TILE_STATUSES.OPEN,
            approximity: 4,
            hasMine: false,
            adjustentTiles: [],
          }}
          onTileClick={onTileClick}
          onTileRightClick={onTileRightClick}
        />
        <Tile
          tile={{
            tileId: "1-4",
            status: TILE_STATUSES.OPEN,
            approximity: 5,
            hasMine: false,
            adjustentTiles: [],
          }}
          onTileClick={onTileClick}
          onTileRightClick={onTileRightClick}
        />
        <Tile
          tile={{
            tileId: "1-4",
            status: TILE_STATUSES.OPEN,
            approximity: 6,
            hasMine: false,
            adjustentTiles: [],
          }}
          onTileClick={onTileClick}
          onTileRightClick={onTileRightClick}
        />
        <Tile
          tile={{
            tileId: "1-4",
            status: TILE_STATUSES.OPEN,
            approximity: 7,
            hasMine: false,
            adjustentTiles: [],
          }}
          onTileClick={onTileClick}
          onTileRightClick={onTileRightClick}
        />
        <Tile
          tile={{
            tileId: "1-4",
            status: TILE_STATUSES.OPEN,
            approximity: 8,
            hasMine: false,
            adjustentTiles: [],
          }}
          onTileClick={onTileClick}
          onTileRightClick={onTileRightClick}
        />
        <Tile
          tile={{
            tileId: "1-1",
            status: TILE_STATUSES.INIT,
            approximity: 0,
            hasMine: false,
            adjustentTiles: [],
          }}
          onTileClick={onTileClick}
          onTileRightClick={onTileRightClick}
        />
        <Tile
          tile={{
            tileId: "1-5",
            status: TILE_STATUSES.FLAGGED,
            approximity: 5,
            hasMine: false,
            adjustentTiles: [],
          }}
          onTileClick={onTileClick}
          onTileRightClick={onTileRightClick}
        />
        <Tile
          tile={{
            tileId: "1-6",
            status: TILE_STATUSES.OPEN,
            approximity: 0,
            hasMine: true,
            adjustentTiles: [],
          }}
          onTileClick={onTileClick}
          onTileRightClick={onTileRightClick}
        />
        <Tile
          tile={{
            tileId: "1-7",
            status: TILE_STATUSES.REVEALED,
            approximity: 0,
            hasMine: true,
            adjustentTiles: [],
          }}
          onTileClick={onTileClick}
          onTileRightClick={onTileRightClick}
        />
      </div>
    </>
  );
}

export default MineSweeper;
