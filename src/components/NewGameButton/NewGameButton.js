import React, { useState, useContext } from 'react'
import { GameContext } from '../../store/GlobalStateWrapper'

export default function NewGameButton() {
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
      onSubmit={(e) => {
        newGame(e, rows, columns)
      }}
    >
      <label htmlFor='row-count'>Rows</label>
      <input
        id='row-count'
        type='number'
        onChange={(e) => {
          updateRows(e)
        }}
        defaultValue={rows}
      />
      <label htmlFor='column-count'>Columns</label>
      <input
        id='column-count'
        type='number'
        onChange={(e) => {
          updateColumns(e)
        }}
        defaultValue={columns}
      />
      <input type='submit' value={alive === null ? 'Start' : 'New Game'} />
    </form>
  )
}
