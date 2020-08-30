import React, { useContext } from 'react'
import { GameContext } from '../../store/GlobalStateWrapper'

export default function Field() {
  const globalState = useContext(GameContext)

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 50px',
        gridTemplateRows: 'repeat(4,50px',
      }}
    >
      {globalState.tiles.map((el, position) => {
        return <button key={position}>{el.isBomb ? 'true' : 'false'}</button>
      })}
    </div>
  )
}
