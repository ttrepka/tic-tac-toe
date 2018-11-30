import React from 'react';

import './Game.css';
import Board from './Board';
import WinningLine from './WinningLine';

export default class Game extends React.Component {
  // how long it takes for the opponent "to think"
  static PLAYER_SYSTEM_TIMEOUT = 1000;

  state = {
    history: [{ squares: Array(9).fill(null) }],
    stepNumber: 0,
    systemThinking: false,
    xIsNext: true
  };

  getCurrentSquares() {
    const { history, stepNumber } = this.state;

    const historySlice = history.slice(0, stepNumber + 1);
    const current = historySlice[historySlice.length - 1];

    return [...current.squares];
  }

  doStep(squareIndex, isPlayerX, callback) {
    const { history, stepNumber, xIsNext } = this.state;

    const historySlice = history.slice(0, stepNumber + 1);
    const squares = this.getCurrentSquares();

    if (calculateWinner(squares) || squares[squareIndex] || isPlayerX !== xIsNext) {
      return;
    }

    squares[squareIndex] = isPlayerX ? 'X' : 'O';

    this.setState(
      {
        history: [...historySlice, { squares }],
        stepNumber: historySlice.length,
        xIsNext: !isPlayerX
      },
      callback
    );
  }

  playSystemWithDelay = () => {
    this.setState({ systemThinking: true });
    setTimeout(this.playSystem, Game.PLAYER_SYSTEM_TIMEOUT);
  };

  playSystem = () => {
    this.setState({ systemThinking: false });
    const squares = this.getCurrentSquares();

    if (calculateWinner(squares)) {
      return;
    }

    // for simplicity, system plays randomly
    let squareIndex;
    do {
      squareIndex = Math.floor(Math.random() * 9);
    } while (squares[squareIndex]);

    this.doStep(squareIndex, false);
  };

  handleClick = squareIndex => {
    this.doStep(squareIndex, true, this.playSystemWithDelay);
  };

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  render() {
    const { history, stepNumber, systemThinking, xIsNext } = this.state;
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          <button disabled={systemThinking} onClick={() => this.jumpTo(move)}>
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
      </div>
    );
  }
}

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
