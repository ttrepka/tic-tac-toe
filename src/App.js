import React, { useState } from 'react';

import ChampionshipModal from './stats/Championship';
import Game from './game/Game';
import Modal from './modal/Modal';
import Stats from './stats/Stats';

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);

  return (
    <>
      <Game />
      <Stats />
      <button onClick={openModal}>Championship Stats</button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ChampionshipModal />
      </Modal>
    </>
  );
};

export default App;
