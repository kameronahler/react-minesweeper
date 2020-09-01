import React, { useContext } from 'react'
import { GameContext } from '../../store/GlobalStateWrapper'

export default function Tile({ dataIndex, el, text }) {
  const [fieldContext, , bombClick] = useContext(GameContext)

  const tileDisplay = (el) => {
    if (el.hidden) {
      return ''
    } else if (el.bomb) {
      return 'bomb'
    } else {
      return el.index
    }
  }
  return (
    <button
      onClick={fieldContext.alive ? bombClick : null}
      data-index={dataIndex}
    >
      {tileDisplay(el)}
    </button>
  )
}
