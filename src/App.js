import React, { useState } from 'react';

import Game from './game/Game';
import Modal from './modal/Modal';
import Stats from './stats/Stats';

const App = () => {
  const [isOpen, setIsOpen] = useState(true);

  const onClose = () => setIsOpen(false);

  return (
    <>
      <Game />
      <Stats />
      <Modal isOpen={isOpen} onClose={onClose}>
        <h1>Championship Stats</h1>
        <ul>
          <li>
            Won: <b>1</b>
          </li>
          <li>
            Lost: <b>1</b>
          </li>
          <li>
            Tied: <b>1</b>
          </li>
        </ul>
      </Modal>
    </>
  );
};

export default App;
