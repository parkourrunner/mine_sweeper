import "./Tile.scss";
import LandMineIcon from "../../img/land-mine.png";
import RedFlagIcon from "../../img/red-flag.png";
import { TILE_STATUSES } from "../../utils/utils";
import { MouseEvent } from "react";
type TileProps = {
  state: {
    tileId: string;
    status: string;
    approximity: number;
    hasMine: boolean;
    handleTileClick: (tileId: string) => void;
    handleRightClick: (tileId: string) => void;
  };
};

function Tile({
  state: {
    tileId,
    status,
    approximity = 0,
    hasMine,
    handleTileClick,
    handleRightClick,
  },
}: TileProps) {
  function handleContextMenu(e: MouseEvent) {
    e.preventDefault();
    handleRightClick(tileId);
  }
  switch (status) {
    case TILE_STATUSES.INIT: {
      return (
        <div
          className="tile init"
          onClick={() => handleTileClick(tileId)}
          onContextMenu={handleContextMenu}
        ></div>
      );
    }
    case TILE_STATUSES.OPEN: {
      if (hasMine) {
        return (
          <div className="tile exploded">
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
        <div className="tile">
          <span className={colorclass}>
            {approximity > 0 ? approximity : null}
          </span>
        </div>
      );
    }
    case TILE_STATUSES.FLAGGED: {
      return (
        <div
          className="tile init flagged"
          onClick={() => handleTileClick(tileId)}
          onContextMenu={handleContextMenu}
        >
          <img src={RedFlagIcon} alt="red flag" />
        </div>
      );
    }
    case TILE_STATUSES.REVEALED: {
      return (
        <div className="tile">
          <img className="exploded" src={LandMineIcon} alt="land mine" />
        </div>
      );
    }
  }
  return <p>No valid status</p>;
}

export default Tile;
