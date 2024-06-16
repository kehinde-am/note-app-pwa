import React from "react";
import NotesPage from "../components/NotesPage";

export const Head = () => (
  <>
    <title>My Notes | Note Taking PWA</title>
    <meta name="description" content="View and manage your notes" />
  </>
);

const Notes = () => <NotesPage />;

export default Notes;
