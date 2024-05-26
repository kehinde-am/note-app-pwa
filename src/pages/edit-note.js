import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../auth-context";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { navigate } from "gatsby";

const EditNote = ({ params }) => {
  const { noteId } = params;
  const { currentUser } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchNote = async () => {
      const noteDoc = await getDoc(doc(db, "notes", noteId));
      if (noteDoc.exists) {
        const noteData = noteDoc.data();
        setTitle(noteData.title);
        setContent(noteData.content);
      }
    };

    if (currentUser) {
      fetchNote();
    }
  }, [currentUser, noteId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "notes", noteId), {
        title,
        content,
      });
      navigate("/app/notes");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div>
      <h2>Edit Note</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditNote;
