import React, { useState } from 'react'
import TestData from './test.json'

export const GameContext = React.createContext()

export function GlobalStateWrapper({ children }) {
  // field state
  const [fieldContext, setFieldContext] = useState({
    alive: true,
    columns: 4,
    rows: 4,
    total: TestData.length,
  })

  // add css variables to help with css layout
  document.documentElement.style.setProperty(
    '--global-columns',
    fieldContext.columns
  )
  document.documentElement.style.setProperty('--global-rows', fieldContext.rows)

  // edges
  function findEdgesHelper(i, step) {
    let edges = []

    while (i <= fieldContext.total) {
      edges.push(i)
      i = i + step
    }

    return edges
  }

  // is tile on edge?
  const LEFT_TILES = findEdgesHelper(1, fieldContext.columns)
  const RIGHT_TILES = findEdgesHelper(fieldContext.rows, fieldContext.columns)

  function isTileInTopRow(index) {
    if (index >= 1 && index <= fieldContext.columns) {
      return true
    } else return false
  }

  function isTileInBottomRow(index) {
    if (index > fieldContext.total - fieldContext.columns) {
      return true
    } else return false
  }

  function isTileInLeftColumn(index) {
    return LEFT_TILES.find((el) => el === index) ? true : false
  }

  function isTileInRightColumn(index) {
    return RIGHT_TILES.find((el) => el === index) ? true : false
  }

  // tile state
  const [tilesContext, setTilesContext] = useState(
    TestData[0].test.map((el, i) => {
      return {
        bomb: el,
        edge: {
          top: isTileInTopRow(i + 1),
          bottom: isTileInBottomRow(i + 1),
          left: isTileInLeftColumn(i + 1),
          right: isTileInRightColumn(i + 1),
        },
        index: i + 1,
        hidden: true,
      }
    })
  )

  // click tile
  const bombClick = (e) => {
    const index = parseInt(e.currentTarget.dataset.index)
    let newTilesContext = [...tilesContext]
    let newFieldContext = { ...fieldContext }

    // unhide tile
    let newHidden = tilesContext[index]
    newHidden.hidden = false
    newTilesContext[index] = newHidden
    setTilesContext(newTilesContext)

    // is bomb? update field setup
    if (newTilesContext[index].bomb) {
      newFieldContext.alive = false
      setFieldContext(newFieldContext)
    }
  }

  return (
    <>
      <GameContext.Provider value={[fieldContext, tilesContext, bombClick]}>
        {children}
      </GameContext.Provider>
    </>
  )
}
