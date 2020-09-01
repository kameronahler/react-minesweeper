import React, { useState, useContext } from 'react'
import { GameContext } from '../../store/GlobalStateWrapper'
import Tile from '../Tile/Tile'

export default function Field() {
  const [fieldContext, tilesContext] = useContext(GameContext)

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${fieldContext.columns}, 50px`,
        gridTemplateRows: `repeat(${fieldContext.rows}, 50px`,
      }}
    >
      {tilesContext.map((el, index) => {
        return <Tile key={index} dataIndex={index} el={el} />
      })}
      {!fieldContext.alive ? <p>Game Over</p> : ''}
    </div>
  )
}
