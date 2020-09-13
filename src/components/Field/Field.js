import React, { useContext } from 'react'
import { GameContext } from '../../store/GlobalStateWrapper'

// style
import './Field.scss'

// components
import Tile from '../Tile/Tile'

export default function Field() {
  const [, tiles] = useContext(GameContext)

  return (
    <div className='field'>
      <div className='field__inner'>
        {tiles.map((el, index) => {
          return <Tile key={index} index={index} text={el.text} />
        })}
      </div>
    </div>
  )
}
