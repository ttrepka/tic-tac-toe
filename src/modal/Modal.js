import React from 'react';
import ReactDOM from 'react-dom';

import './Modal.css';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ children, isOpen, onClose }) =>
  isOpen &&
  ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );

export default Modal;
