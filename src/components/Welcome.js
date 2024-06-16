import * as React from "react"
import { Link } from "gatsby"
import * as styles from "./welcome.module.css"

export const Head = () => (
  <>
    <title>Welcome | Note Taking PWA</title>
    <meta name="description" content="Welcome to your personalized dashboard" />
  </>
)

const Welcome = ({ user }) => (
  <div className={styles.welcomeContainer}>
    <h1 className={styles.heading}>Welcome to the Note Progressive Web App 😎🤩</h1>
    <p className={styles.subheading}>Hello, {user.email}</p>
    <Link to="/notes" className={styles.notesLink}>Go to Notes</Link>
  </div>
)

export default Welcome
