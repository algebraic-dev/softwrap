import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DateUtil from '../utils/Date';

// TODO: Add little right margin between the button and the link
// and make the link and button a little more intuitive.
function UserCard({ user }) {
  return (
    <Card className="smooth-shadow p-3 mx-auto mb-5 bg-white rounded" style={{ width: '17rem', border: 'none' }}>
      <Card.Body>
        <Card.Title>Lorem ipsum dolor sit a met</Card.Title>
        <Card.Text>
          Idade:
          {DateUtil.calcAgeFromDate(user.birthday)}
          <br />
          Estado civil:
          {user.martial_state}
          <br />
          CPF:
          {user.cpf}
          <br />
          Cidade-Estado:
          {user.city_state}
        </Card.Text>
        <div style={{ 'text-align': 'center' }}>
          <Button variant="primary" className="mr-4">Editar</Button>
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
    martial_state: PropTypes.oneOf(['Casado(a)', 'Solteiro(a)', 'Viuvo(a)']),
    cpf: PropTypes.string,
    city_state: PropTypes.string,
  }).isRequired,
};

export default UserCard;
