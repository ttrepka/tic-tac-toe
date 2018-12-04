const INITIAL_STATE = {
  playerMoves: 0,
  playerTime: 0,
  systemMoves: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'history/MAKE_MOVE':
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

    default:
      return state;
  }
};
