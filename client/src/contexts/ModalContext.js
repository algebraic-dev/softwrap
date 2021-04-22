import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const ModalContext = createContext();

function reducer(state, data) {
  if (data.action === 'show') {
    return { show: true, user: data.user };
  }
  if (data.action === 'hide') {
    return { show: false, user: {} };
  }
  if (data.action === 'clear') {
    return { show: false, user: {} };
  }
  if (data.action === 'change') {
    const newState = state;
    newState.user[data.key] = data.value;
    return state;
  }
  return state;
}

export function ModalProvider({ children }) {
  const state = useReducer(reducer, { action: 'hide', user: {} });
  return (
    <ModalContext.Provider value={state}>
      {children}
    </ModalContext.Provider>
  );
}

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
