import React, { useState } from "react"
import { Link, navigate } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons"
import {
  faEnvelope,
  faLock,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "../../context/auth-context"
import * as styles from "./login.module.css"

const Login = () => {
  const { login, signInWithGoogle, signInWithFacebook } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      await login(email, password)
      navigate("/notes")
    } catch {
      setError("Failed to log in. Check your credentials and try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setError("")
    try {
      await signInWithGoogle()
      navigate("/notes")
    } catch {
      setError("Failed to log in with Google")
    }
  }

  const handleFacebookLogin = async () => {
    setError("")
    try {
      await signInWithFacebook()
      navigate("/notes")
    } catch {
      setError("Failed to log in with Facebook")
    }
  }

  return (
    <div className={`${styles.authCard} glass-card animate-scale-in`}>
      <div className={styles.authHeader}>
        <span className={styles.authIcon}>
          <FontAwesomeIcon icon={faRightToBracket} />
        </span>
        <h2>Welcome back</h2>
        <p>Sign in to access your notes from anywhere.</p>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className="field-label">
            Email
          </label>
          <div className={styles.inputWrap}>
            <FontAwesomeIcon icon={faEnvelope} className={styles.inputIcon} />
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="input-field"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className="field-label">
            Password
          </label>
          <div className={styles.inputWrap}>
            <FontAwesomeIcon icon={faLock} className={styles.inputIcon} />
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="input-field"
              placeholder="Enter your password"
            />
          </div>
        </div>
        <button
          type="submit"
          className={`btn btn-primary ${styles.submitButton}`}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <div className={styles.divider}>
        <span>or continue with</span>
      </div>

      <div className={styles.socialButtons}>
        <button
          type="button"
          className={`${styles.socialButton} ${styles.google}`}
          onClick={handleGoogleLogin}
        >
          <FontAwesomeIcon icon={faGoogle} /> Google
        </button>
        <button
          type="button"
          className={`${styles.socialButton} ${styles.facebook}`}
          onClick={handleFacebookLogin}
        >
          <FontAwesomeIcon icon={faFacebook} /> Facebook
        </button>
      </div>

      <p className={styles.footerLink}>
        Don&apos;t have an account? <Link to="/signup">Create one</Link>
      </p>
    </div>
  )
}

export default Login
