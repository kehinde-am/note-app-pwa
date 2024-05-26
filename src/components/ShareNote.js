import React from "react";
import { useParams } from "@reach/router";

const ShareNote = () => {
  const { noteId } = useParams();
  console.log("Note ID in ShareNote:", noteId); // Log the noteId for debugging

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
    <div>
      <h2>Share Note</h2>
      <button onClick={handleCopyLink}>Copy Link</button>
    </div>
  );
};

export default ShareNote;
