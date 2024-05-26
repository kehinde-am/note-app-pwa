import React from 'react';

const ShareNote = ({ params }) => {
  const { noteId } = params;

  const handleShare = () => {
    const url = `${window.location.origin}/note/${noteId}`;
    navigator.clipboard.writeText(url);
    alert('Note link copied to clipboard');
  };

  return (
    <div>
      <h2>Share Note</h2>
      <button onClick={handleShare}>Copy Link</button>
    </div>
  );
};

export default ShareNote;
