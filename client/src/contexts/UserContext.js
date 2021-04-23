import React, { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { getPage } from '../utils/Api';

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
      page: data.page ? data.page : 0,
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

export function UserProvider({ children }) {
  const [state, setState] = useReducer(reducer, { pages: 0, users: [], page: 0 });

  useEffect(() => {
    getPage(0).then((res) => setState({
      action: 'set',
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
