import React from "react";
import { Button, Spinner } from "react-bootstrap";

const Btn = ({
    variant,
    size,
    text,
    type,
    onClick,
    isLoading,
    className,
    disabled,
}) => {
    return (
        <Button
            variant={variant}
            size={size ? size : "md"}
            className={`w-100 rounded-1 border-0 bg-dark shadow-none fs-6`}
            type={type}
            onClick={onClick}
            style={{ background: "var(--theme)" }}
            disabled={disabled}
        >
            {isLoading ? <Spinner animation="border" size="sm" /> : text}
        </Button>
    );
};

export default Btn;