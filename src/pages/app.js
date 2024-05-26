import React from "react";
import { Router } from "@reach/router";
import { AuthProvider } from "../auth-context";
import PrivateRoute from "../components/PrivateRoute";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Notes from "../components/Notes";
import CreateNote from "../components/CreateNote";
import EditNote from "../components/EditNote";
import SearchNotes from "../components/SearchNotes";
import ShareNote from "../components/ShareNote";
import Notifications from "../components/Notifications";

const App = () => (
  <AuthProvider>
    <Notifications />
    <Router>
      <PrivateRoute path="/notes" component={Notes} />
      <PrivateRoute path="/create-note" component={CreateNote} />
      <PrivateRoute path="/edit-note/:noteId" component={EditNote} />
      <PrivateRoute path="/search-notes" component={SearchNotes} />
      <PrivateRoute path="/share-note/:noteId" component={ShareNote} /> {/* Correct path */}
      <Login path="/login" />
      <Signup path="/signup" />
    </Router>
  </AuthProvider>
);

export default App;
