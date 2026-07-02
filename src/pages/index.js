import * as React from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBolt,
  faCloudArrowDown,
  faMobileScreen,
  faPenToSquare,
  faShareNodes,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons"
import Layout from "../components/layout/Layout"
import Welcome from "../components/Welcome"
import { useAuth } from "../context/auth-context"
import * as styles from "../components/home.module.css"

const features = [
  {
    icon: faPenToSquare,
    title: "Capture instantly",
    description: "Write ideas the moment they strike with a fast, focused editor.",
  },
  {
    icon: faCloudArrowDown,
    title: "Works offline",
    description: "Keep creating without a connection. Sync when you're back online.",
  },
  {
    icon: faShareNodes,
    title: "Share with a link",
    description: "Send notes to teammates or friends in one click.",
  },
  {
    icon: faShieldHalved,
    title: "Secure by default",
    description: "Your notes stay tied to your account with Firebase authentication.",
  },
  {
    icon: faMobileScreen,
    title: "Install anywhere",
    description: "Add to your home screen and use it like a native app.",
  },
  {
    icon: faBolt,
    title: "Lightning search",
    description: "Find any note instantly with live filtering across titles and content.",
  },
]

export const Head = () => (
  <>
    <title>Home | Note Taking PWA</title>
    <meta
      name="description"
      content="A beautiful progressive web app for taking notes with offline access."
    />
  </>
)

const IndexPage = () => {
  const { currentUser } = useAuth()

  return (
    <Layout>
      {currentUser ? (
        <Welcome user={currentUser} />
      ) : (
        <div className={styles.page}>
          <section className={`${styles.hero} animate-fade-in-up`}>
            <span className={styles.badge}>Progressive Web App</span>
            <h1 className={styles.heroTitle}>
              Notes that move as fast as{" "}
              <span className={styles.gradientText}>your ideas</span>
            </h1>
            <p className={styles.heroSubtitle}>
              A modern note-taking experience with offline support, cloud sync,
              and a polished interface built for everyday productivity.
            </p>
            <div className={`${styles.actions} animate-fade-in-up animate-delay-2`}>
              <Link to="/signup" className="btn btn-primary">
                Get started free
              </Link>
              <Link to="/login" className="btn btn-secondary">
                Sign in
              </Link>
            </div>
            <div className={`${styles.heroVisual} animate-fade-in-up animate-delay-3`}>
              <div className={styles.previewCard}>
                <div className={styles.previewHeader}>
                  <span />
                  <span />
                  <span />
                </div>
                <div className={styles.previewBody}>
                  <div className={styles.previewLineWide} />
                  <div className={styles.previewLine} />
                  <div className={styles.previewLine} />
                  <div className={styles.previewLineShort} />
                </div>
              </div>
              <div className={`${styles.floatingCard} ${styles.floatingCardOne}`}>
                <FontAwesomeIcon icon={faBolt} />
                Instant sync
              </div>
              <div className={`${styles.floatingCard} ${styles.floatingCardTwo}`}>
                <FontAwesomeIcon icon={faCloudArrowDown} />
                Offline ready
              </div>
            </div>
          </section>

          <section className={styles.features}>
            <div className={`${styles.sectionHeader} animate-fade-in-up animate-delay-2`}>
              <h2>Everything you need to stay organized</h2>
              <p>
                Simple tools, thoughtful design, and reliable performance across
                every device.
              </p>
            </div>
            <div className={styles.featureGrid}>
              {features.map((feature, index) => (
                <article
                  key={feature.title}
                  className={`${styles.featureCard} glass-card animate-fade-in-up`}
                  style={{ animationDelay: `${0.15 + index * 0.08}s` }}
                >
                  <span className={styles.featureIcon}>
                    <FontAwesomeIcon icon={feature.icon} />
                  </span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={`${styles.cta} glass-card animate-fade-in-up animate-delay-3`}>
            <h2>Ready to write smarter?</h2>
            <p>Join Note Taking PWA and keep your thoughts organized everywhere.</p>
            <Link to="/signup" className="btn btn-primary">
              Create your account
            </Link>
          </section>
        </div>
      )}
    </Layout>
  )
}

export default IndexPage
