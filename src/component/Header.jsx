import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Header.css';

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [createdAt] = useState(new Date().toLocaleDateString())


  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleSave = () => {
    const newNote = { title, message, createdAt };
    const noteId = `${Date.now()}`;
    localStorage.setItem(noteId, JSON.stringify(newNote));
    window.location.reload();
    handleClose();
  };


  return (
    <>
      <div className="page_name">
        <div className="company_name">My Notes</div>
        <Button variant="light" onClick={handleShow}>
          <span>
            <FaPlus /> Add new
          </span>
        </Button>
      </div>

      <Modal show={showModal}>
        <Modal.Header>
          <Form.Control
            placeholder="Title"
            aria-label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-describedby="basic-addon1"
          />
        </Modal.Header>
        <Modal.Body>
          <textarea
            placeholder="Type..."
            rows={10}
            cols={30}
            className="textarea_text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button className="action_btn" onClick={handleSave}>
            Save
          </Button>
          <Button className="action_btn" onClick={handleClose} >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
