import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../styles/NoteInput.css';

function NoteDisplay() {
  const [notes, setNotes] = useState([]);
  const [modal, setModal] = useState(false);
  const [currentNote, setCurrentNote] = useState({
    id: '',
    title: '',
    message: '',
    timeString: new Date().toLocaleDateString(),
  });


  useEffect(() => {
    const storedNotes = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const note = JSON.parse(localStorage.getItem(key));
      storedNotes.push({ id: key, ...note });
    }
    setNotes(storedNotes);
  }, []);

  const handleDelete = (id) => {
    localStorage.removeItem(id);
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleEdit = (id) => {
    const noteToEdit = JSON.parse(localStorage.getItem(id));
    setCurrentNote({ id, ...noteToEdit });
    setModal(true);
  };
  const handleUpdate = () => {
    const { id, title, message, timeString } = currentNote;
    localStorage.setItem(id, JSON.stringify({ title, message, timeString}));
    setNotes(
      notes.map((note) =>
        note.id === id ? { id, title, message , timeString} : note
      )
    );
    setModal(false);
   console.log('Testing',  { id, title, message, timeString })
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentNote((prevNote) => ({ ...prevNote, [name]: value }));
  };


  return (
    <>
      <div className="note_display container">
        <div className="row">
          {notes.map((note) => (
            <Card key={note.id} className="col-lg-3 col-md-6 col-sm-12 note_card">
              <Card.Body>
                <Card.Title>{note.title}</Card.Title>
                <Card.Text>{note.message}</Card.Text>
                <div className="card_footer">
                  <Card.Text>{note.createdAt}</Card.Text>
                  <span className="edit_and_delete">
                    <FaTrash onClick={() => handleDelete(note.id)} />
                    <FaEdit onClick={() => handleEdit(note.id)} />
                  </span>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>

      <Modal show={modal} onHide={() => setModal(false)}>
        <Modal.Header>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNoteTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={currentNote.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formNoteMessage" className="mt-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="message"
                value={currentNote.message}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className='action_btn' onClick={() => setModal(false)}>
            Close
          </Button>
          <Button className='action_btn' onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NoteDisplay;
