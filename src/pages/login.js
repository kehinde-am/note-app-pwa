import * as React from "react";
import Login from "../components/Login";
import * as styles from "../components/login.module.css";

export const Head = () => (
  <>
    <title>Login | Note Taking PWA</title>
    <meta name="description" content="Login to access your notes" />
  </>
);

const LoginPage = () => {
  return (
    <div className={styles.loginContainer}>
      <Login />
    </div>
  );
};

export default LoginPage;
