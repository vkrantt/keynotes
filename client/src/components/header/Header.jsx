import React from 'react';
import { useContext } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import noteContext from '../../context/notes/noteContext';
import Create from '../../pages/Create';
import storage from '../../utils/storage';
import classes from './Header.module.css';

const Header = () => {
    const token = storage.get("thread_token");
    const { loggedInUser } = useContext(noteContext);
    const handleLogout = () => {
        storage.remove("thread_token");
        window.location.pathname = "/";
    };

    return (
        <Navbar collapseOnSelect expand="lg" variant='dark' className={`${classes.header}`}>
            <Container>
                <Navbar.Brand as={Link} to="/">keynotes</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className="border-0 shadow-none p-0 fs-6" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {token &&
                            //Items 
                            < Create />
                        }
                    </Nav>
                    {
                        !token ? (
                            <Nav>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link eventKey={2} as={Link} to="/signup">
                                    Signup
                                </Nav.Link>
                            </Nav>
                        ) : (
                            <Nav>
                                <h6 className='text-light mt-2'>Logged In as: {loggedInUser?.firstName}</h6>
                                <Button className={`border-0 mx-3`} onClick={handleLogout}>Logout</Button>
                            </Nav>
                        )
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header