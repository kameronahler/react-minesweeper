import React, { useState, useEffect } from 'react'

export const GameContext = React.createContext()

export function GlobalStateWrapper({ children }) {
  // STATE
  const [columns, setColumns] = useState(4)
  const [rows, setRows] = useState(4)
  const [alive, setAlive] = useState(null)
  const [tiles, setTiles] = useState([])

  // STATE STYLE
  document.documentElement.style.setProperty('--global-columns', columns)
  document.documentElement.style.setProperty('--global-rows', rows)

  // GENERATE TILES AND CALCULATE EDGES
  const LEFT_TILES = findEdgesHelper(0, columns)
  const RIGHT_TILES = findEdgesHelper(rows - 1, columns)

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

  function findEdgesHelper(i, step) {
    let edges = []

    while (i <= rows * columns - 1) {
      edges.push(i)
      i = i + step
    }

    return edges
  }

  // ROWS AND COLUMN CHANGES
  function updateRows(e) {
    setRows(parseInt(e.currentTarget.value))
  }
  function updateColumns(e) {
    setColumns(parseInt(e.currentTarget.value))
  }

  // NEW GAME
  function newGame(e, rows, columns) {
    e.preventDefault()
    const newTiles = randomTileArr()
    setTiles(newTiles)
    setAlive(true)
  }

  function randomTileArr() {
    let arr = []
    let i = 0
    while (i < rows * columns) {
      let rando = Math.random()
      arr.push({
        bomb: rando < 0.5 ? true : false,
        edge: edges(i, rows, columns),
        hidden: true,
        text: null,
      })
      i++
    }
    return arr
  }

  // CLICK TILES
  function tileClick(e) {
    const i = parseInt(e.currentTarget.dataset.index)
    let tilesStateUpdate = [...tiles]

    if (tiles[i].bomb) {
      // is bomb
      // update game to dead
      setAlive(false)

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
