import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DateUtil from '../utils/Date';

// TODO: Add little right margin between the button and the link
// and make the link and button a little more intuitive.
function UserCard({ user }) {
  return (
    <Card class="shadow-large p-3 mb-5 bg-white rounded" style={{ width: '15rem', textAlign: 'center' }}>
      <Card.Body>
        <Card.Title>Lorem ipsum dolor sit a met</Card.Title>
        <Card.Text>
          Idade:
          {DateUtil.calcAgeFromDate(user.birthday)}
        </Card.Text>
        <Card.Text>
          Estado civil:
          {user.martial_state}
        </Card.Text>
        <Card.Text>
          CPF:
          {user.cpf}
        </Card.Text>
        <Card.Text>
          Cidade-Estado:
          {user.city_state}
        </Card.Text>
        <Button variant="primary">Editar</Button>
        <Card.Link href="#">Remover</Card.Link>
      </Card.Body>
    </Card>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    fullname: PropTypes.string,
    birthday: PropTypes.instanceOf(Date),
    martial_state: PropTypes.oneOf(['Casado(a)', 'Solteiro(a)', 'Viuvo(a)']),
    cpf: PropTypes.string,
    city_state: PropTypes.string,
  }).isRequired,
};

export default UserCard;
