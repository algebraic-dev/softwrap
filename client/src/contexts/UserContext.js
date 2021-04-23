import React, { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext();

function reducer(state, data) {
  if (data.action === 'add') {
    return [data.user, ...state];
  }
  if (data.action === 'update') {
    const index = state.findIndex((user) => user.id === data.id);
    const newState = state.slice();
    newState[index] = data.user;
    return newState;
  }
  if (data.action === 'remove') {
    return state.filter((user) => user.id !== data.id);
  }
  if (data.action === 'set') {
    return data.users;
  }
  return state;
}

async function getPage() {
  let res = await fetch('http://localhost:4040/user/search/0', {
    mode: 'cors',
    method: 'GET',
  });
  res = await res.json();
  return res.map((user) => {
    const newUser = user;
    return newUser;
  });
}

export function UserProvider({ children }) {
  const [state, setState] = useReducer(reducer, []);

  useEffect(() => {
    getPage().then((res) => setState({ action: 'set', users: res }));
  }, []);

  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
