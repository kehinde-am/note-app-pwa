import React from "react";
import { useAuth } from "../auth-context";
import Welcome from "../components/Welcome";

const IndexPage = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      {currentUser ? (
        <Welcome user={currentUser} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default IndexPage;
