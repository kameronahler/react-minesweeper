import React, { useState, useContext } from 'react'
import { GameContext } from '../../store/GlobalStateWrapper'

export default function Field() {
  const [fieldContext, tilesContext, bombClick] = useContext(GameContext)
  const [tilesState, setTilesState] = useState(tilesContext)

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
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${fieldContext.columns}, 50px`,
        gridTemplateRows: `repeat(${fieldContext.rows}, 50px`,
      }}
    >
      {tilesState.map((el, index) => {
        return (
          <button
            onClick={fieldContext.alive ? bombClick : null}
            key={index}
            data-index={index}
          >
            {tileDisplay(el)}
          </button>
        )
      })}
      {!fieldContext.alive ? <p>Game Over</p> : ''}
    </div>
  )
}
