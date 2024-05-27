// src/components/ShareNote.js
import React from "react";
import { useParams } from "@reach/router";
import * as styles from "./share-note.module.css";

const ShareNote = () => {
  const { noteId } = useParams();

  const handleCopyLink = () => {
    if (noteId) {
      const shareableLink = `${window.location.origin}/share-note/${noteId}`;
      navigator.clipboard.writeText(shareableLink)
        .then(() => {
          console.log("Link copied to clipboard");
          alert("Link copied to clipboard");
        })
        .catch((error) => {
          console.error("Failed to copy link: ", error);
        });
    } else {
      console.error("noteId is undefined");
    }
  };

  return (
    <div className={styles.shareNotePage}>
      <h2>Share Note</h2>
      <button onClick={handleCopyLink}>Copy Link</button>
      <p>Note ID: {noteId}</p>
    </div>
  );
};

export default ShareNote;
