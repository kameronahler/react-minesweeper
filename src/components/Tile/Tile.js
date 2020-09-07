import React, { useContext } from 'react'
import { GameContext } from '../../store/GlobalStateWrapper'

export default function Tile({ index, text }) {
  const [alive, , tileClick] = useContext(GameContext)

  return (
    <button onClick={alive ? tileClick : null} data-index={index}>
      {text}
    </button>
  )
}
