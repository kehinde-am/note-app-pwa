import React, { useState } from "react";
import { useAuth } from "../auth-context";
import { navigate } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import * as styles from "./login.module.css";

const Login = () => {
  const { login, signInWithGoogle, signInWithFacebook } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/notes");
    } catch (err) {
      setError("Failed to log in");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate("/app/notes");
    } catch (err) {
      setError("Failed to log in with Google");
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await signInWithFacebook();
      navigate("/notes");
    } catch (err) {
      setError("Failed to log in with Facebook");
    }
  };

  return (
    <div className={styles.loginForm}>
      <h2 className={styles.heading}>Login</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.loginButton}>Log In</button>
      </form>
      <div className={styles.socialLoginContainer}>
        <button className={styles.socialButton} onClick={handleGoogleLogin}>
          <FontAwesomeIcon icon={faGoogle} className={styles.icon} /> Log In with Google
        </button>
        <button className={styles.socialButton} onClick={handleFacebookLogin}>
          <FontAwesomeIcon icon={faFacebook} className={styles.icon} /> Log In with Facebook
        </button>
      </div>
      <div className={styles.signUpLink}>
        Don't have an account? <a href="/signup">Sign Up</a>
      </div>
    </div>
  );
};

export default Login;
