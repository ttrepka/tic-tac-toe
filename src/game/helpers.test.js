import { calculateWinner } from './helpers';

it('is null for game not over', () => {
  let squares = [null, null, null, null, null, null, null, null, null];
  expect(calculateWinner(squares)).toBe(null);

  squares = ['X', null, null, null, null, null, null, null, 'O'];
  expect(calculateWinner(squares)).toBe(null);
});

it('is empty object for tied game', () => {
  let squares = ['X', 'O', 'X', 'O', 'O', 'X', 'X', 'X', 'O'];
  expect(calculateWinner(squares)).toEqual({ line: null, player: null });
});

it('recognizes correct winner', () => {
  let squares = ['X', 'X', 'X', null, null, null, null, null, 'O'];
  expect(calculateWinner(squares)).toEqual({ line: [0, 1, 2], player: 'X' });

  squares = ['X', 'X', 'O', null, 'O', null, 'O', null, null];
  expect(calculateWinner(squares)).toEqual({ line: [2, 4, 6], player: 'O' });
});
