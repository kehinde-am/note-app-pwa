import React, { useState } from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowLeft,
  faCheck,
  faCopy,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons"
import * as styles from "./share-note.module.css"

const ShareNote = ({ noteId }) => {
  const [copied, setCopied] = useState(false)

  const shareableLink =
    typeof window !== "undefined" && noteId
      ? `${window.location.origin}/share-note/${noteId}`
      : ""

  const handleCopyLink = () => {
    if (!noteId) return

    navigator.clipboard
      .writeText(shareableLink)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      })
      .catch(error => {
        console.error("Failed to copy link:", error)
      })
  }

  return (
    <div className={`${styles.page} animate-fade-in-up`}>
      <Link to="/notes" className={styles.backLink}>
        <FontAwesomeIcon icon={faArrowLeft} />
        Back to notes
      </Link>

      <div className={`${styles.card} glass-card`}>
        <span className={styles.iconWrap}>
          <FontAwesomeIcon icon={faShareNodes} />
        </span>
        <h1>Share this note</h1>
        <p>Copy the link below and send it to anyone you want to share with.</p>

        <div className={styles.linkBox}>
          <code>{shareableLink || "Generating link..."}</code>
        </div>

        <button
          type="button"
          onClick={handleCopyLink}
          className={`btn btn-primary ${styles.copyButton}`}
        >
          <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
          {copied ? "Copied!" : "Copy link"}
        </button>

        {copied && (
          <p className={styles.successMessage} role="status">
            Link copied to clipboard
          </p>
        )}
      </div>
    </div>
  )
}

export default ShareNote
