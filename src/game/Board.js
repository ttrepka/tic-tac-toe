import React from 'react';

import './Board.css';
import Square from './Square';

const BOARD_SIZE = 3;

const rows = [...Array(BOARD_SIZE)];
const columns = [...Array(BOARD_SIZE)];

const Board = ({ disabled, onClick, squares }) => (
  <>
    {rows.map((_, rowIndex) => (
      <div key={rowIndex} className="board-row">
        {columns.map((_, columnIndex) => {
          const squareIndex = rowIndex * BOARD_SIZE + columnIndex;

          return (
            <Square
              key={squareIndex}
              disabled={disabled}
              onClick={() => onClick(squareIndex)}
              value={squares[squareIndex]}
            />
          );
        })}
      </div>
    ))}
  </>
);

export default Board;
