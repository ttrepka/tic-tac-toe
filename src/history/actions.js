export const jumpTo = step => ({
  type: 'history/JUMP_TO',
  step
});

export const makeMove = (squareIndex, isPlayerX, moveTime) => ({
  type: 'history/MAKE_MOVE',
  isPlayerX,
  moveTime,
  squareIndex
});
