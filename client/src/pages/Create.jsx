import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import './Create.css';

function MyVerticallyCenteredModal(props) {
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
                        <Form.Control type="text" placeholder="Enter title" className=" shadow-none" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <textarea className="form-control shadow-none" placeholder='Enter description' rows="5"></textarea>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check type="checkbox" className="shadow-none" label="Mark as Important" />
                    </Form.Group>
                    <Button variant="primary" type="button">
                        Create
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