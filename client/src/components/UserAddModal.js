import React, { useReducer } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import UserForm from './UserForm';

function reducer(state, data) {
  if (state.action === 'change') {
    const newState = state;
    newState[data.key] = data.value;
    return state;
  }
  if (state.action === 'clear') {
    return {};
  }
  return state;
}

function UserAddModal({ state, setState }) {
  const handleClose = () => setState(false);
  const [user, setProp] = useReducer(reducer, {});
  const setUser = (key, value) => setProp({ key, value, action: 'change' });
  const submitAndClose = (e) => {
    e.preventDefault();
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
