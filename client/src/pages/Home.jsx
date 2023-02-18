import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import Cards from '../components/Cards';
import { BASE_URL } from '../services/helper';
import storage from '../utils/storage';

const Home = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [notes, setNotes] = useState([]);


    useEffect(() => {
        setIsLoading(true)
        fetch(`${BASE_URL}api/auth/getallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": storage.get('thread_token')
            }
        }).then(response => response.json()).then(data => {
            setNotes(data.notes);
            setIsLoading(false);
        })
    }, []);

    return (
        <Container>
            <h4 className="mt-5">All keynotes [{notes.length}]</h4>
            {isLoading ?
                <div className='text-center my-5'>
                    <Spinner animation="grow" />
                </div>
                : <Row className='my-3'>
                    {notes.map((note, i) => (
                        <Col lg="4" key={i}>
                            <Cards note={note} />
                        </Col>
                    ))}
                </Row>}
        </Container>
    )
}

export default Home