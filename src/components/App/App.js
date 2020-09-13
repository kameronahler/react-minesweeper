import React from 'react'
import { GlobalStateWrapper } from '../../store/GlobalStateWrapper'
import Header from '../Header/Header'
import NewGameForm from '../NewGameForm/NewGameForm'
import Field from '../Field/Field'

export default function App() {
  return (
    <GlobalStateWrapper>
      <Header />
      <NewGameForm />
      <Field />
    </GlobalStateWrapper>
  )
}
