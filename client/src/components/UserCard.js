import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DateUtil from '../utils/Date';

import { ModalContext } from '../contexts/ModalContext';
import { UserContext } from '../contexts/UserContext';

const civilStates = ['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)', 'Separado(a)'];
function UserCard({ user }) {
  const [, setUsers] = useContext(UserContext);
  const [, setState] = useContext(ModalContext);
  async function deleteUser(id) {
    await fetch(`http://localhost:4040/user/${id}`, {
      method: 'DELETE',
      mode: 'cors',
    });
    setUsers({ action: 'remove', id: user.id });
  }
  const showModel = async () => {
    setState({ action: 'show', user });
  };
  return (
    <Card className="smooth-shadow p-3 mx-auto mb-5 bg-white rounded" style={{ width: '17rem', border: 'none' }}>
      <Card.Body>
        <Card.Title>{user.fullname}</Card.Title>
        <Card.Text>
          Idade:
          {DateUtil.calcAgeFromDate(user.birthday)}
          <br />
          Estado civil:
          {civilStates[user.civil_state]}
          <br />
          CPF:
          {user.cpf}
          <br />
          Cidade:
          {user.city}
          <br />
          Estado:
          {user.state}
        </Card.Text>
        <div style={{ textAlign: 'center' }}>
          <Button variant="primary" onClick={showModel} className="mr-4">Editar</Button>
          <Card.Link style={{ cursor: 'pointer' }} onClick={() => deleteUser(user.id)}>Remover</Card.Link>
        </div>
      </Card.Body>
    </Card>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    fullname: PropTypes.string,
    birthday: PropTypes.instanceOf(Date),
    civil_state: PropTypes.string,
    cpf: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
  }).isRequired,
};

export default UserCard;
