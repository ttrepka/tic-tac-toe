import React from 'react';
import { connect } from 'react-redux';

import './Game.css';
import Board from './Board';
import WinningLine from './WinningLine';
import { jumpTo, makeMove, restart } from './actions';
import { gameOver } from '../stats/actions';

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

    if (!prevProps.winner && this.props.winner) {
      this.props.gameOver(this.props.winner.player);
    }
  }

  canPlay(squareIndex, isPlayerX) {
    const { steps, stepNumber, winner, xIsNext } = this.props;
    const { squares } = steps[stepNumber];

    return !winner && !squares[squareIndex] && isPlayerX === xIsNext;
  }

  playSystemWithDelay = () => {
    this.setState({ systemThinking: true });
    setTimeout(this.playSystem, Game.PLAYER_SYSTEM_TIMEOUT);
  };

  playSystem = () => {
    this.setState({ systemThinking: false });

    const { steps, stepNumber, winner } = this.props;
    const { squares } = steps[stepNumber];

    if (winner) {
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

  handleRestartClick = () => {
    this.playerMoveStart = Date.now();
    this.props.restart();
  };

  render() {
    const { jumpTo, steps, stepNumber, winner, xIsNext } = this.props;
    const { systemThinking } = this.state;

    const current = steps[stepNumber];

    const moves = steps.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          <button
            className={`move ${move === stepNumber ? 'active' : ''}`}
            disabled={systemThinking}
            onClick={() => jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner && winner.player) {
      status = `Game over: <b>${winner.player === 'X' ? 'You' : 'Person 2'} won</b>`;
    } else if (winner && !winner.player) {
      status = 'Game over: <b>Draw</b>';
    } else {
      status = `Next player: <b>${xIsNext ? 'You' : 'Person 2'}</b>`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board disabled={systemThinking} squares={current.squares} onClick={this.handleClick} />
          {winner && <WinningLine line={winner.line} />}
        </div>
        <div className="game-info">
          <h2 dangerouslySetInnerHTML={{ __html: status }} />
          {winner ? (
            <button onClick={this.handleRestartClick}>Start new game</button>
          ) : (
            <ul className="moves">{moves}</ul>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  ({ game: { steps, stepNumber, winner, xIsNext } }) => ({ steps, stepNumber, winner, xIsNext }),
  { gameOver, jumpTo, makeMove, restart }
)(Game);
