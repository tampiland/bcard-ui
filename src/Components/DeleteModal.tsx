import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

interface DeleteModalProps {
  show: boolean;
  onConfirm: () => void;
  onDismiss?: () => void;
}

const DeleteModal = (props: DeleteModalProps) => {
  return (
    <Modal show={props.show} onHide={props.onDismiss} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete card?</Modal.Title>
      </Modal.Header>
      <Modal.Body>There's no turning back if you click 'yes'</Modal.Body>
      <Modal.Footer>
        <Button variant='danger' size='sm' onClick={props.onConfirm}>
          Yes!
        </Button>
        <Button variant='secondary' size='sm' onClick={props.onDismiss}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
