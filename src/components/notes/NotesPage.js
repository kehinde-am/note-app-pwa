import React, { useEffect, useState, useMemo } from "react"
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faMagnifyingGlass,
  faPen,
  faShareNodes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons"
import debounce from "lodash.debounce"
import { db } from "../../lib/firebase"
import { useAuth } from "../../context/auth-context"
import CreateNote from "./CreateNote"
import * as styles from "./notes.module.css"

const NotesPage = () => {
  const { currentUser } = useAuth()
  const [notes, setNotes] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (!currentUser) return

    const notesRef = collection(db, "notes")
    const q = query(
      notesRef,
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    )

    const unsubscribe = onSnapshot(q, snapshot => {
      const notesData = snapshot.docs.map(noteDoc => ({
        ...noteDoc.data(),
        id: noteDoc.id,
      }))
      setNotes(notesData)
    })

    return unsubscribe
  }, [currentUser])

  const handleSearchChange = useMemo(
    () =>
      debounce(e => {
        setSearchTerm(e.target.value)
      }, 300),
    []
  )

  const handleDelete = async noteId => {
    if (!window.confirm("Delete this note permanently?")) return

    try {
      await deleteDoc(doc(db, "notes", noteId))
    } catch (error) {
      console.error("Error deleting note:", error)
    }
  }

  const filteredNotes = notes.filter(
    note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className={styles.page}>
      <header className={`${styles.pageHeader} animate-fade-in-up`}>
        <div>
          <span className={styles.eyebrow}>Your workspace</span>
          <h1>Notes</h1>
          <p>
            {notes.length} {notes.length === 1 ? "note" : "notes"} saved ·{" "}
            {filteredNotes.length} shown
          </p>
        </div>
        <div className={styles.searchWrap}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search notes..."
            onChange={handleSearchChange}
            className={`input-field ${styles.searchBar}`}
          />
        </div>
      </header>

      <div className={styles.layout}>
        <aside
          className={`${styles.sidebar} glass-card animate-fade-in-up animate-delay-1`}
        >
          <CreateNote />
        </aside>

        <section className={styles.notesSection}>
          {filteredNotes.length > 0 ? (
            <ul className={styles.notesList}>
              {filteredNotes.map((note, index) => (
                <li
                  key={note.id}
                  className={`${styles.noteCard} glass-card animate-fade-in-up`}
                  style={{ animationDelay: `${0.08 + index * 0.05}s` }}
                >
                  <div className={styles.noteContent}>
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                  </div>
                  <div className={styles.noteActions}>
                    <Link
                      to={`/edit-note/${note.id}`}
                      className={`btn btn-secondary btn-sm ${styles.actionBtn}`}
                    >
                      <FontAwesomeIcon icon={faPen} />
                      Edit
                    </Link>
                    <Link
                      to={`/share-note/${note.id}`}
                      className={`btn btn-secondary btn-sm ${styles.actionBtn}`}
                    >
                      <FontAwesomeIcon icon={faShareNodes} />
                      Share
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(note.id)}
                      className={`btn btn-danger btn-sm ${styles.actionBtn}`}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className={`${styles.emptyState} glass-card animate-fade-in-up`}>
              <span className={styles.emptyIcon}>📝</span>
              <h3>No notes found</h3>
              <p>
                {searchTerm
                  ? "Try a different search term or create a new note."
                  : "Create your first note using the panel on the left."}
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default NotesPage
