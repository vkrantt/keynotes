import React from 'react'
import { Button, Card } from 'react-bootstrap';
import { FiEdit, FiTrash2 } from "react-icons/fi";

const Cards = ({ note }) => {
    return (
        <Card className="mb-4 shadow-sm bg-light ">
            <Card.Body>
                <Card.Title>{note.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{note.important && 'Important'}</Card.Subtitle>
                <Card.Text>
                    {note.description}
                </Card.Text>
                <div className="d-flex">
                    <Button variant='white' className="btn btn-sm p-0 me-3 shadow-none border-0"><FiEdit /></Button>
                    <Button variant='white' className="btn btn-sm p-0 m-0 fs-6 shadow-none border-0"><FiTrash2 /></Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default Cards