import React from 'react'
import { GlobalStateWrapper } from '../../store/GlobalStateWrapper'

// components
import Header from '../Header/Header'
import Field from '../Field/Field'

export default function App() {
  return (
    <div>
      <GlobalStateWrapper>
        <Header />
        <Field />
      </GlobalStateWrapper>
    </div>
  )
}
