import React from "react";

const Avatar = ({ src, firstName, lastName }) => {
    const styles = {
        width: "35px",
        height: "35px",
        overflow: "hidden",
        border: "2px solid var(--theme)",
    };
    return (
        <div className="rounded-pill " style={styles}>
            <img
                src={src}
                alt=""
                srcSet=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
        </div>
    );
};

export default Avatar;