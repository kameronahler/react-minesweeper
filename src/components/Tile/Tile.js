import React, { useContext } from 'react'
import { GameContext } from '../../store/GlobalStateWrapper'
import './Tile.scss'

export default function Tile({ index, hidden, text }) {
  const [alive, , tileClick] = useContext(GameContext)

  return (
    <button
      className={`tile ${!hidden ? 'tile--revealed' : ''}`}
      onClick={alive ? tileClick : null}
      data-index={index}
    >
      <span className='tile__text'>{text}</span>
    </button>
  )
}
