# react-minesweeper
Assumes a 4x4 square board (for now)

## Starting data structure
```
[true, false, false, false, true, ...]
```

## State of the art
- **Game**
  - **Setup**
    - number of rows
    - number of columns
    - total tiles
  - **Status**
    - alive
    - dead
    - remaining live bombs
- **Tiles**
  - **Bomb**
    - is bomb?
  - **Position**
    - index
    - **Edges**
      - is in top row?
      - is in left column?
      - is in right column?
      - is in bottom row?
  - **Status**
    - is live?
    - is flagged?
    - is detonated?
    - is cleared?
    - total neighbor bombs
- **Events**
  - clear
  - flag
  - restart
- **Styles**
  - live
  - flagged
  - detonated
  - numbered
  - clear
