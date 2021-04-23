import React, { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext();

function reducer(state, data) {
  if (data.action === 'add') {
    return { users: [data.user, ...state.users], page: state.page, pages: state.pages };
  }
  if (data.action === 'update') {
    const index = state.users.findIndex((user) => user.id === data.id);
    const newUsers = state.users.slice();
    newUsers[index] = data.user;
    return { page: state.page, users: newUsers, pages: state.pages };
  }
  if (data.action === 'remove') {
    return {
      page: state.page,
      pages: state.pages,
      users: state.users.filter((user) => user.id !== data.id),
    };
  }
  if (data.action === 'set') {
    return {
      page: 0,
      pages: data.pages,
      users: data.users,
    };
  }
  if (data.action === 'paginate') {
    return {
      page: data.page === 'inc' ? state.page + 1 : state.page - 1,
      pages: data.pages,
      users: data.users,
    };
  }
  return state;
}

async function getPage() {
  let res = await fetch('http://localhost:4040/user/list/0', {
    mode: 'cors',
    method: 'GET',
  });
  res = await res.json();
  return {
    pages: res.pages,
    users: res.users.map((user) => {
      const newUser = user;
      return newUser;
    }),
  };
}

export function UserProvider({ children }) {
  const [state, setState] = useReducer(reducer, { pages: 0, users: [], page: 0 });

  useEffect(() => {
    getPage().then((res) => setState({
      action: 'set',
      page: 'inc',
      users: res.users,
      pages: res.pages,
    }));
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
