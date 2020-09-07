import React, { useState, useContext } from 'react'
import { GameContext } from '../../store/GlobalStateWrapper'

export default function GenerateTilesButton() {
  const [gameStatus, , , generateTiles] = useContext(GameContext)
  const [rows, setRows] = useState(4)
  const [columns, setColumns] = useState(4)

  return (
    <form
      onSubmit={(e) => {
        generateTiles(e, rows, columns)
      }}
    >
      <label htmlFor='row-count'>Rows</label>
      <input
        id='row-count'
        type='number'
        onChange={(e) => {
          setRows(e.currentTarget.value)
        }}
        defaultValue={rows}
      />
      <label htmlFor='column-count'>Columns</label>
      <input
        id='column-count'
        type='number'
        onChange={(e) => {
          setColumns(e.currentTarget.value)
        }}
        defaultValue={columns}
      />
      <input type='submit' value={gameStatus === null ? 'Start' : 'Restart'} />
    </form>
  )
}
