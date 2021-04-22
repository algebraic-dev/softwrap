import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext();

function reducer(state, data) {
  if (data.action === 'add') {
    state.push(data.user);
    return state;
  }
  if (data.action === 'update') {
    const index = state.findIndex((user) => user.id === data.id);
    const newState = state;
    newState[index] = data.user;
    return newState;
  }
  if (data.action === 'remove') {
    return data.filter((user) => user.id !== data.id);
  }
  return state;
}

async function getPage() {
  let res = await fetch('localhost:4040/user/search');
  res = await res.json();
  return res;
}

export function UserProvider({ children }) {
  const state = useReducer(reducer, getPage());

  return (
    <UserContext.Provider value={state}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
