import React, { useState } from "react";
import { useAuth } from "../auth-context";
import { navigate } from "gatsby";
import * as styles from "./signup.module.css";

const SignUp = () => {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
      navigate("/notes");
    } catch (err) {
      setError("Failed to sign up");
    }
  };

  return (
    <div className={styles.signupContainer}>
      <h2 className={styles.heading}>Sign Up</h2>
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
        <button type="submit" className={styles.signupButton}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
