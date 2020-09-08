import React, { useState, useEffect } from 'react'

export const GameContext = React.createContext()

export function GlobalStateWrapper({ children }) {
  // STATE
  const [columns, setColumns] = useState(4)
  const [rows, setRows] = useState(4)
  const [alive, setAlive] = useState(null)
  const [tiles, setTiles] = useState([])

  // GENERATE FIELD (ROWS, TILES, AND BOMBS)
  function updateRows(e) {
    setRows(parseInt(e.currentTarget.value))
  }
  function updateColumns(e) {
    setColumns(parseInt(e.currentTarget.value))
  }

  // CALCULATE HORIZONTAL FIELD EDGES
  const LEFT_TILES = findFieldEdges(0, columns)
  const RIGHT_TILES = findFieldEdges(columns - 1, columns)

  function findFieldEdges(start, step) {
    let i = start
    let edges = []

    while (i < rows * columns) {
      edges.push(i)
      i = i + step
    }

    return edges
  }

  // NEW GAME, CHANGE STATUS, GENERATE TILE DATA
  function newGame(e, rows, columns) {
    e.preventDefault()
    const newTiles = createTileData()
    setTiles(newTiles)
    setAlive(true)
    console.log(newTiles)
  }

  function onEdgeCheck(i) {
    let returnObj = {
      top: i >= 0 && i < columns ? true : false,
      bottom: i > rows * columns - 1 - columns ? true : false,
      left: LEFT_TILES.includes(i),
      right: RIGHT_TILES.includes(i),
    }
    return returnObj
  }

  function createTileData() {
    let arr = []
    let i = 0
    while (i < rows * columns) {
      arr.push({
        bomb: Math.random() < 0.1 ? true : false,
        edge: onEdgeCheck(i),
        hidden: true,
        text: null,
      })
      i++
    }

    // anytime we create a new set of tile data (a new game),
    // we set the css grid variables for the layout
    document.documentElement.style.setProperty('--global-columns', columns)
    document.documentElement.style.setProperty('--global-rows', rows)

    return arr
  }

  // CLICK TILES
  function tileClick(e) {
    const i = parseInt(e.currentTarget.dataset.index)
    let tilesStateUpdate = [...tiles]

    if (tiles[i].bomb) {
      // if bomb, update game to dead
      setAlive(false)

      // if bomb, unhide all tiles and reveal bombs
      tilesStateUpdate = tilesStateUpdate.map((el) => {
        let newStateObj = el
        newStateObj.hidden = false
        newStateObj.text = newStateObj.bomb ? '!' : ''
        return newStateObj
      })
      setTiles(tilesStateUpdate)
    } else {
      // if not bomb unhide tile and update text to neighbor bomb total
      let clickedTile = tiles[i]
      clickedTile.hidden = false
      clickedTile.text = neighborBombTotals(e)
      tilesStateUpdate[i] = clickedTile
      setTiles(tilesStateUpdate)
    }
  }

  function neighborBombTotals(e) {
    let i = parseInt(e.currentTarget.dataset.index)
    let neighborTiles = []

    // check for bombs
    if (tiles[i].edge.top) {
      // top first
      if (tiles[i].edge.left) {
        // top left
        neighborTiles = [
          tiles[i + 1].bomb, // right
          tiles[i + rows + 1].bomb, // bottom right
          tiles[i + rows].bomb, // bottom
        ]
      } else if (tiles[i].edge.right) {
        // top right
        neighborTiles = [
          tiles[i - 1].bomb, // left
          tiles[i + rows - 1].bomb, // bottom left
          tiles[i + rows].bomb, // bottom
        ]
      } else {
        // all other top
        neighborTiles = [
          tiles[i + 1].bomb, // right
          tiles[i + rows + 1].bomb, // bottom right
          tiles[i + rows].bomb, // bottom
          tiles[i + rows - 1].bomb, // bottom left
          tiles[i - 1].bomb, // left
        ]
      }
    } else if (tiles[i].edge.bottom) {
      // bottom
      if (tiles[i].edge.left) {
        // bottom left
        neighborTiles = [
          tiles[i - rows].bomb, // top
          tiles[i - rows + 1].bomb, // top right
          tiles[i + 1].bomb, // right
        ]
      } else if (tiles[i].edge.right) {
        // bottom right
        neighborTiles = [
          tiles[i - rows].bomb, // top
          tiles[i - rows - 1].bomb, // top left
          tiles[i - 1].bomb, // left
        ]
      } else {
        // all other bottom
        neighborTiles = [
          tiles[i - 1].bomb, // left
          tiles[i - rows - 1].bomb, // top left
          tiles[i - rows].bomb, // top
          tiles[i - rows + 1].bomb, // top right
          tiles[i + 1].bomb, // right
        ]
      }
    } else if (tiles[i].edge.left) {
      // left side (not top or bottom)
      neighborTiles = [
        tiles[i - rows].bomb, // top
        tiles[i - rows + 1].bomb, // top right
        tiles[i + 1].bomb, // right
        tiles[i + rows + 1].bomb, // bottom right
        tiles[i + rows].bomb, // bottom
      ]
    } else if (tiles[i].edge.right) {
      // right side (not top or bottom)
      neighborTiles = [
        tiles[i - rows].bomb, // top
        tiles[i - rows - 1].bomb, // top left
        tiles[i - 1].bomb, // left
        tiles[i + rows].bomb, // bottom
        tiles[i + rows - 1].bomb, // bottom left
      ]
    } else {
      // everything else
      neighborTiles = [
        tiles[i - rows - 1].bomb, // top left
        tiles[i - rows].bomb, // top
        tiles[i - rows + 1].bomb, // top right
        tiles[i + 1].bomb, // right
        tiles[i + rows + 1].bomb, // bottom right
        tiles[i + rows].bomb, // bottom
        tiles[i + rows - 1].bomb, // bottom left
        tiles[i - 1].bomb, // left
      ]
    }

    const ONLY_BOMBS = neighborTiles.filter((el) => el)

    return ONLY_BOMBS.length
  }

  return (
    <>
      <GameContext.Provider
        value={[
          alive,
          tiles,
          tileClick,
          newGame,
          rows,
          columns,
          updateRows,
          updateColumns,
        ]}
      >
        {children}
      </GameContext.Provider>
    </>
  )
}
