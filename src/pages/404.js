import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout/Layout"
import * as styles from "../components/not-found.module.css"

export const Head = () => (
  <>
    <title>404: Not Found | Note Taking PWA</title>
    <meta name="description" content="Page not found" />
  </>
)

const NotFoundPage = () => (
  <Layout>
    <section className={`${styles.page} animate-fade-in-up`}>
      <div className={`${styles.card} glass-card`}>
        <span className={styles.code}>404</span>
        <h1>Page not found</h1>
        <p>
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved.
        </p>
        <Link to="/" className="btn btn-primary">
          Back to home
        </Link>
      </div>
    </section>
  </Layout>
)

export default NotFoundPage
