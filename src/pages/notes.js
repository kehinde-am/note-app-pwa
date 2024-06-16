import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../auth-context";
import { collection, query, where, orderBy, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import CreateNote from "../components/CreateNote";
import { Link, navigate } from "gatsby";
import * as styles from "../components/notes.module.css";

const NotesPage = () => {
  const { currentUser, logout } = useAuth();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    console.log('Fetching notes for user:', currentUser.uid);
    const notesRef = collection(db, "notes");
    const q = query(notesRef, where("userId", "==", currentUser.uid), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notesData = [];
      snapshot.forEach((doc) => {
        notesData.push({ ...doc.data(), id: doc.id });
      });
      setNotes(notesData);
    });

    return unsubscribe;
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleDelete = async (noteId) => {
    try {
      await deleteDoc(doc(db, "notes", noteId));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className={styles.notesPage}>
      <div className={styles.header}>
        <h2>Your Notes</h2>
        <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.createNoteForm}>
          <CreateNote />
        </div>
        <ul className={styles.notesList}>
          {notes.map((note) => (
            <li key={note.id} className={styles.noteItem}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <div className={styles.noteActions}>
                <Link to={`/edit-note/${note.id}`}>
                  <button className={styles.editButton}>Edit</button>
                </Link>
                <button onClick={() => handleDelete(note.id)} className={styles.deleteButton}>Delete Note</button>
                <Link to={`/share-note/${note.id}`}>
                  <button className={styles.shareButton}>Share</button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotesPage;
