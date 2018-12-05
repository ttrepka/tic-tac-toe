import { calculateWinner } from './helpers';

export const INITIAL_STATE = {
  stepNumber: 0,
  steps: [{ squares: Array(9).fill(null) }],
  winner: null,
  xIsNext: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'game/JUMP_TO':
      const { step } = action;

      return {
        ...state,
        stepNumber: step,
        xIsNext: step % 2 === 0
      };

    case 'game/MAKE_MOVE':
      const { isPlayerX, squareIndex } = action;
      const { stepNumber, steps } = state;

      const stepsSlice = steps.slice(0, stepNumber + 1);

      const squares = [...steps[stepNumber].squares];
      squares[squareIndex] = isPlayerX ? 'X' : 'O';

      return {
        ...state,
        stepNumber: stepsSlice.length,
        steps: [...stepsSlice, { squares }],
        winner: calculateWinner(squares),
        xIsNext: !isPlayerX
      };

    case 'game/RESTART':
      return INITIAL_STATE;

    default:
      return state;
  }
};
