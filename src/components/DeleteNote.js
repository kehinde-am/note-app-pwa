import React from "react";
import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";

const DeleteNote = ({ noteId }) => {
  const deleteNote = async () => {
    try {
      await deleteDoc(doc(db, "notes", noteId));
      console.log("Note deleted successfully");
    } catch (error) {
      console.error("Error deleting note: ", error);
    }
  };

  return <button onClick={deleteNote}>Delete Note</button>;
};

export default DeleteNote;
