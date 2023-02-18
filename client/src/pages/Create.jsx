import React, { useState } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { BASE_URL } from '../services/helper';
import './Create.css';
import { ToastContainer, toast } from "react-toastify";
import storage from '../utils/storage';

function MyVerticallyCenteredModal(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [note, setNote] = useState({
        title: '',
        description: '',
        important: false
    })
    const handleChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value,
        })
    }
    const checkhandleChange = (e) => {
        setNote({
            ...note,
            important: e.target.checked,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}api/auth/createnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": storage.get('thread_token')
            },
            body: JSON.stringify({
                title: note.title,
                description: note.description,
                important: note.important
            }),
        });

        const json = await response.json();

        switch (json.status) {
            case 411:
                json.response.map((err) =>
                    toast(err.msg, {
                        position: "top-right",
                    })
                );
                setIsLoading(false);
                break;
            case 201:
                toast(json.response);
                setIsLoading(false);
                props.onHide();
                break;
            case 501:
                toast(json.response);
                setIsLoading(false);
                break;

            default:
                break;
        }
        setIsLoading(false);
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered

        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add a keynote
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >

                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Keynote Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter title" className=" shadow-none" name="title" onChange={handleChange} value={note.title} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <textarea className="form-control shadow-none" placeholder='Enter description' rows="5" name="description" onChange={handleChange} value={note.description} ></textarea>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check type="checkbox" className="shadow-none" label="Mark as Important" name="important" onChange={checkhandleChange} />
                    </Form.Group>
                    <Button disabled={!note.title} variant="primary" type="button" onClick={handleSubmit}>
                        {isLoading ? <Spinner animation="border" size="sm" /> : 'Create'}
                    </Button>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

const Create = () => {
    const [modalShow, setModalShow] = useState(false);
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Button className="border-0" onClick={() => setModalShow(true)}>
                Create Keynote
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}

export default Create