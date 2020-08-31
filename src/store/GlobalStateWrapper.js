import React from 'react'
import TestData from './test.json'

export const GameContext = React.createContext()

const LEFT_COLUMN = edgeHelper(1, 16, 4)

const RIGHT_COLUMN = edgeHelper(4, 16, 4)

const INTIAL_TILE_DATA = TestData[0].test.map((el, i) => {
  return {
    position: {
      index: i + 1,
      edge: {
        top: checkTop(i + 1, 16, 4, 4),
        bottom: checkBottom(i + 1, 16, 4, 4),
        left: checkLeft(i + 1, 16, 4, 4),
        right: checkRight(i + 1, 16, 4, 4),
      },
    },
    isBomb: el,
  }
})

function edgeHelper(i, total, int) {
  let targets = []

  while (i <= total) {
    targets.push(i)
    i = i + int
  }

  return targets
}

function checkTop(index, rows) {
  if (index >= 1 && index <= rows) {
    return true
  } else return false
}

function checkBottom(index, total, columns) {
  if (index > total - columns) {
    return true
  } else return false
}

function checkLeft(index) {
  return LEFT_COLUMN.find((el) => el === index) ? true : false
}

function checkRight(index) {
  return RIGHT_COLUMN.find((el) => el === index) ? true : false
}

export function GlobalStateWrapper({ children }) {
  const globalState = {
    field: {
      x: 4,
      y: 4,
      sum: INTIAL_TILE_DATA.length,
    },
    tiles: INTIAL_TILE_DATA,
    status: {
      alive: true,
    },
  }

  return (
    <>
      <GameContext.Provider value={globalState}>
        {children}
      </GameContext.Provider>
    </>
  )
}
