import React from "react";
import Login from "../components/Login";
import * as styles from "../components/login.module.css";

const LoginPage = () => {
  return (
    <div className={styles.loginContainer}>
      <Login />
    </div>
  );
};

export default LoginPage;
