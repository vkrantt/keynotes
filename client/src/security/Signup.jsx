import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FcCheckmark } from "react-icons/fc";
import { IoCloseSharp } from "react-icons/io5";
import storage from "../utils/storage";
import Input from '../miscellaneous/Input';
import Btn from '../miscellaneous/Btn'
import Logo from "../miscellaneous/Logo";
import classes from './Signup.module.css';
import { BASE_URL } from "../services/helper";


const Signup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [credentials, setCredentials] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
    const [lowerCheck, setLowerCheck] = useState(false);
    const [upperCheck, setupperCheck] = useState(false);
    const [numberCheck, setNumberCheck] = useState(false);
    const [spacialCheck, setspacialCheck] = useState(false);
    const [lengthCheck, setLengthCheck] = useState(false);

    const lower = new RegExp("(?=.*[a-z])");
    const upper = new RegExp("(?=.*[A-Z])");
    const number = new RegExp("(?=.*[0-9])");
    const spacial = new RegExp("(?=.*[!@#$%^&*])");
    const length = new RegExp("(?=.{8,})");

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });

        if (e.target.name === "password") {
            if (e.target.value.match(lower)) {
                setLowerCheck(true);
            } else {
                setLowerCheck(false);
            }

            if (e.target.value.match(upper)) {
                setupperCheck(true);
            } else {
                setupperCheck(false);
            }

            if (e.target.value.match(number)) {
                setNumberCheck(true);
            } else {
                setNumberCheck(false);
            }

            if (e.target.value.match(spacial)) {
                setspacialCheck(true);
            } else {
                setspacialCheck(false);
            }

            if (e.target.value.match(length)) {
                setLengthCheck(true);
            } else {
                setLengthCheck(false);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName: credentials.firstName,
                lastName: credentials.lastName,
                email: credentials.email,
                password: credentials.password
            }),
        });

        const json = await response.json();
        switch (json.status) {
            case 411:
                json.response.map((err) =>
                    toast(err.msg, {
                        position: "top-right",
                        autoClose: 6000,
                        hideProgressBar: true,
                    })
                );
                setIsLoading(false);
                break;
            case 401:
                toast(json.response);
                setIsLoading(false);
                break;
            case 201:
                storage.set("thread_token", json.token);
                setIsLoading(false);
                window.location.pathname = "/";
                break;
            case 501:
                toast(json.response);
                setIsLoading(false);
                break;

            default:
                break;
        }
        setIsLoading(false);
    };

    return (
        <Container>
            <ToastContainer
                position="top-center"
                autoClose={6000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                className="p-0 fs-6 fw-bold "
            />
            <Row>
                <Col
                    lg="5"
                    md="12"
                    sm="12"
                    className="m-auto my-4 shadow p-3 bg-white rounded-3 "
                >
                    <div className="mb-3">
                        <Logo />
                        <div className="py-2 fw-bold text-secondary">
                            create an account to continue
                        </div>
                    </div>
                    <Form>
                        <div>
                            <Row>
                                <Col lg="6" className="mb-3">
                                    <Input
                                        id="firstName"
                                        type="text"
                                        placeholder="First Name"
                                        text="First Name"
                                        name="firstName"
                                        onChange={handleChange}
                                        value={credentials.firstName}
                                    />
                                </Col>
                                <Col lg="6" className="mb-3">
                                    <Input
                                        id="lastName"
                                        type="text"
                                        placeholder="Last Name"
                                        text="Last Name"
                                        name="lastName"
                                        onChange={handleChange}
                                        value={credentials.lastName}
                                    />
                                </Col>
                            </Row>
                        </div>

                        <div className="mb-3">
                            <Input
                                id="email"
                                type="email"
                                placeholder="Email Address"
                                text="Email Address"
                                name="email"
                                onChange={handleChange}
                                value={credentials.email}
                            />
                        </div>

                        <div className="mb-3">
                            <Input
                                id="password"
                                type="password"
                                placeholder="Password"
                                text="Password"
                                name="password"
                                onChange={handleChange}
                                value={credentials.password}
                            />
                        </div>

                        <div className="mt-3">
                            <Btn
                                className={classes.button}
                                text="Register yourself"
                                size="lg"
                                type="submit"
                                onClick={handleSubmit}
                                isLoading={isLoading}
                                disabled={
                                    !credentials.firstName ||
                                    !credentials.lastName ||
                                    !credentials.email ||
                                    !credentials.password ||
                                    !lowerCheck ||
                                    !upperCheck ||
                                    !numberCheck ||
                                    !spacialCheck ||
                                    !lengthCheck
                                }
                            />
                        </div>

                        <div className="d-flex justify-content-between align-items-center mt-4 fw-bold ">
                            <Link className={classes.links} to="/login">Already have any account ? </Link>
                        </div>
                    </Form>
                </Col>
            </Row>

            <Row className="mb-5 mx-1">
                <Col lg="5" className="m-auto pt-3 shadow-sm rounded-2 bg-light">
                    <p>
                        {lowerCheck ? <FcCheckmark /> : <IoCloseSharp />}
                        <span className="mx-2">At least one lowercase character</span>
                    </p>
                    <p>
                        {upperCheck ? <FcCheckmark /> : <IoCloseSharp />}
                        <span className="mx-2">At least one uppercase character</span>
                    </p>
                    <p>
                        {numberCheck ? <FcCheckmark /> : <IoCloseSharp />}
                        <span className="mx-2">At least one number </span>
                    </p>
                    <p>
                        {spacialCheck ? <FcCheckmark /> : <IoCloseSharp />}
                        <span className="mx-2">At least one spacial character </span>
                    </p>
                    <p>
                        {lengthCheck ? <FcCheckmark /> : <IoCloseSharp />}
                        <span className="mx-2">At least 8 character </span>
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default Signup;