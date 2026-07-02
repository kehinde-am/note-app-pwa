import React, { useEffect, useState } from "react"
import { Link, navigate } from "gatsby"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowLeft,
  faFloppyDisk,
  faHeading,
  faAlignLeft,
} from "@fortawesome/free-solid-svg-icons"
import { db } from "../../lib/firebase"
import { useAuth } from "../../context/auth-context"
import * as styles from "./edit-note.module.css"

const EditNote = ({ noteId }) => {
  const { currentUser } = useAuth()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchNote = async () => {
      if (!noteId) return

      try {
        const noteDoc = await getDoc(doc(db, "notes", noteId))
        if (noteDoc.exists()) {
          const noteData = noteDoc.data()
          if (noteData.userId !== currentUser?.uid) {
            navigate("/notes")
            return
          }
          setTitle(noteData.title)
          setContent(noteData.content)
        }
      } catch (error) {
        console.error("Error fetching note:", error)
      } finally {
        setLoading(false)
      }
    }

    if (currentUser && noteId) {
      fetchNote()
    }
  }, [currentUser, noteId])

  const handleSubmit = async e => {
    e.preventDefault()
    if (!noteId) return

    setSaving(true)
    try {
      await updateDoc(doc(db, "notes", noteId), { title, content })
      navigate("/notes")
    } catch (error) {
      console.error("Error updating note:", error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className={`${styles.page} page-loading`}>
        <div className="loading-spinner" aria-label="Loading note" />
      </div>
    )
  }

  return (
    <div className={`${styles.page} animate-fade-in-up`}>
      <Link to="/notes" className={styles.backLink}>
        <FontAwesomeIcon icon={faArrowLeft} />
        Back to notes
      </Link>

      <div className={`${styles.card} glass-card`}>
        <header className={styles.header}>
          <h1>Edit note</h1>
          <p>Make changes and save when you&apos;re ready.</p>
        </header>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="title" className="field-label">
              <FontAwesomeIcon icon={faHeading} /> Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="content" className="field-label">
              <FontAwesomeIcon icon={faAlignLeft} /> Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={e => setContent(e.target.value)}
              required
              className={`input-field ${styles.textarea}`}
              rows={10}
            />
          </div>
          <div className={styles.actions}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={saving}
            >
              <FontAwesomeIcon icon={faFloppyDisk} />
              {saving ? "Saving..." : "Save changes"}
            </button>
            <Link to="/notes" className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditNote
