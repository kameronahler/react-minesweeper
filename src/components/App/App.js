import React, { useState, useContext } from 'react'
import TestData from '../../store/test.json'
import { GameContextProvider } from '../../store/GameContextProvider'
import ContextTest from '../ContextTest/ContextTest'

export default function App() {
  const [gameSetup, setGameSetup] = useState(() => {
    return TestData[0].test.map((el, i) => {
      return [{ position: i + 1 }, { isBomb: el }]
    })
  })

  return (
    <div>
      <header>
        <h1>Let's Play Minecraft</h1>
      </header>
      <GameContextProvider>
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 100px' }}
        >
          {gameSetup.map((el, position) => {
            return (
              <button key={position}>{el.isBomb ? 'true' : 'false'}</button>
            )
          })}
        </div>
        <ContextTest />
      </GameContextProvider>
    </div>
  )
}
