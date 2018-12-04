const INITIAL_STATE = {
  playerMoves: 0,
  playerTime: 0,
  systemMoves: 0,
  overallScore: {
    won: 0,
    lost: 0,
    tied: 0
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'game/MAKE_MOVE':
      const { isPlayerX, moveTime } = action;
      const { playerMoves, playerTime, systemMoves } = state;

      if (isPlayerX) {
        return {
          ...state,
          playerMoves: playerMoves + 1,
          playerTime: playerTime + moveTime
        };
      }

      return {
        ...state,
        systemMoves: systemMoves + 1
      };

    case 'stats/GAME_OVER':
      const { winningPlayer } = action;
      const { overallScore } = state;

      const newState = {
        ...state,
        overallScore: {
          ...overallScore
        }
      };

      if (winningPlayer === 'X') {
        newState.overallScore.won++;
      } else if (winningPlayer === 'O') {
        newState.overallScore.lost++;
      } else {
        newState.overallScore.tied++;
      }

      return newState;

    default:
      return state;
  }
};
