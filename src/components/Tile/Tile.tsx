import "./Tile.scss";
import LandMineIcon from "../../img/land-mine.png";
import RedFlagIcon from "../../img/red-flag.png";
import { TILE_STATUSES } from "../../utils/utils";
import { MouseEvent, useRef } from "react";
import { isMobile } from "react-device-detect";

type TileProps = {
  tile: TileState;
  onTileClick: (tileId: string) => void;
  onTileRightClick: (tileId: string) => void;
};

function Tile({ tile, onTileClick, onTileRightClick }: TileProps) {
  const { hasMine, approximity } = tile;
  const timerRef = useRef(0);
  const isLongPress = useRef(false);

  function handleOnRightClick(e: MouseEvent) {
    e.preventDefault();
    if (!isMobile) {
      onTileRightClick(tile.tileId);
    }
  }

  function startPressTimer() {
    isLongPress.current = false;
    timerRef.current = window.setTimeout(() => {
      isLongPress.current = true;
    }, 100);
  }

  function handleOnTouchStart() {
    startPressTimer();
  }

  function handleOnTouchEnd() {
    if (isLongPress.current) {
      onTileRightClick(tile.tileId);
    } else {
      onTileClick(tile.tileId);
    }
    clearTimeout(timerRef.current);
  }

  function handleOnclick() {
    if (!isMobile) {
      onTileClick(tile.tileId);
    }
  }

  switch (tile.status) {
    case TILE_STATUSES.INIT: {
      return (
        <div
          data-testid={tile.tileId}
          role="tile"
          className="tile init"
          onClick={() => handleOnclick()}
          onContextMenu={handleOnRightClick}
          onTouchStart={handleOnTouchStart}
          onTouchEnd={handleOnTouchEnd}
        ></div>
      );
    }
    case TILE_STATUSES.OPEN: {
      if (hasMine) {
        return (
          <div className="tile exploded" role="tile" data-testid={tile.tileId}>
            <img className="exploded" src={LandMineIcon} alt="land mine" />
          </div>
        );
      }
      let colorclass = "";
      switch (approximity) {
        case 1: {
          colorclass = "blue";
          break;
        }
        case 2: {
          colorclass = "green";
          break;
        }
        case 3: {
          colorclass = "red";
          break;
        }
        case 4: {
          colorclass = "orange";
          break;
        }
        case 5: {
          colorclass = "purple";
          break;
        }
        case 6: {
          colorclass = "aqua";
          break;
        }
        case 7: {
          colorclass = "brown";
          break;
        }
        case 8: {
          colorclass = "cadetblue";
          break;
        }
        default:
          break;
      }
      return (
        <div className="tile" role="tile" data-testid={tile.tileId}>
          <span className={colorclass} role="approximity">
            {approximity > 0 ? approximity : null}
          </span>
        </div>
      );
    }
    case TILE_STATUSES.FLAGGED: {
      return (
        <div
          className="tile init flagged"
          role="tile"
          data-testid={tile.tileId}
        >
          <img src={RedFlagIcon} role="red-flag" alt="red flag" />
          <div
            className="overlay"
            role="overlay"
            onClick={() => handleOnclick()}
            onContextMenu={handleOnRightClick}
            onTouchStart={handleOnTouchStart}
            onTouchEnd={handleOnTouchEnd}
          ></div>
        </div>
      );
    }
  }
  return <p>No valid status</p>;
}

export default Tile;
