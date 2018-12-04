import React from 'react';
import { connect } from 'react-redux';

import './Game.css';
import Board from './Board';
import Stats from './stats/Stats';
import WinningLine from './WinningLine';
import { jumpTo, makeMove } from './history/actions';

class Game extends React.Component {
  // how long it takes for the opponent "to think"
  static PLAYER_SYSTEM_TIMEOUT = 1000;

  playerMoveStart = Date.now();

  state = {
    systemThinking: false
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.xIsNext && this.props.xIsNext) {
      this.playerMoveStart = Date.now();
    }
  }

  canPlay(squareIndex, isPlayerX) {
    const { steps, stepNumber, xIsNext } = this.props;
    const { squares } = steps[stepNumber];

    return !calculateWinner(squares) && !squares[squareIndex] && isPlayerX === xIsNext;
  }

  playSystemWithDelay = () => {
    this.setState({ systemThinking: true });
    setTimeout(this.playSystem, Game.PLAYER_SYSTEM_TIMEOUT);
  };

  playSystem = () => {
    this.setState({ systemThinking: false });

    const { steps, stepNumber } = this.props;
    const { squares } = steps[stepNumber];

    if (calculateWinner(squares)) {
      return;
    }

    // for simplicity, system plays randomly
    let squareIndex;
    do {
      squareIndex = Math.floor(Math.random() * 9);
    } while (squares[squareIndex]);

    this.props.makeMove(squareIndex, false);
  };

  handleClick = squareIndex => {
    if (this.canPlay(squareIndex, true)) {
      const moveTime = Date.now() - this.playerMoveStart;

      this.props.makeMove(squareIndex, true, moveTime);
      this.playSystemWithDelay();
    }
  };

  render() {
    const { steps, stepNumber, xIsNext } = this.props;
    const { systemThinking } = this.state;

    const current = steps[stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = steps.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          <button disabled={systemThinking} onClick={() => this.props.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Winner: ${winner.player}`;
    } else {
      status = `Next player: ${xIsNext ? 'You' : 'Person 2'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={this.handleClick} />
          {winner && <WinningLine line={winner.line} />}
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <Stats />
      </div>
    );
  }
}

export default connect(
  ({ history }) => ({ ...history }),
  { jumpTo, makeMove }
)(Game);

// ========================================

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        player: squares[a] === 'X' ? 'You' : 'Person 2',
        line: lines[i]
      };
    }
  }

  return null;
}
