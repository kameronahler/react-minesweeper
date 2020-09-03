import React, { useState } from 'react'
import TestData from './test.json'

export const GameContext = React.createContext()

export function GlobalStateWrapper({ children }) {
  // field state
  const [field, setFieldState] = useState({
    alive: true,
    columns: 4,
    rows: 4,
    total: TestData[0].test.length,
  })

  // css variables for grid layout
  document.documentElement.style.setProperty('--global-columns', field.columns)
  document.documentElement.style.setProperty('--global-rows', field.rows)

  // helper for determining whether game tiles are on left or right
  // we assign these once instead of running the loop for each tile
  function findEdgesHelper(i, step) {
    let edges = []

    while (i <= field.total - 1) {
      edges.push(i)
      i = i + step
    }

    return edges
  }
  const LEFT_TILES = findEdgesHelper(0, field.columns)
  const RIGHT_TILES = findEdgesHelper(field.rows - 1, field.columns)

  // sets the edge keys for the tiles state
  function edges(i) {
    let returnObj = {}
    if (i >= 1 && i <= field.columns) {
      returnObj.top = true
    } else {
      returnObj.top = false
    }

    if (i > field.total - 1 - field.columns) {
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

  // tiles state
  const [tiles, setTiles] = useState(
    TestData[0].test.map((el, i) => {
      return {
        bomb: el,
        edge: edges(i),
        hidden: true,
        text: null,
      }
    })
  )

  // examine neighbors on click
  function neighbors(e) {
    let i = parseInt(e.currentTarget.dataset.index)
    let neighborTiles = []

    // bombs
    if (tiles[i].edge.top) {
      if (tiles[i].edge.left) {
        neighborTiles = [
          tiles[i + 1].bomb, // r
          tiles[i + field.rows + 1].bomb, // br
          tiles[i + field.rows].bomb, // b
        ]
      } else if (tiles[i].edge.right) {
        neighborTiles = [
          tiles[i - 1].bomb, // l
          tiles[i + field.rows - 1].bomb, // bl
          tiles[i + field.rows].bomb, // b
        ]
      } else {
        neighborTiles = [
          tiles[i - 1].bomb, // l
          tiles[i + 1].bomb, // r
          tiles[i + field.rows - 1].bomb, // bl
          tiles[i + field.rows].bomb, // b
          tiles[i + field.rows + 1].bomb, // br
        ]
      }
    } else if (tiles[i].edge.bottom) {
      if (tiles[i].edge.left) {
        neighborTiles = [
          tiles[i - field.rows].bomb, // t
          tiles[i - field.rows - 1].bomb, // tr
          tiles[i + 1].bomb, // r
        ]
      } else if (tiles[i].edge.right) {
        neighborTiles = [
          tiles[i - field.rows - 1].bomb, // tl
          tiles[i - field.rows].bomb, // t
          tiles[i - 1].bomb, // l
        ]
      } else {
        neighborTiles = [
          tiles[i - field.rows - 1].bomb, // tl
          tiles[i - field.rows].bomb, // t
          tiles[i - field.rows - 1].bomb, // tr
          tiles[i - 1].bomb, // l
          tiles[i + 1].bomb, // r
        ]
      }
    } else if (tiles[i].edge.left) {
      neighborTiles = [
        tiles[i - field.rows].bomb, // t
        tiles[i - field.rows - 1].bomb, // tr
        tiles[i + 1].bomb, // r
        tiles[i + field.rows + 1].bomb, // br
        tiles[i + field.rows].bomb, // b
      ]
    } else if (tiles[i].edge.right) {
      neighborTiles = [
        tiles[i - field.rows].bomb, // t
        tiles[i - field.rows - 1].bomb, // tl
        tiles[i - 1].bomb, // l
        tiles[i + field.rows - 1].bomb, // bl
        tiles[i + field.rows].bomb, // b
      ]
    } else {
      neighborTiles = [
        tiles[i - field.rows - 1].bomb, // tl
        tiles[i - field.rows].bomb, // t
        tiles[i - field.rows - 1].bomb, // tr
        tiles[i - 1].bomb, // l
        tiles[i + 1].bomb, // r
        tiles[i + field.rows - 1].bomb, // bl
        tiles[i + field.rows].bomb, // b
        tiles[i + field.rows + 1].bomb, // br
      ]
    }

    const neighborBombs = neighborTiles.filter((el) => el)

    return neighborBombs.length
  }

  // click tile
  const tileClick = (e) => {
    const i = parseInt(e.currentTarget.dataset.index)
    let tilesStateUpdate = [...tiles]

    if (tiles[i].bomb) {
      // is bomb
      // update field to not alive
      let fieldStateUpdate = field
      fieldStateUpdate.alive = false
      setFieldState(fieldStateUpdate)

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
      <GameContext.Provider value={[field, tiles, tileClick]}>
        {children}
      </GameContext.Provider>
    </>
  )
}
