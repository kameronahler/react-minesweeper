import React, { useContext } from 'react'
import { GameContext } from '../../store/GlobalStateWrapper'

export default function Tile({ index, text }) {
  const [field, , tileClick] = useContext(GameContext)

  return (
    <button onClick={field.alive ? tileClick : null} data-index={index}>
      {text}
    </button>
  )
}
