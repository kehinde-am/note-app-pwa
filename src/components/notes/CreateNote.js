import React, { useState } from "react"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faHeading, faAlignLeft } from "@fortawesome/free-solid-svg-icons"
import { db } from "../../lib/firebase"
import { useAuth } from "../../context/auth-context"
import * as styles from "./notes.module.css"

const CreateNote = () => {
  const { currentUser } = useAuth()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    if (!currentUser) return

    setLoading(true)
    try {
      await addDoc(collection(db, "notes"), {
        title,
        content,
        userId: currentUser.uid,
        createdAt: serverTimestamp(),
      })
      setTitle("")
      setContent("")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.createForm}>
      <div className={styles.createHeader}>
        <span className={styles.createIcon}>
          <FontAwesomeIcon icon={faPlus} />
        </span>
        <div>
          <h2>New note</h2>
          <p>Capture something worth remembering.</p>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="note-title" className="field-label">
          <FontAwesomeIcon icon={faHeading} /> Title
        </label>
        <input
          id="note-title"
          type="text"
          placeholder="Meeting ideas, grocery list..."
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          className="input-field"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="note-content" className="field-label">
          <FontAwesomeIcon icon={faAlignLeft} /> Content
        </label>
        <textarea
          id="note-content"
          placeholder="Write your note here..."
          value={content}
          onChange={e => setContent(e.target.value)}
          required
          className={`input-field ${styles.textarea}`}
          rows={6}
        />
      </div>

      <button
        type="submit"
        className={`btn btn-primary ${styles.createButton}`}
        disabled={loading}
      >
        {loading ? "Saving..." : "Create note"}
      </button>
    </form>
  )
}

export default CreateNote
