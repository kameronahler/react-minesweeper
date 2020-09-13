import React, { useContext } from 'react'
import { GameContext } from '../../store/GlobalStateWrapper'
import NewGameForm from '../NewGameForm/NewGameForm'
import './Header.scss'

export default function Header() {
  const [alive] = useContext(GameContext)
  return (
    <header className='header'>
      <h1 className='header__heading'>
        {alive || alive === null
          ? `Let's play Minecraft`
          : 'When did you get so good at Minecraft?'}
      </h1>
      <NewGameForm />
    </header>
  )
}
