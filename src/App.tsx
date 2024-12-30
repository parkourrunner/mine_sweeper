import './App.scss'
import Tile from './components/Tile/Tile'
import {TILE_STATUSES} from "./utils/utils"
function App() {
  const gameState = {
    numCols: 0,
    numrow: 0,
    numMines: 99,
    gridState: [],
    time: 0,
  }
  function handleTileClick(tileId: string) {
    console.log(tileId)
  }
  return (
    <>
      

      <div className="tiles-wrapper">
      <Tile state={{tileId: "1-2", status: TILE_STATUSES.OPEN,approximity : 0, hasMine : false, handleTileClick}}/>
      <Tile state={{tileId: "1-3", status: TILE_STATUSES.OPEN,approximity : 1, hasMine : false, handleTileClick}}/>
      <Tile state={{tileId: "1-4", status: TILE_STATUSES.OPEN,approximity : 2, hasMine : false, handleTileClick}}/>
      <Tile state={{tileId: "1-4", status: TILE_STATUSES.OPEN,approximity : 3, hasMine : false, handleTileClick}}/>
      <Tile state={{tileId: "1-4", status: TILE_STATUSES.OPEN,approximity : 4, hasMine : false, handleTileClick}}/>
      <Tile state={{tileId: "1-4", status: TILE_STATUSES.OPEN,approximity : 5, hasMine : false, handleTileClick}}/>
      <Tile state={{tileId: "1-4", status: TILE_STATUSES.OPEN,approximity : 6, hasMine : false, handleTileClick}}/>
      <Tile state={{tileId: "1-4", status: TILE_STATUSES.OPEN,approximity : 7, hasMine : false, handleTileClick}}/>
      <Tile state={{tileId: "1-4", status: TILE_STATUSES.OPEN,approximity : 8, hasMine : false, handleTileClick}}/>
      <Tile state={{tileId: "1-1", status: TILE_STATUSES.INIT, approximity : 0,hasMine : false, handleTileClick}}/>
      <Tile state={{tileId: "1-5", status: TILE_STATUSES.FLAGGED, approximity : 5, hasMine : false, handleTileClick}}/>
      <Tile state={{tileId: "1-6", status: TILE_STATUSES.OPEN,approximity : 0, hasMine : true, handleTileClick}}/>
      <Tile state={{tileId: "1-7", status: TILE_STATUSES.REVEALED, approximity : 0, hasMine : true, handleTileClick}}/>

      </div>
    </>
  )
}

export default App
