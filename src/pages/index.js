import React from "react";
import { Link } from "gatsby";
import { useAuth } from "../auth-context";

const IndexPage = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <h1>Welcome to the Note Taking PWA</h1>
      {currentUser ? (
        <div>
          <p>Hello, {currentUser.email}</p>
          <Link to="/notes">Go to Notes</Link>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </div>
  );
};

export default IndexPage;
