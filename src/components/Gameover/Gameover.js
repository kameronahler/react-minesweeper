import React, { useContext } from 'react'
import { GameContext } from '../../store/GlobalStateWrapper'

export default function Gameover() {
  const [gameStatus, , , restartClick] = useContext(GameContext)
  return gameStatus.alive ? null : (
    <button onClick={restartClick}>Restart</button>
  )
}
