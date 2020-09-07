import React from 'react'
import { GlobalStateWrapper } from '../../store/GlobalStateWrapper'

// components
import Header from '../Header/Header'
import GenerateTilesButton from '../GenerateTilesButton/GenerateTilesButton'
import Field from '../Field/Field'

export default function App() {
  return (
    <GlobalStateWrapper>
      <Header />
      <GenerateTilesButton />
      <Field />
    </GlobalStateWrapper>
  )
}
