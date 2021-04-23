import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { formatDate } from '../utils/Date';

function UserForm({
  user,
  setUser,
  id,
  onSubmit,
}) {
  const [validated, setValidated] = useState(false);

  // It's used for currying inside the onChange.
  const setUserProp = (prop) => (event) => (setUser(prop, event.target.value));
  const [birthday, setBirthday] = useState(formatDate(user.birthday ? user.birthday : new Date()));

  const checkOnSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      onSubmit(event);
    }
    setValidated(true);
  };
  return (
    <Form noValidate validated={validated} id={id} onSubmit={checkOnSubmit}>
      <Form.Label>Fullname</Form.Label>
      <Form.Control required type="text" placeholder="Fullname" value={user.fullname} onChange={setUserProp('fullname')} />
      <br />
      <Form.Group controlId="exampleForm.SelectCustom">
        <Form.Label>Civil State</Form.Label>
        <Form.Control required value={user.civil_state} onChange={setUserProp('civil_state')} as="select" custom>
          <option value={0}>Solteiro(a)</option>
          <option value={1}>Casado(a)</option>
          <option value={2}>Divorciado(a)</option>
          <option value={3}>Viúvo(a)</option>
          <option value={4}>Separado(a)</option>
        </Form.Control>
      </Form.Group>
      <Form.Label>CPF</Form.Label>
      <Form.Control
        required
        value={user.cpf}
        onChange={setUserProp('cpf')}
        className="form-control"
        type="number"
        placeholder="Ex: 1231231230"
      />
      <br />
      <Form.Label>City</Form.Label>
      <Form.Control required value={user.city} onChange={setUserProp('city')} type="text" placeholder="City" />
      <br />
      <Form.Label>State</Form.Label>
      <Form.Control required value={user.state} onChange={setUserProp('state')} type="text" placeholder="State" />
      <br />
      <Form.Label>Birthday</Form.Label>
      <br />
      <Form.Control
        required
        type="date"
        value={birthday}
        onChange={(event) => {
          setBirthday(event.target.value);
          setUser('birthday', new Date(event.target.value));
        }}
      />
    </Form>
  );
}

UserForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    fullname: PropTypes.string,
    birthday: PropTypes.objectOf(Date),
    civil_state: PropTypes.string,
    cpf: PropTypes.number,
    city: PropTypes.string,
    state: PropTypes.string,
  }),
  setUser: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

UserForm.defaultProps = {
  user: { fullname: '' },
};

export default UserForm;
