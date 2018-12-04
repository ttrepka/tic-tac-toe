import React from 'react';
import { connect } from 'react-redux';

const Stats = ({ playerMoves, playerTime, systemMoves }) => (
  <ul>
    <li>
      Person 2's # of moves: <b>{systemMoves}</b>
    </li>
    <li>
      Your # of moves: <b>{playerMoves}</b>
    </li>
    <li>
      Your average time per move:{' '}
      <b>{playerMoves && (playerTime / playerMoves / 1000).toFixed(2)} s</b>
    </li>
  </ul>
);

export default connect(({ stats: { playerMoves, playerTime, systemMoves } }) => ({
  playerMoves,
  playerTime,
  systemMoves
}))(Stats);
