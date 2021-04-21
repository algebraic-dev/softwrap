import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserCard from '../components/UserCard';

// TODO: Add little right margin between the button and the link
// and make the link and button a little more intuitive.
function CardGrid({ users }) {
  return (
    <Row>
      {
        users.map((user) => (
          <Col key={user.id}>
            <UserCard key={user.id} user={user} />
          </Col>
        ))
      }
    </Row>
  );
}

CardGrid.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      fullname: PropTypes.string,
      birthday: PropTypes.instanceOf(Date),
      martial_state: PropTypes.oneOf(['Casado(a)', 'Solteiro(a)', 'Viuvo(a)']),
      cpf: PropTypes.string,
      city_state: PropTypes.string,
    }),
  ).isRequired,
};

export default CardGrid;
