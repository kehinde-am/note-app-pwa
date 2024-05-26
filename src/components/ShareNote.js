import React from "react";

const ShareNote = ({ note }) => {
  const shareNote = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: note.title,
          text: note.content,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing note:", error);
      }
    } else {
      alert("Sharing not supported in this browser.");
    }
  };

  return <button onClick={shareNote}>Share Note</button>;
};

export default ShareNote;
