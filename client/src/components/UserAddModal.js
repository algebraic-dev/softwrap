import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

function UserAddModal({ state, setState }) {
  const handleClose = () => setState(false);
  return (
    <Modal show={state} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add an user</Modal.Title>
      </Modal.Header>
      <Modal.Body>Lorem Ipsum</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Adicionar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

UserAddModal.propTypes = {
  state: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
};

export default UserAddModal;
