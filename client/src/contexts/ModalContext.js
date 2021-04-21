import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const ModalContext = createContext();

export function ModalProvider({ children }) {
  const state = useState({ show: false, id: 0 });
  return (
    <ModalContext.Provider value={state}>
      {children}
    </ModalContext.Provider>
  );
}

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
