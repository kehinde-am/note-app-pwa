import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../auth-context";
import CreateNote from "../components/CreateNote";
import DeleteNote from "../components/DeleteNote";
import { Link } from "gatsby";

const NotesPage = () => {
  const { currentUser } = useAuth();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = db
        .collection("notes")
        .where("userId", "==", currentUser.uid)
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {
          const notesData = [];
          snapshot.forEach((doc) =>
            notesData.push({ id: doc.id, ...doc.data() })
          );
          setNotes(notesData);
        });
      return unsubscribe;
    }
  }, [currentUser]);

  return (
    <div>
      <h2>Your Notes</h2>
      <CreateNote />
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <Link to={`/edit-note/${note.id}`}>Edit</Link>
            <DeleteNote noteId={note.id} />
            <Link to={`/share-note/${note.id}`}>Share</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesPage;
