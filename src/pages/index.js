import React from "react";
import { Link } from "gatsby";
import { useAuth } from "../auth-context";
import Welcome from "../components/Welcome";
import * as styles from "../components/index.module.css";

const IndexPage = () => {
  const { currentUser } = useAuth();

  return (
    <div className={styles.container}>
      {currentUser ? (
        <Welcome user={currentUser} />
      ) : (
        <div className={styles.introContainer}>
          <h1 className={styles.heading}>Welcome to the Note Progressive Web App</h1>
          <p className={styles.subheading}>
            This is a progressive web app for taking notes efficiently and securely.
          </p>
          <div className={styles.linkContainer}>
            <Link to="/login" className={styles.link}>Login</Link>
            <Link to="/signup" className={styles.link}>Sign Up</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndexPage;
