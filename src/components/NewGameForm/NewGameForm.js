import React, { useContext } from 'react'
import { GameContext } from '../../store/GlobalStateWrapper'
import './NewGameForm.scss'

export default function NewGameForm() {
  const [
    alive,
    ,
    ,
    newGame,
    rows,
    columns,
    updateRows,
    updateColumns,
  ] = useContext(GameContext)

  return (
    <form
      className='new-game-form'
      onSubmit={(e) => {
        newGame(e, rows, columns)
      }}
    >
      <label className='new-game-form__label' htmlFor='row-count'>
        Rows
      </label>
      <input
        className='new-game-form__input'
        defaultValue={rows}
        id='row-count'
        onChange={(e) => {
          updateRows(e)
        }}
        type='number'
      />
      <label className='new-game-form__label' htmlFor='column-count'>
        Columns
      </label>
      <input
        className='new-game-form__input'
        defaultValue={columns}
        id='column-count'
        onChange={(e) => {
          updateColumns(e)
        }}
        type='number'
      />
      <input
        className='new-game-form__submit'
        type='submit'
        value={alive === null ? 'Start' : 'New Game'}
      />
    </form>
  )
}
