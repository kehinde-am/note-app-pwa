import React, { useState, useEffect } from "react";
import { db } from "../firebase";

const EditNote = ({ noteId }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      const doc = await db.collection("notes").doc(noteId).get();
      if (doc.exists) {
        const note = doc.data();
        setTitle(note.title);
        setContent(note.content);
      }
    };
    fetchNote();
  }, [noteId]);

  const updateNote = () => {
    db.collection("notes").doc(noteId).update({
      title: title,
      content: content,
    });
  };

  return (
    <div>
      <h2>Edit Note</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <button onClick={updateNote}>Update Note</button>
    </div>
  );
};

export default EditNote;
