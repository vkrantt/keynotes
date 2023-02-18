import React, { useContext } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import Cards from '../components/Cards';
import noteContext from '../context/notes/noteContext';

const Home = () => {
    const { allNotes, isLoading } = useContext(noteContext);
    return (
        <Container>
            <h4 className="mt-5">All keynotes [{allNotes.length || 0}]</h4>
            {isLoading ?
                <div className='text-center my-5'>
                    <Spinner animation="grow" />
                </div>
                : <Row className='my-3'>
                    {allNotes.map((note, i) => (
                        <Col lg="4" key={i}>
                            <Cards note={note} />
                        </Col>
                    ))}
                </Row>}
        </Container>
    )
}

export default Home