import React from 'react';

import './Square.css';

const Square = props => {
  const disabled = props.value || props.disabled;

  return (
    <button
      className={`square ${disabled ? 'disabled' : ''}`}
      onClick={disabled ? null : props.onClick}
    >
      {props.value}
    </button>
  );
};

export default Square;
