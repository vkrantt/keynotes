import React from 'react'
import { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { FiEdit, FiTrash2 } from "react-icons/fi";
import noteContext from '../context/notes/noteContext';
import classes from './Cards.module.css';

const Cards = ({ note, updateNote }) => {
    const { deleteNote } = useContext(noteContext);
    const handleDelete = (id) => {
        deleteNote(id);
    }
    return (
        <Card className={` mb-3 shadow-sm bg-light ${classes.card}`}>
            <Card.Body className='p-2 px-3'>
                <Card.Title>{note?.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{note?.important && 'Important'}</Card.Subtitle>
                <Card.Text className=' mb-0'>
                    {note?.description}
                </Card.Text>
                <div className={`d-flex mb-0 ${classes.controller}`}>
                    <Button onClick={() => updateNote(note)} variant='white' className="btn btn-sm p-0 me-3 shadow-none border-0"><FiEdit /></Button>
                    <Button variant='white' className="btn btn-sm p-0 m-0 fs-6 shadow-none border-0"
                        onClick={() => handleDelete(note?._id)}><FiTrash2 /></Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default Cards