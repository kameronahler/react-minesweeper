import React, { useContext } from 'react'
import { GameContext } from '../../store/GameContextProvider'

export default function ContextTest() {
  const game = useContext(GameContext)

  console.log(game)

  return <div></div>
}
