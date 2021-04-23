import React from 'react';
import PropTypes from 'prop-types';
import UserCard from '../components/UserCard';

function CardGrid({ users }) {
  return (
    <table style={{ width: '90%', marginLeft: '5%', marginBottom: '50px' }}>
      <tr>
        <th>Nome</th>
        <th>Idade</th>
        <th>Estado Civil</th>
        <th>CPF</th>
        <th>Cidade</th>
        <th>Estado</th>
        <th>Idade</th>
        <th>Editar</th>
        <th>Remover</th>
      </tr>
      {
        users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))
      }
    </table>
  );
}

CardGrid.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      fullname: PropTypes.string,
      age: PropTypes.number,
      civil_state: PropTypes.string,
      cpf: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
    }),
  ).isRequired,
};

export default CardGrid;
