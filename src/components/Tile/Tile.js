import React, { useContext } from 'react'
import { GameContext } from '../../store/GlobalStateWrapper'

export default function Tile({ index, text }) {
  const [gameStatus, , tileClick] = useContext(GameContext)

  return (
    <button onClick={gameStatus.alive ? tileClick : null} data-index={index}>
      {text}
    </button>
  )
}
