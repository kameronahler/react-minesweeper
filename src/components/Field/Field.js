import React, { useContext } from 'react'
import { GameContext } from '../../store/GlobalStateWrapper'

export default function Field() {
  const [fieldState, tilesState] = useContext(GameContext)

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${fieldState.columns}, 50px`,
        gridTemplateRows: `repeat(${fieldState.rows}, 50px`,
      }}
    >
      {tilesState.map((el, index) => {
        return <button key={index}>{el.bomb ? 'true' : 'false'}</button>
      })}
    </div>
  )
}
