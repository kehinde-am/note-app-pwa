import React, { useState } from "react"
import { Link, navigate } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faEnvelope,
  faLock,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "../../context/auth-context"
import * as styles from "./login.module.css"

const Signup = () => {
  const { signup } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      await signup(email, password)
      navigate("/notes")
    } catch {
      setError("Failed to sign up. Please try a different email or password.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`${styles.authCard} glass-card animate-scale-in`}>
      <div className={styles.authHeader}>
        <span className={styles.authIcon}>
          <FontAwesomeIcon icon={faUserPlus} />
        </span>
        <h2>Create your account</h2>
        <p>Start capturing ideas in a beautiful, synced workspace.</p>
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
              minLength={6}
              className="input-field"
              placeholder="At least 6 characters"
            />
          </div>
        </div>
        <button
          type="submit"
          className={`btn btn-primary ${styles.submitButton}`}
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className={styles.footerLink}>
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  )
}

export default Signup
