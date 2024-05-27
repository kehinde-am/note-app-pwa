// src/pages/notes.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../auth-context";
import CreateNote from "../components/CreateNote";
import DeleteNote from "../components/DeleteNote";
import { Link } from "gatsby";
import * as styles from "../components/notes.module.css"; // Use * as styles
import { collection, query, where, orderBy, onSnapshot, limit } from "firebase/firestore"; 

const NotesPage = () => {
  const { currentUser } = useAuth();
  const [notes, setNotes] = useState([]);
  console.log('Render NotesPage');

  useEffect(() => {
    console.log('useEffect triggered');
    if (currentUser) {
      console.log('Fetching notes for user:', currentUser.uid);
      const q = query(
        collection(db, "notes"),
        where("userId", "==", currentUser.uid),
        orderBy("createdAt", "desc"),
        limit(10)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        console.log('Firestore snapshot received');
        const notesData = [];
        snapshot.forEach((doc) =>
          notesData.push({ id: doc.id, ...doc.data() })
        );
        setNotes(notesData);
        console.log('Notes set:', notesData);
      });
      return () => {
        console.log('Unsubscribing from Firestore');
        unsubscribe();
      };
    }
  }, [currentUser]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.notesPage}>
      <h2>Your Notes</h2>
      <div className={styles.createNoteForm}>
        <CreateNote />
      </div>
      <ul className={styles.notesList}>
        {notes.map((note) => (
          <li key={note.id} className={styles.noteItem}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <div className={styles.noteActions}>
              <Link to={`/edit-note/${note.id}`}>Edit</Link>
              <DeleteNote noteId={note.id} />
              <Link to={`/share-note/${note.id}`}>Share</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesPage;
