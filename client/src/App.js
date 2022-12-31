import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./security/Login";
import Signup from "./security/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <div style={{ minHeight: "calc(100vh - 72px)" }}>
        <Header />
        <ProtectedRoute exact path="/" component={Home} />
        {/* <ProtectedRoute exact path="/profile" component={Profile} /> */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/forgot-password" component={ForgotPassword} />
      </div>
      <Footer />
    </BrowserRouter>
  )
};

export default App;
