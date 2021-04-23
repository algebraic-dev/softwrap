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
  const setUserProp = (prop) => (event) => setUser(prop, event.target.value);
  const [birthday, setBirthday] = useState(formatDate(new Date(user.birthday)));

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
      <Form.Label>Nome completo</Form.Label>
      <Form.Control
        required
        type="text"
        placeholder="Ex: João Silva"
        value={user.fullname}
        onChange={setUserProp('fullname')}
      />
      <br />
      <Form.Group controlId="exampleForm.SelectCustom">
        <Form.Label>Estado civil</Form.Label>
        <Form.Control
          required
          value={user.civil_state}
          onChange={(e) => setUser('civil_state', parseInt(e.target.value, 10))}
          as="select"
          custom
        >
          <option value="0">Solteiro(a)</option>
          <option value="1">Casado(a)</option>
          <option value="2">Divorciado(a)</option>
          <option value="3">Viúvo(a)</option>
          <option value="4">Separado(a)</option>
        </Form.Control>
      </Form.Group>
      <Form.Label>CPF</Form.Label>
      <Form.Control
        required
        value={user.cpf}
        onChange={setUserProp('cpf')}
        className="form-control"
        type="text"
        placeholder="Ex: 1231231230"
      />
      <br />
      <Form.Label>Cidade</Form.Label>
      <Form.Control
        required
        value={user.city}
        onChange={setUserProp('city')}
        type="text"
        placeholder="Ex: São Paulo"
      />
      <br />
      <Form.Label>Estado</Form.Label>
      <Form.Control
        required
        value={user.state}
        onChange={setUserProp('state')}
        type="text"
        placeholder="Ex: São Paulo"
      />
      <br />
      <Form.Label>Data de nascimento</Form.Label>
      <br />
      <Form.Control
        required
        type="date"
        value={birthday}
        onChange={(event) => {
          setBirthday(event.target.value);
          setUser('birthday', event.target.value);
        }}
      />
    </Form>
  );
}

UserForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    fullname: PropTypes.string,
    birthday: PropTypes.string,
    civil_state: PropTypes.number,
    cpf: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
  }),
  setUser: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

UserForm.defaultProps = {
  user: { fullname: '', civil_state: 0 },
};

export default UserForm;
