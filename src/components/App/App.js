import React from 'react'
import { GlobalStateWrapper } from '../../store/GlobalStateWrapper'

// components
import Header from '../Header/Header'
import Field from '../Field/Field'
import Gameover from '../Restart/Restart'

export default function App() {
  return (
    <div>
      <GlobalStateWrapper>
        <Header />
        <Gameover />
        <Field />
      </GlobalStateWrapper>
    </div>
  )
}
