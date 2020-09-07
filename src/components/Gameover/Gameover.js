import React, { useContext } from 'react'
import { GameContext } from '../../store/GlobalStateWrapper'

export default function Gameover() {
  const [gameStatus] = useContext(GameContext)
  return gameStatus.alive ? null : <button>Restart</button>
}
