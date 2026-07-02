import * as React from "react"
import Layout from "../components/layout/Layout"
import Login from "../components/auth/Login"
import * as styles from "../components/auth/login.module.css"

export const Head = () => (
  <>
    <title>Login | Note Taking PWA</title>
    <meta name="description" content="Login to access your notes" />
  </>
)

const LoginPage = () => (
  <Layout>
    <div className={styles.authPage}>
      <aside className={`${styles.authAside} animate-fade-in-up`}>
        <h1>
          Pick up right where you{" "}
          <span style={{ color: "var(--color-accent)" }}>left off</span>
        </h1>
        <p>
          Your notes sync across devices so you can capture, edit, and share
          without missing a beat.
        </p>
        <div className={styles.authGlow} aria-hidden="true" />
      </aside>
      <div className={styles.authMain}>
        <Login />
      </div>
    </div>
  </Layout>
)

export default LoginPage
