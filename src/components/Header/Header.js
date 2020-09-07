import React, { useContext } from 'react'
import { GameContext } from '../../store/GlobalStateWrapper'

export default function Header() {
  const [gameStatus] = useContext(GameContext)
  return (
    <header>
      <h1>
        {gameStatus.alive
          ? `Let's play Minecraft`
          : 'When did you get so good at Minecraft?'}
      </h1>
    </header>
  )
}
