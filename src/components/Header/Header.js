import React, { useContext } from 'react'
import { GameContext } from '../../store/GlobalStateWrapper'
import NewGameForm from '../NewGameForm/NewGameForm'

export default function Header() {
  const [alive] = useContext(GameContext)
  return (
    <header>
      <h1>
        {alive || alive === null
          ? `Let's play Minecraft`
          : 'When did you get so good at Minecraft?'}
      </h1>
      <NewGameForm />
    </header>
  )
}
