import React from 'react'
import TestData from './test.json'

const initialTiles = TestData[0].test.map((el, i) => {
  return { position: i + 1, isBomb: el }
})

export const GameContext = React.createContext()

export function GlobalStateWrapper({ children }) {
  const globalState = {
    field: {
      x: 4,
      y: 4,
      sum: 16,
    },
    tiles: initialTiles,
    status: {
      alive: true,
    },
    actions: {
      clear: 'Cleared',
      flag: 'Flagged',
      restart: 'Restart',
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
