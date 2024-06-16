import React from "react";
import Signup from "../components/Signup";
import * as styles from "../components/signup.module.css";

const SignupPage = () => {
  return (
    <div className={styles.signupContainer}>
      <Signup />
    </div>
  );
};

export default SignupPage;
