import React, { useState } from 'react'
import TestData from './test.json'

export const GameContext = React.createContext()

export function GlobalStateWrapper({ children }) {
  // STATE FIELD
  const initialGameStatus = {
    alive: true,
    columns: 4,
    rows: 4,
  }

  const [gameStatus, setGameStatus] = useState(initialGameStatus)

  // css variables for grid layout
  document.documentElement.style.setProperty(
    '--global-columns',
    gameStatus.columns
  )
  document.documentElement.style.setProperty('--global-rows', gameStatus.rows)

  // helper for determining whether game tiles are on left or right
  // we assign these once instead of running the loop for each tile
  function findEdgesHelper(i, step) {
    let edges = []

    while (i <= gameStatus.rows * gameStatus.columns - 1) {
      edges.push(i)
      i = i + step
    }

    return edges
  }
  const LEFT_TILES = findEdgesHelper(0, gameStatus.columns)
  const RIGHT_TILES = findEdgesHelper(gameStatus.rows - 1, gameStatus.columns)

  // sets the edge keys for the tiles state
  function edges(i) {
    let returnObj = {}
    if (i >= 1 && i <= gameStatus.columns) {
      returnObj.top = true
    } else {
      returnObj.top = false
    }

    if (i > gameStatus.rows * gameStatus.columns - 1 - gameStatus.columns) {
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
  const initialTiles = TestData[0].test.map((el, i) => {
    return {
      bomb: el,
      edge: edges(i),
      hidden: true,
      text: null,
    }
  })
  const [tiles, setTiles] = useState(initialTiles)

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
          tiles[i + gameStatus.rows + 1].bomb,
          tiles[i + gameStatus.rows].bomb,
        ]
      } else if (tiles[i].edge.right) {
        // top right
        neighborTiles = [
          tiles[i - 1].bomb,
          tiles[i + gameStatus.rows - 1].bomb,
          tiles[i + gameStatus.rows].bomb,
        ]
      } else {
        // all other top
        neighborTiles = [
          tiles[i - 1].bomb,
          tiles[i + 1].bomb,
          tiles[i + gameStatus.rows - 1].bomb,
          tiles[i + gameStatus.rows].bomb,
          tiles[i + gameStatus.rows + 1].bomb,
        ]
      }
    } else if (tiles[i].edge.bottom) {
      // bottom
      if (tiles[i].edge.left) {
        // bottom left
        neighborTiles = [
          tiles[i - gameStatus.rows].bomb,
          tiles[i - gameStatus.rows - 1].bomb,
          tiles[i + 1].bomb,
        ]
      } else if (tiles[i].edge.right) {
        // bottom right
        neighborTiles = [
          tiles[i - gameStatus.rows - 1].bomb,
          tiles[i - gameStatus.rows].bomb,
          tiles[i - 1].bomb,
        ]
      } else {
        // all other bottom
        neighborTiles = [
          tiles[i - gameStatus.rows - 1].bomb,
          tiles[i - gameStatus.rows].bomb,
          tiles[i - gameStatus.rows - 1].bomb,
          tiles[i - 1].bomb,
          tiles[i + 1].bomb,
        ]
      }
    } else if (tiles[i].edge.left) {
      // left side (not top or bottom)
      neighborTiles = [
        tiles[i - gameStatus.rows].bomb,
        tiles[i - gameStatus.rows - 1].bomb,
        tiles[i + 1].bomb,
        tiles[i + gameStatus.rows + 1].bomb,
        tiles[i + gameStatus.rows].bomb,
      ]
    } else if (tiles[i].edge.right) {
      // right side (not top or bottom)
      neighborTiles = [
        tiles[i - gameStatus.rows].bomb,
        tiles[i - gameStatus.rows - 1].bomb,
        tiles[i - 1].bomb,
        tiles[i + gameStatus.rows - 1].bomb,
        tiles[i + gameStatus.rows].bomb,
      ]
    } else {
      // everything else
      neighborTiles = [
        tiles[i - gameStatus.rows - 1].bomb,
        tiles[i - gameStatus.rows].bomb,
        tiles[i - gameStatus.rows - 1].bomb,
        tiles[i - 1].bomb,
        tiles[i + 1].bomb,
        tiles[i + gameStatus.rows - 1].bomb,
        tiles[i + gameStatus.rows].bomb,
        tiles[i + gameStatus.rows + 1].bomb,
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
      let gameStatusUpdate = gameStatus
      gameStatusUpdate.alive = false
      setGameStatus(gameStatusUpdate)

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

  // click restart
  function restartClick() {
    setGameStatus(initialGameStatus)
    setTiles(initialTiles)
  }

  return (
    <>
      <GameContext.Provider
        value={[gameStatus, tiles, tileClick, restartClick]}
      >
        {children}
      </GameContext.Provider>
    </>
  )
}
