import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export function PopupModal({ show, setShow, confirmAction, message }) {
  const handleClose = () => setShow(false)

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{message.modalHeading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message.modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => confirmAction(false)}
            className="bg-primary text-white"
          >
            {message.changeIndex !== 'Error' ? ' yes' : 'Retry'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
