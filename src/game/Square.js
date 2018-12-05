import React from 'react';

import './Square.css';

const Square = ({ disabled, onClick, value }) => {
  const isDisabled = value || disabled;

  return (
    <button
      className={`square ${isDisabled ? 'disabled' : ''}`}
      onClick={isDisabled ? null : onClick}
    >
      {value}
    </button>
  );
};

export default Square;
