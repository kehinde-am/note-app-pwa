import React from "react";
import { Router } from "@reach/router";
import ShareNote from "../components/ShareNote";

const ShareNotePage = () => (
  <Router basepath="/share-note">
    <ShareNote path="/:noteId" />
  </Router>
);

export default ShareNotePage;
