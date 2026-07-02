import * as React from "react"
import Layout from "../components/layout/Layout"
import Signup from "../components/auth/Signup"
import * as styles from "../components/auth/login.module.css"

export const Head = () => (
  <>
    <title>Sign Up | Note Taking PWA</title>
    <meta name="description" content="Sign up to start taking notes" />
  </>
)

const SignupPage = () => (
  <Layout>
    <div className={styles.authPage}>
      <aside className={`${styles.authAside} animate-fade-in-up`}>
        <h1>
          Your ideas deserve a{" "}
          <span style={{ color: "var(--color-primary-light)" }}>
            better home
          </span>
        </h1>
        <p>
          Create a free account and start organizing thoughts with a fast,
          modern note app that works offline.
        </p>
        <div className={styles.authGlow} aria-hidden="true" />
      </aside>
      <div className={styles.authMain}>
        <Signup />
      </div>
    </div>
  </Layout>
)

export default SignupPage
