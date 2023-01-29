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
import classes from './Login.module.css';


const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
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
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
            }),
        });

        const json = await response.json();

        switch (json.status) {
            case 411:
                json.response.map((err) =>
                    toast(err.msg, {
                        position: "top-right",
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
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Row className="">
                <Col
                    lg="5"
                    md="12"
                    sm="12"
                    className="m-auto my-4 shadow p-3 bg-white rounded-3 "
                >
                    <div className="mb-3">
                        <Logo />
                        <div className="py-2 fw-bold text-secondary">Login to continue</div>
                    </div>
                    <Form>
                        <div className="mb-3">
                            <Input
                                id="email"
                                name="email"
                                type="text"
                                placeholder="email"
                                text="Email Address"
                                onChange={handleChange}
                                value={credentials.email}
                            />
                        </div>
                        <div className="mb-3">
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Security Key"
                                text="Password"
                                onChange={handleChange}
                                value={credentials.password}
                            />
                        </div>

                        <div className="mt-3">
                            <Btn
                                className={classes.button}
                                text="Login"
                                size="lg"
                                type="submit"
                                onClick={handleSubmit}
                                isLoading={isLoading}
                                disabled={
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
                            <Link className={classes.links} to="/forgot-password">Forgot Password ? </Link>
                            <Link className={classes.links} to="/signup">Don't have any account ? </Link>
                        </div>
                    </Form>
                </Col>
            </Row>

            <Row className="mb-5">
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

export default Login;