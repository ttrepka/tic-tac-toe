import reducer, { INITIAL_STATE } from './reducer';

it('returns initial state for unknown action', () => {
  const state = reducer(INITIAL_STATE, { type: 'unknown' });
  expect(state).toEqual(INITIAL_STATE);
});

it('returns correct state after user movement', () => {
  let expectedState = { ...INITIAL_STATE, playerMoves: 1, playerTime: 3500 };
  let state = reducer(INITIAL_STATE, { type: 'game/MAKE_MOVE', isPlayerX: true, moveTime: 3500 });
  expect(state).toEqual(expectedState);

  expectedState = { ...state, systemMoves: 1 };
  state = reducer(state, { type: 'game/MAKE_MOVE', isPlayerX: false });
  expect(state).toEqual(expectedState);

  expectedState = { ...state, playerMoves: 2, playerTime: 4500 };
  state = reducer(state, { type: 'game/MAKE_MOVE', isPlayerX: true, moveTime: 1000 });
  expect(state).toEqual(expectedState);
});

it('updates overall stats', () => {
  let expectedState = { ...INITIAL_STATE, overallScore: { ...INITIAL_STATE.overallScore, won: 1 } };
  let state = reducer(INITIAL_STATE, { type: 'stats/GAME_OVER', winningPlayer: 'X' });
  expect(state).toEqual(expectedState);

  expectedState = { ...state, overallScore: { ...state.overallScore, lost: 1 } };
  state = reducer(state, { type: 'stats/GAME_OVER', winningPlayer: 'O' });
  expect(state).toEqual(expectedState);

  expectedState = { ...state, overallScore: { ...state.overallScore, tied: 1 } };
  state = reducer(state, { type: 'stats/GAME_OVER', winningPlayer: null });
  expect(state).toEqual(expectedState);
});
