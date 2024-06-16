import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../auth-context";
import { collection, query, where, orderBy, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import CreateNote from "../components/CreateNote";
import { Link, navigate } from "gatsby";
import * as styles from "../components/notes.module.css"; // Use named export
import debounce from "lodash.debounce";

const NotesPage = () => {
  const { currentUser, logout } = useAuth();
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!currentUser) return;

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

  const handleSearchChange = debounce((e) => {
    setSearchTerm(e.target.value);
  }, 300);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <div>
          <input
            type="text"
            placeholder="Search notes..."
            onChange={handleSearchChange}
            className={styles.searchBar}
          />
          {filteredNotes.length > 0 ? (
            <ul className={styles.notesList}>
              {filteredNotes.map((note) => (
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
          ) : (
            <p className={styles.notFoundMessage}>No notes found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
