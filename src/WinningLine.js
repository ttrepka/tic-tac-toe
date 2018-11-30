import React from 'react';

import './WinningLine.css';

const SQUARE_HEIGHT = 33;
const LINE_HEIGHT = 4;

const WinningLine = ({ line }) => {
  if (!line) {
    return null;
  }

  const classNames = ['winning-line'];
  let style;

  const [a, b, c] = line;
  const lineStart = (SQUARE_HEIGHT - LINE_HEIGHT) / 2;

  // horizontal line
  if (c - a === 2) {
    const rowNumber = a / 3;

    classNames.push('winning-line--horizontal');
    style = {
      top: `${lineStart + rowNumber * SQUARE_HEIGHT}px`
    };
  }

  // vertical line
  else if (c - a === 6) {
    const columnNumber = a;

    classNames.push('winning-line--vertical');
    style = {
      left: `${lineStart + columnNumber * SQUARE_HEIGHT}px`
    };
  }

  // diagonal line
  else if (b === 4) {
    classNames.push('winning-line--diagonal');

    if (a !== 0) {
      classNames.push('winning-line--diagonal-opposite');
    }
  }

  return <div className={classNames.join(' ')} style={style} />;
};

export default WinningLine;
