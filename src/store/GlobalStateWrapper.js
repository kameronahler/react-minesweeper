import React from 'react'
import TestData from './test.json'

export const GameContext = React.createContext()

export function GlobalStateWrapper({ children }) {
  // field setup
  const fieldState = {
    alive: true,
    columns: 4,
    rows: 4,
    total: TestData.length,
  }

  // find edges helper
  function findEdgesHelper(i, step) {
    let edges = []

    while (i <= fieldState.total) {
      edges.push(i)
      i = i + step
    }

    return edges
  }

  // check if tile is on edge
  const LEFT_TILES = findEdgesHelper(1, fieldState.columns)
  const RIGHT_TILES = findEdgesHelper(fieldState.rows, fieldState.columns)

  function isTileInTopRow(index) {
    if (index >= 1 && index <= fieldState.columns) {
      return true
    } else return false
  }

  function isTileInBottomRow(index) {
    if (index > fieldState.total - fieldState.columns) {
      return true
    } else return false
  }

  function isTileInLeftColumn(index) {
    return LEFT_TILES.find((el) => el === index) ? true : false
  }

  function isTileInRightColumn(index) {
    return RIGHT_TILES.find((el) => el === index) ? true : false
  }

  const tilesState = TestData[0].test.map((el, i) => {
    return {
      bomb: el,
      edge: {
        top: isTileInTopRow(i + 1),
        bottom: isTileInBottomRow(i + 1),
        left: isTileInLeftColumn(i + 1),
        right: isTileInRightColumn(i + 1),
      },
      index: i + 1,
    }
  })

  return (
    <>
      <GameContext.Provider value={[fieldState, tilesState]}>
        {children}
      </GameContext.Provider>
    </>
  )
}
