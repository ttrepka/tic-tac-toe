export const jumpTo = step => ({
  type: 'game/JUMP_TO',
  step
});

export const makeMove = (squareIndex, isPlayerX, moveTime) => ({
  type: 'game/MAKE_MOVE',
  isPlayerX,
  moveTime,
  squareIndex
});

export const restart = () => ({
  type: 'game/RESTART'
});
