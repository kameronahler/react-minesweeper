import React, { useState } from 'react'
import TestData from './test.json'

export const GameContext = React.createContext()

export function GlobalStateWrapper({ children }) {
  // field state
  const [fieldState, setFieldState] = useState({
    alive: true,
    columns: 4,
    rows: 4,
    total: TestData[0].test.length,
  })

  // add css variables to help with css layout
  document.documentElement.style.setProperty(
    '--global-columns',
    fieldState.columns
  )
  document.documentElement.style.setProperty('--global-rows', fieldState.rows)

  // is tile on edge?
  function findEdgesHelper(i, step) {
    let edges = []

    while (i <= fieldState.total - 1) {
      edges.push(i)
      i = i + step
    }

    return edges
  }

  // we assign these once instead of running the loop for each tile
  const LEFT_TILES = findEdgesHelper(0, fieldState.columns)
  const RIGHT_TILES = findEdgesHelper(fieldState.rows - 1, fieldState.columns)

  function edges(i) {
    let returnObj = {}
    if (i >= 1 && i <= fieldState.columns) {
      returnObj.top = true
    } else {
      returnObj.top = false
    }

    if (i > fieldState.total - 1 - fieldState.columns) {
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

  // tile state
  const [tilesState, setTilesState] = useState(
    TestData[0].test.map((el, i) => {
      return {
        bomb: el,
        edge: edges(),
        hidden: true,
        id: i,
        text: null,
      }
    })
  )

  // find neighbors
  function neighbors(e) {
    let i = parseInt(e.currentTarget.dataset.index) + 1
    let neighborTiles = []

    // bombs
    if (tilesState[i].edge.top) {
      if (tilesState[i].edge.left) {
        neighborTiles = [
          tilesState[i + 1].bomb, // r
          tilesState[i + fieldState.rows + 1].bomb, // br
          tilesState[i + fieldState.rows].bomb, // b
        ]
      } else if (tilesState[i].edge.right) {
        neighborTiles = [
          tilesState[i - 1].bomb, // l
          tilesState[i + fieldState.rows - 1].bomb, // bl
          tilesState[i + fieldState.rows].bomb, // b
        ]
      } else {
        neighborTiles = [
          tilesState[i - 1].bomb, // l
          tilesState[i + 1].bomb, // r
          tilesState[i + fieldState.rows - 1].bomb, // bl
          tilesState[i + fieldState.rows].bomb, // b
          tilesState[i + fieldState.rows + 1].bomb, // br
        ]
      }
    } else if (tilesState[i].edge.bottom) {
      if (tilesState[i].edge.left) {
        neighborTiles = [
          tilesState[i - fieldState.rows].bomb, // t
          tilesState[i - fieldState.rows - 1].bomb, // tr
          tilesState[i + 1].bomb, // r
        ]
      } else if (tilesState[i].edge.right) {
        neighborTiles = [
          tilesState[i - fieldState.rows - 1].bomb, // tl
          tilesState[i - fieldState.rows].bomb, // t
          tilesState[i - 1].bomb, // l
        ]
      } else {
        neighborTiles = [
          tilesState[i - fieldState.rows - 1].bomb, // tl
          tilesState[i - fieldState.rows].bomb, // t
          tilesState[i - fieldState.rows - 1].bomb, // tr
          tilesState[i - 1].bomb, // l
          tilesState[i + 1].bomb, // r
        ]
      }
    } else if (tilesState[i].edge.left) {
      neighborTiles = [
        tilesState[i - fieldState.rows].bomb, // t
        tilesState[i - fieldState.rows - 1].bomb, // tr
        tilesState[i + 1].bomb, // r
        tilesState[i + fieldState.rows + 1].bomb, // br
        tilesState[i + fieldState.rows].bomb, // b
      ]
    } else if (tilesState[i].edge.right) {
      neighborTiles = [
        tilesState[i - fieldState.rows].bomb, // t
        tilesState[i - fieldState.rows - 1].bomb, // tl
        tilesState[i - 1].bomb, // l
        tilesState[i + fieldState.rows - 1].bomb, // bl
        tilesState[i + fieldState.rows].bomb, // b
      ]
    } else {
      neighborTiles = [
        tilesState[i - fieldState.rows - 1].bomb, // tl
        tilesState[i - fieldState.rows].bomb, // t
        tilesState[i - fieldState.rows - 1].bomb, // tr
        tilesState[i - 1].bomb, // l
        tilesState[i + 1].bomb, // r
        tilesState[i + fieldState.rows - 1].bomb, // bl
        tilesState[i + fieldState.rows].bomb, // b
        tilesState[i + fieldState.rows + 1].bomb, // br
      ]
    }

    const neighborBombs = neighborTiles.filter((el) => el)

    return neighborBombs.length
  }

  // click tile
  const bombClick = (e) => {
    const i = parseInt(e.currentTarget.dataset.index)
    let tilesStateUpdate = [...tilesState]

    if (tilesState[i].bomb) {
      // is bomb
      // update field to not alive
      let fieldStateUpdate = fieldState
      fieldStateUpdate.alive = false
      setFieldState(fieldStateUpdate)

      // unhide all tiles and reveal bombs
      tilesStateUpdate = tilesStateUpdate.map((el) => {
        let newStateObj = el
        newStateObj.hidden = false
        newStateObj.text = newStateObj.bomb ? '!' : ''
        return newStateObj
      })
      setTilesState(tilesStateUpdate)
    } else {
      // wasn't bomb
      // unhide tile and update text to neighbor bombs
      let clickedTile = tilesState[i]
      clickedTile.hidden = false
      clickedTile.text = neighbors(e)
      tilesStateUpdate[i] = clickedTile
      setTilesState(tilesStateUpdate)
    }
  }

  return (
    <>
      <GameContext.Provider value={[fieldState, tilesState, bombClick]}>
        {children}
      </GameContext.Provider>
    </>
  )
}
