import React, { useContext, useReducer } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import UserForm from './UserForm';
import { UserContext } from '../contexts/UserContext';

function reducer(state, data) {
  if (data.action === 'change') {
    const newState = state;
    newState[data.key] = data.value;
    return state;
  }
  if (data.action === 'clear') {
    return { civil_state: '0' };
  }
  return state;
}

function UserAddModal({ state, setState }) {
  const [, setUsers] = useContext(UserContext);
  const handleClose = () => setState(false);
  const [user, setProp] = useReducer(reducer, { civil_state: '0' });
  const setUser = (key, value) => setProp({ key, value, action: 'change' });

  const submitAndClose = async (e) => {
    e.preventDefault();
    let res = await fetch('http://localhost:4040/user/new', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(user),
    });
    res = await res.json();
    setUsers({ action: 'add', user: res });
    setProp({ action: 'clear' });
    handleClose();
  };
  return (
    <Modal show={state} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add an user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UserForm id="adduser" user={user} setUser={setUser} onSubmit={submitAndClose} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
        <Button variant="primary" type="submit" form="adduser">
          Adicionar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

UserAddModal.propTypes = {
  state: PropTypes.bool.isRequired,
  setState: PropTypes.func.isRequired,
};

export default UserAddModal;
