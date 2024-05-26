import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../auth-context";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { navigate } from "gatsby";
import { useParams } from "@reach/router";

const EditNote = () => {
  const { noteId } = useParams(); // Use useParams to access the noteId
  const { currentUser } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const noteDoc = await getDoc(doc(db, "notes", noteId));
        if (noteDoc.exists()) {
          const noteData = noteDoc.data();
          setTitle(noteData.title);
          setContent(noteData.content);
          setLoading(false);
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    if (currentUser && noteId) {
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

  if (loading) {
    return <div>Loading...</div>;
  }

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
