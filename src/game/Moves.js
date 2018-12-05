import React from 'react';
import { connect } from 'react-redux';

import './Moves.css';
import { jumpTo } from './actions';

const Moves = ({ currentMove, disabled, jumpTo, moveCount }) => {
  const moves = [...Array(moveCount)];

  return (
    <ul className="moves">
      {moves.map((_, move) => (
        <li key={move}>
          <button
            className={`move ${move === currentMove ? 'active' : ''}`}
            disabled={disabled}
            onClick={() => jumpTo(move)}
          >
            {move ? `Go to move #${move}` : 'Go to game start'}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default connect(
  null,
  { jumpTo }
)(Moves);
