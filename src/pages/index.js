// src/pages/index.js
import * as React from "react"
import { Link } from "gatsby"
import * as styles from "../components/index.module.css"
import { useAuth } from "../auth-context"
import Welcome from "../components/Welcome"

export const Head = () => (
  <>
    <title>Home | Note Taking PWA</title>
    <meta name="description" content="Welcome to the Note Taking PWA" />
  </>
)

const IndexPage = () => {
  const { currentUser } = useAuth()

  return (
    <div className={styles.container}>
      {currentUser ? (
        <Welcome user={currentUser} />
      ) : (
        <div>
          <h1>Welcome to Note Taking PWA</h1>
          <p>A Progressive Web App for taking notes</p>
          <Link to="/login">Login</Link> | <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </div>
  )
}

export default IndexPage
