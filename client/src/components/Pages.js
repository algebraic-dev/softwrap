import React, { useContext } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import PropTypes from 'prop-types';
import { UserContext } from '../contexts/UserContext';

const getPage = async (page) => {
  let res = await fetch(`http://localhost:4040/user/list/${page}`, {
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
};

function Pages({ page, last }) {
  const [state, setState] = useContext(UserContext);
  const changePage = async (action) => {
    const payload = await getPage(state.page + (action === 'inc' ? 1 : -1));
    setState({
      action: 'paginate',
      page: action,
      pages: payload.pages,
      users: payload.users,
    });
  };
  return (
    <Pagination className="justify-content-center">
      {page !== 0 ? <Pagination.First onClick={() => changePage('dec')} /> : null}
      <Pagination.Item>{page}</Pagination.Item>
      {page !== last ? <Pagination.Last onClick={() => changePage('inc')} /> : null}
    </Pagination>
  );
}

Pages.propTypes = {
  page: PropTypes.number.isRequired,
  last: PropTypes.number.isRequired,
};

export default Pages;
