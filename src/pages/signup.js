// src/pages/signup.js
import * as React from "react";
import Signup from "../components/Signup";
import * as styles from "../components/signup.module.css";

export const Head = () => (
  <>
    <title>Sign Up | Note Taking PWA</title>
    <meta name="description" content="Sign up to start taking notes" />
  </>
);

const SignupPage = () => {
  return (
    <div className={styles.signupContainer}>
      <Signup />
    </div>
  );
};

export default SignupPage;
