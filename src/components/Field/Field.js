import React, { useContext } from 'react'
import { GameContext } from '../../store/GlobalStateWrapper'

// style
import './Field.scss'

// components
import Tile from '../Tile/Tile'

export default function Field() {
  const [fieldState, tilesState] = useContext(GameContext)

  return (
    <div className='field'>
      {tilesState.map((el, index) => {
        return <Tile key={index} dataIndex={index} text={el.text} />
      })}
      {!fieldState.alive ? <p>Game Over</p> : ''}
    </div>
  )
}
