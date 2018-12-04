import React, { useState } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import ChampionshipModal from './stats/Championship';
import Game from './game/Game';
import Modal from './modal/Modal';
import rootReducer from './rootReducer';
import Stats from './stats/Stats';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);

  return (
    <Provider store={store}>
      <>
        <Game />
        <Stats />
        <button onClick={openModal}>Championship Stats</button>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ChampionshipModal />
        </Modal>
      </>
    </Provider>
  );
};

export default App;
