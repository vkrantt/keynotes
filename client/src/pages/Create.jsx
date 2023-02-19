import React, { useState, useContext, useEffect, createRef } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import './Create.css';
import { ToastContainer, toast } from "react-toastify";
import noteContext from '../context/notes/noteContext';

function MyVerticallyCenteredModal(props) {
    const myRef = createRef(null);
    const { createNotes, updateNoteData, editNote } = useContext(noteContext)
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState({});
    const [note, setNote] = useState({
        title: '',
        description: '',
        important: false
    })
    const node = myRef.current
    useEffect(() => {
        if (updateNoteData) {
            setNote({
                title: updateNoteData.title,
                description: updateNoteData.description,
            })
        }
    }, [updateNoteData, node])

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
        if (updateNoteData) {
            await editNote(updateNoteData._id, note);
            toast('Note updated.');
            setIsLoading(false);
            props.onHide();
            setNote({
                title: '',
                description: '',
                important: false
            })
            return;
        } else {
            setResponse(await createNotes(note))
        }

        switch (response.status) {
            case 411:
                response.response.map((err) =>
                    toast(err.msg, {
                        position: "top-right",
                    })
                );
                setIsLoading(false);
                break;
            case 201:
                toast(response.response);
                setIsLoading(false);
                props.onHide();
                setNote({
                    title: '',
                    description: '',
                    important: false
                })
                break;
            case 501:
                toast(response.response);
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

                {/* Form start */}
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Keynote Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter title" className=" shadow-none rounded-0" name="title" onChange={handleChange} value={note.title} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <textarea className="form-control shadow-none rounded-0" placeholder='Enter description' rows="5" name="description" onChange={handleChange} value={note.description} ></textarea>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check type="checkbox" checked={updateNoteData?.important ? true : false} id="important" label="Mark as Important" name="important" onChange={checkhandleChange} />
                    </Form.Group>
                    <Button size="sm" disabled={!note.title} variant="primary" type="button" onClick={handleSubmit}>
                        {isLoading ? <Spinner animation="border" size="sm" /> : updateNoteData ? 'Update' : 'Create'}
                    </Button>
                </Form>
                {/* Form End */}

            </Modal.Body>
        </Modal>
    );
}

const Create = () => {
    const { modalShow, setModalShow } = useContext(noteContext)
    return (
        <>
            <ToastContainer
                autoClose={1000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Button className="border-0" size="sm" onClick={() => setModalShow(true)}>
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