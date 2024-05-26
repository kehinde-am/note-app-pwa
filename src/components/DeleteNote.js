import React from "react";
import { db } from "../firebase";

const DeleteNote = ({ noteId }) => {
  const deleteNote = () => {
    db.collection("notes").doc(noteId).delete();
  };

  return <button onClick={deleteNote}>Delete Note</button>;
};

export default DeleteNote;
