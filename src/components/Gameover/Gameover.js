import React, { useContext } from 'react'
import { GameContext } from '../../store/GlobalStateWrapper'

export default function Gameover() {
  const [field] = useContext(GameContext)
  return field.alive ? null : <button>Restart</button>
}
