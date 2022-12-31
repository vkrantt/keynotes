import React from "react";
import { Redirect, Route } from "react-router-dom";
import storage from "../utils/storage";

const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
    const isAuthenticated = storage.get("thread_token");

    return (
        <Route
            {...restOfProps}
            render={(props) =>
                isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
};

export default ProtectedRoute;