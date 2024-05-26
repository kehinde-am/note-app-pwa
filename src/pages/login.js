import React from "react";
import Login from "../components/Login";
import { Link } from "gatsby";

const LoginPage = () => {
  return (
    <div>
      <h2>Login</h2>
      <Login />
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default LoginPage;
