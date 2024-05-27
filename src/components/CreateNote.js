// src/components/CreateNote.js
import React, { useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../auth-context";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import* as styles from "./notes.module.css";

const CreateNote = () => {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentUser) {
      await addDoc(collection(db, "notes"), {
        title,
        content,
        userId: currentUser.uid,
        createdAt: serverTimestamp(),
      });
      setTitle("");
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.createNoteForm}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateNote;
