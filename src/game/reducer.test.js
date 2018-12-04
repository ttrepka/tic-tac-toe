import reducer, { INITIAL_STATE } from './reducer';

it('returns initial state for unknown action', () => {
  const state = reducer(INITIAL_STATE, { type: 'unknown' });
  expect(state).toEqual(INITIAL_STATE);
});

it('returns correct state after user movement', () => {
  let expectedState = { ...INITIAL_STATE };
  expectedState.steps.push({ squares: expectedState.steps[0].squares });
  expectedState.steps[1].squares[3] = 'X';
  expectedState.stepNumber = 1;
  expectedState.xIsNext = false;

  let state = reducer(INITIAL_STATE, { type: 'game/MAKE_MOVE', isPlayerX: true, squareIndex: 3 });
  expect(state).toEqual(expectedState);

  expectedState = { ...state };
  expectedState.steps.push({ squares: expectedState.steps[1].squares });
  expectedState.steps[2].squares[6] = 'O';
  expectedState.stepNumber = 2;
  expectedState.xIsNext = true;

  state = reducer(state, { type: 'game/MAKE_MOVE', isPlayerX: false, squareIndex: 6 });
  expect(state).toEqual(expectedState);
});
