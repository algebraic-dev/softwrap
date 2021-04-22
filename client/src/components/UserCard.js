import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DateUtil from '../utils/Date';

import { ModalContext } from '../contexts/ModalContext';

function UserCard({ user }) {
  const [, setState] = useContext(ModalContext);
  return (
    <Card className="smooth-shadow p-3 mx-auto mb-5 bg-white rounded" style={{ width: '17rem', border: 'none' }}>
      <Card.Body>
        <Card.Title>Lorem ipsum dolor sit a met</Card.Title>
        <Card.Text>
          Idade:
          {DateUtil.calcAgeFromDate(user.birthday)}
          <br />
          Estado civil:
          {user.civil_state}
          <br />
          CPF:
          {user.cpf}
          <br />
          Cidade:
          {user.city}
          <br />
          Estado:
          {user.city}
        </Card.Text>
        <div style={{ textAlign: 'center' }}>
          <Button variant="primary" onClick={() => setState({ show: true, id: user.id })} className="mr-4">Editar</Button>
          <Card.Link href="#">Remover</Card.Link>
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
