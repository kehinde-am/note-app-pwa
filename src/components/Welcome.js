import * as React from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowRight,
  faNoteSticky,
  faPlus,
} from "@fortawesome/free-solid-svg-icons"
import * as styles from "./welcome.module.css"

const Welcome = ({ user }) => {
  const firstName = user.email?.split("@")[0] || "there"

  return (
    <section className={styles.dashboard}>
      <div className={`${styles.heroCard} glass-card animate-fade-in-up`}>
        <div className={styles.heroContent}>
          <span className={styles.greeting}>Welcome back</span>
          <h1>
            Hey <span className={styles.highlight}>{firstName}</span>, ready to
            write?
          </h1>
          <p>
            Your notes are synced and waiting. Jump back in or start something
            new.
          </p>
          <div className={styles.heroActions}>
            <Link to="/notes" className="btn btn-primary">
              <FontAwesomeIcon icon={faNoteSticky} />
              Open my notes
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
            <Link to="/notes" className="btn btn-secondary">
              <FontAwesomeIcon icon={faPlus} />
              Create a note
            </Link>
          </div>
        </div>
        <div className={styles.heroOrb} aria-hidden="true" />
      </div>

      <div className={styles.quickGrid}>
        <article
          className={`${styles.quickCard} glass-card animate-fade-in-up animate-delay-1`}
        >
          <span className={styles.quickIcon}>✦</span>
          <h3>Stay focused</h3>
          <p>Capture ideas quickly without clutter or distractions.</p>
        </article>
        <article
          className={`${styles.quickCard} glass-card animate-fade-in-up animate-delay-2`}
        >
          <span className={styles.quickIcon}>☁</span>
          <h3>Always available</h3>
          <p>Access your notes online or offline from any device.</p>
        </article>
        <article
          className={`${styles.quickCard} glass-card animate-fade-in-up animate-delay-3`}
        >
          <span className={styles.quickIcon}>🔗</span>
          <h3>Share easily</h3>
          <p>Send a link when you want someone else to read a note.</p>
        </article>
      </div>
    </section>
  )
}

export default Welcome
