export const jumpTo = step => ({
  type: 'history/JUMP_TO',
  step
});

export const makeMove = (squareIndex, isPlayerX) => ({
  type: 'history/MAKE_MOVE',
  squareIndex,
  isPlayerX
});
