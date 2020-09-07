import React from 'react'
import { GlobalStateWrapper } from '../../store/GlobalStateWrapper'
import Header from '../Header/Header'
import NewGameButton from '../NewGameButton/NewGameButton'
import Field from '../Field/Field'

export default function App() {
  return (
    <GlobalStateWrapper>
      <Header />
      <NewGameButton />
      <Field />
    </GlobalStateWrapper>
  )
}
