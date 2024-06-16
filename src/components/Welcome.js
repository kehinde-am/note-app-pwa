import React from "react";
import { Link } from "gatsby";
import * as styles from "./welcome.module.css";

const Welcome = ({ user }) => {
  return (
    <div className={styles.welcomeContainer}>
      <h1 className={styles.heading}>Welcome to the Note Progressive Web App 😎🤩 </h1>
      <p className={styles.subheading}>Hello, {user.email}</p>
      <Link to="/notes" className={styles.notesLink}>Go to Notes</Link>
    </div>
  );
};

export default Welcome;
