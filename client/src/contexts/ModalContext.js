import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const ModalContext = createContext();

function reducer(state, data) {
  if (data.action === 'show') {
    return { show: true, user: {} };
  }
  if (data.action === 'hide') {
    return { show: false, user: {} };
  }
  return state;
}

export function ModalProvider({ children }) {
  const state = useReducer(reducer, { action: 'hide' });
  return (
    <ModalContext.Provider value={state}>
      {children}
    </ModalContext.Provider>
  );
}

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
