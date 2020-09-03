import React, { useContext } from 'react'
import { GameContext } from '../../store/GlobalStateWrapper'

export default function Tile({ dataIndex, text }) {
  const [field, , tileClick] = useContext(GameContext)

  return (
    <button onClick={field.alive ? tileClick : null} data-index={dataIndex}>
      {text}
    </button>
  )
}
