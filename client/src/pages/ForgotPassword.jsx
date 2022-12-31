import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Input from '../miscellaneous/Input';
import { AiOutlineArrowLeft } from "react-icons/ai";
import Logo from "../miscellaneous/Logo";
import Btn from "../miscellaneous/Btn";

const ForgotPassword = () => {
    return (
        <Container>
            <Row>
                <Col
                    lg="5"
                    md="12"
                    sm="12"
                    className="m-auto my-4 shadow p-3 bg-white rounded-3 "
                >
                    <div className="d-flex justify-content-between align-items-center fw-bold ">
                        <Link to="/login">
                            <AiOutlineArrowLeft />
                        </Link>
                    </div>
                    <div className="my-3">
                        <Logo />
                        <div className="py-2 fw-bold text-secondary">
                            We'll sent a link on your registered mail id, Please go there and
                            change your key from there.
                        </div>
                    </div>
                    <Form>
                        <div className="mb-3">
                            <Input
                                id="email"
                                type="text"
                                placeholder="Enter your registered mail id"
                                text="Enter your registered mail id"
                            />
                        </div>

                        <div className="mt-3">
                            <Btn variant="dark" text="Send Mail" size="lg" type="submit" />
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ForgotPassword;