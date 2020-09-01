import React, { useContext } from 'react'
import { GameContext } from '../../store/GlobalStateWrapper'

// style
import './Field.scss'

// components
import Tile from '../Tile/Tile'

export default function Field() {
  const [fieldContext, tilesContext] = useContext(GameContext)

  return (
    <div className='field'>
      {tilesContext.map((el, index) => {
        return <Tile key={index} dataIndex={index} el={el} />
      })}
      {!fieldContext.alive ? <p>Game Over</p> : ''}
    </div>
  )
}
