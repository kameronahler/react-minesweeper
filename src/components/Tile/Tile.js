import React, { useContext } from 'react'
import { GameContext } from '../../store/GlobalStateWrapper'

export default function Tile({ dataIndex, text }) {
  const [fieldState, , bombClick] = useContext(GameContext)

  return (
    <button
      onClick={fieldState.alive ? bombClick : null}
      data-index={dataIndex}
    >
      {text}
    </button>
  )
}
