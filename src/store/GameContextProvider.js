import React from 'react'

export const GameContext = React.createContext()

export function GameContextProvider({ children }) {
  const game = {
    setup: {
      x: 4,
      y: 4,
      sum: 16,
    },
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
      <GameContext.Provider value={game}>{children}</GameContext.Provider>
    </>
  )
}
