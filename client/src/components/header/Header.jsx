import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Create from '../../pages/Create';
import storage from '../../utils/storage';
import classes from './Header.module.css';

const Header = () => {
    const token = storage.get("thread_token");
    const handleLogout = () => {
        storage.remove("thread_token");
        window.location.pathname = "/login";
    };

    return (
        <Navbar collapseOnSelect expand="lg" variant='dark' className={`${classes.header}`}>
            <Container>
                <Navbar.Brand as={Link} to="/">keynotes</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className="border-0 shadow-none p-0 fs-6" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {/* Items */}
                        <Create />
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

                                <Button className={`border-0 ${classes.header}`} size="sm" onClick={handleLogout}>Logout</Button>
                            </Nav>
                        )
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header