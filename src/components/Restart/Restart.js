import React, { useContext } from 'react'
import { GameContext } from '../../store/GlobalStateWrapper'

export default function Restart() {
  const [, , , restartClick] = useContext(GameContext)
  return <button onClick={restartClick}>Restart</button>
}
