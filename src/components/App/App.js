import React from 'react'
import { GlobalStateWrapper } from '../../store/GlobalStateWrapper'
import Field from '../Field/Field'

export default function App() {
  return (
    <div>
      <header>
        <h1>Let's Play Minecraft</h1>
      </header>
      <GlobalStateWrapper>
        <Field />
      </GlobalStateWrapper>
    </div>
  )
}
