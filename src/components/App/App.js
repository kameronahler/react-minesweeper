import React from 'react'
import { GlobalStateWrapper } from '../../store/GlobalStateWrapper'
import Header from '../Header/Header'
import Field from '../Field/Field'
import './App.scss'

export default function App() {
  return (
    <GlobalStateWrapper>
      <div className='app-container'>
        <Header />
        <Field />
      </div>
    </GlobalStateWrapper>
  )
}
