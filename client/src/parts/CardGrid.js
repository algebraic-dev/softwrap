import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserCard from '../components/UserCard';

function CardGrid({ users }) {
  return (
    <Row className="mx-auto">
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
      civil_state: PropTypes.string,
      cpf: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
    }),
  ).isRequired,
};

export default CardGrid;
