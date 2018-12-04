import { calculateWinner } from './helpers';

export const INITIAL_STATE = {
  steps: [{ squares: Array(9).fill(null) }],
  stepNumber: 0,
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
      const { steps, stepNumber } = state;

      const stepsSlice = steps.slice(0, stepNumber + 1);

      const squares = [...steps[stepNumber].squares];
      squares[squareIndex] = isPlayerX ? 'X' : 'O';

      return {
        ...state,
        steps: [...stepsSlice, { squares }],
        stepNumber: stepsSlice.length,
        winner: calculateWinner(squares),
        xIsNext: !isPlayerX
      };

    case 'game/RESTART':
      return INITIAL_STATE;

    default:
      return state;
  }
};
