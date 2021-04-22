import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ModalContext } from '../contexts/ModalContext';

function UserEditModal() {
  const [state, setState] = useContext(ModalContext);
  const handleClose = () => setState({ action: 'hide' });
  return (
    <Modal show={state.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit an user!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Ata
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Register user
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserEditModal;
