import React, { useContext } from 'react'
import { GameContext } from '../../store/GlobalStateWrapper'

export default function GenerateTilesButton() {
  const [gameStatus, , , generateTiles] = useContext(GameContext)

  return (
    <button onClick={generateTiles}>
      {gameStatus.alive === null ? 'Start' : 'Restart'}
    </button>
  )
}
