import React from "react";
import Signup from "../components/Signup";
import { Link } from "gatsby";

const SignupPage = () => {
  return (
    <div>
      <h2>Sign Up</h2>
      <Signup />
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default SignupPage;
