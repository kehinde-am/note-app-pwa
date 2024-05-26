import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { useAuth } from '../auth-context';
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";

const Notes = () => {
  const { currentUser } = useAuth();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const q = query(
        collection(db, "notes"),
        where("userId", "==", currentUser.uid),
        orderBy("createdAt", "desc")
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const notesData = [];
        snapshot.forEach((doc) => notesData.push({ ...doc.data(), id: doc.id }));
        setNotes(notesData);
      });

      return unsubscribe;
    }
  }, [currentUser]);

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
