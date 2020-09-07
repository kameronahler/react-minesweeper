import React, { useState, useEffect } from 'react'

export const GameContext = React.createContext()

export function GlobalStateWrapper({ children }) {
  // STATE FIELD
  const [columns, setColumns] = useState(null)
  const [rows, setRows] = useState(null)
  const [gameStatus, setGameStatus] = useState(null)

  // css variables for grid layout
  document.documentElement.style.setProperty('--global-columns', columns)
  document.documentElement.style.setProperty('--global-rows', rows)

  // helper for determining whether game tiles are on left or right
  // we assign these once instead of running the loop for each tile
  function findEdgesHelper(i, step) {
    let edges = []

    while (i <= rows * columns - 1) {
      edges.push(i)
      i = i + step
    }

    return edges
  }
  const LEFT_TILES = gameStatus ? findEdgesHelper(0, columns) : null
  const RIGHT_TILES = gameStatus ? findEdgesHelper(rows - 1, columns) : null

  // sets the edge keys for the tiles state
  function edges(i) {
    let returnObj = {}
    if (i >= 1 && i <= columns) {
      returnObj.top = true
    } else {
      returnObj.top = false
    }

    if (i > rows * columns - 1 - columns) {
      returnObj.bottom = true
    } else {
      returnObj.bottom = false
    }

    if (LEFT_TILES.find((el) => el === i)) {
      returnObj.left = true
    } else {
      returnObj.left = false
    }

    if (RIGHT_TILES.find((el) => el === i)) {
      returnObj.right = true
    } else {
      returnObj.right = false
    }

    return returnObj
  }

  // STATE TILES
  const [tiles, setTiles] = useState([])

  // click start or restart
  function generateTiles(e, rows, columns) {
    e.preventDefault()
    setRows(rows)
    setColumns(columns)
    setGameStatus(true)
  }

  // build the random mines when the user presses button and updates the gameStatus
  useEffect(() => {
    const newTiles = randomTileArr()
    setTiles(newTiles)
  }, [gameStatus])

  function randomTileArr() {
    let arr = []
    let i = 0
    while (i < rows * columns) {
      let rando = Math.random()
      console.log(rando)
      arr.push({
        bomb: rando < 0.5 ? true : false,
        edge: edges(i),
        hidden: true,
        text: null,
      })
      i++
    }
    return arr
  }

  // examine neighbors on click
  function neighbors(e) {
    let i = parseInt(e.currentTarget.dataset.index)
    let neighborTiles = []

    // check for bombs
    if (tiles[i].edge.top) {
      // top first
      if (tiles[i].edge.left) {
        // top left
        neighborTiles = [
          tiles[i + 1].bomb,
          tiles[i + rows + 1].bomb,
          tiles[i + rows].bomb,
        ]
      } else if (tiles[i].edge.right) {
        // top right
        neighborTiles = [
          tiles[i - 1].bomb,
          tiles[i + rows - 1].bomb,
          tiles[i + rows].bomb,
        ]
      } else {
        // all other top
        neighborTiles = [
          tiles[i - 1].bomb,
          tiles[i + 1].bomb,
          tiles[i + rows - 1].bomb,
          tiles[i + rows].bomb,
          tiles[i + rows + 1].bomb,
        ]
      }
    } else if (tiles[i].edge.bottom) {
      // bottom
      if (tiles[i].edge.left) {
        // bottom left
        neighborTiles = [
          tiles[i - rows].bomb,
          tiles[i - rows - 1].bomb,
          tiles[i + 1].bomb,
        ]
      } else if (tiles[i].edge.right) {
        // bottom right
        neighborTiles = [
          tiles[i - rows - 1].bomb,
          tiles[i - rows].bomb,
          tiles[i - 1].bomb,
        ]
      } else {
        // all other bottom
        neighborTiles = [
          tiles[i - rows - 1].bomb,
          tiles[i - rows].bomb,
          tiles[i - rows - 1].bomb,
          tiles[i - 1].bomb,
          tiles[i + 1].bomb,
        ]
      }
    } else if (tiles[i].edge.left) {
      // left side (not top or bottom)
      neighborTiles = [
        tiles[i - rows].bomb,
        tiles[i - rows - 1].bomb,
        tiles[i + 1].bomb,
        tiles[i + rows + 1].bomb,
        tiles[i + rows].bomb,
      ]
    } else if (tiles[i].edge.right) {
      // right side (not top or bottom)
      neighborTiles = [
        tiles[i - rows].bomb,
        tiles[i - rows - 1].bomb,
        tiles[i - 1].bomb,
        tiles[i + rows - 1].bomb,
        tiles[i + rows].bomb,
      ]
    } else {
      // everything else
      neighborTiles = [
        tiles[i - rows - 1].bomb,
        tiles[i - rows].bomb,
        tiles[i - rows - 1].bomb,
        tiles[i - 1].bomb,
        tiles[i + 1].bomb,
        tiles[i + rows - 1].bomb,
        tiles[i + rows].bomb,
        tiles[i + rows + 1].bomb,
      ]
    }

    const ONLY_BOMBS = neighborTiles.filter((el) => el)

    return ONLY_BOMBS.length
  }

  // click tile
  function tileClick(e) {
    const i = parseInt(e.currentTarget.dataset.index)
    let tilesStateUpdate = [...tiles]

    if (tiles[i].bomb) {
      // is bomb
      // update game to dead
      setGameStatus(false)

      // unhide all tiles and reveal bombs
      tilesStateUpdate = tilesStateUpdate.map((el) => {
        let newStateObj = el
        newStateObj.hidden = false
        newStateObj.text = newStateObj.bomb ? '!' : ''
        return newStateObj
      })
      setTiles(tilesStateUpdate)
    } else {
      // wasn't bomb
      // unhide tile and update text to neighbor bombs
      let clickedTile = tiles[i]
      clickedTile.hidden = false
      clickedTile.text = neighbors(e)
      tilesStateUpdate[i] = clickedTile
      setTiles(tilesStateUpdate)
    }
  }

  return (
    <>
      <GameContext.Provider
        value={[gameStatus, tiles, tileClick, generateTiles]}
      >
        {children}
      </GameContext.Provider>
    </>
  )
}
