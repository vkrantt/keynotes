import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const Input = ({
    id,
    type,
    placeholder,
    text,
    name,
    onChange,
    value,
    isError,
}) => {
    const [isShow, setIsShow] = useState(false);

    return (
        <div
            className={`w-100 d-flex justify-content-between rounded-1 overflow-hidden  ${isError ? "border-danger border-2" : ""
                }  ${type === "password" ? "border" : "border-0"}`}
        >
            <Form.Floating className="w-100 rounded-1">
                <Form.Control
                    id={id}
                    type={type === "password" ? (isShow ? "text" : "password") : type}
                    placeholder={placeholder}
                    className={`rounded-1 shadow-none bg-light  ${isError ? "border-danger border-2" : ""
                        } ${type === "password" ? "border-0" : "border"}`}
                    name={name}
                    onChange={onChange}
                    value={value}
                />
                <label htmlFor={id}>{text}</label>
            </Form.Floating>
            {type === "password" && (
                <Button
                    className="shadow-none border-0 rounded-0 bg-light"
                    variant="white"
                    onClick={() => setIsShow(!isShow)}
                >
                    {isShow ? "Hide" : "Show"}
                </Button>
            )}
        </div>
    );
};

export default Input;