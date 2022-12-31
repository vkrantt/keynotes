import React from "react";
import { RiCopyrightFill } from "react-icons/ri";

const Footer = () => {
    return (
        <div className="bg-white  w-100  shadow">
            <div className="text-center py-2">
                <h6 className="d-flex align-items-center justify-content-center">
                    <span className="mb-1">
                        <RiCopyrightFill />
                    </span>
                    <span className="mx-1">
                        keynotes || All rights reserved 2022 -
                        <span className="px-1">
                            {new Date().toLocaleDateString("en-GB", {
                                year: "numeric",
                            })}
                        </span>
                    </span>
                </h6>
                <div className="text-secondary">version 0.0.1</div>
            </div>
        </div>
    );
};

export default Footer;