import React from "react";
import { Router } from "@reach/router";
import { useParams } from "@reach/router";

const TestPage = () => {
  const { id } = useParams();
  return <div>Param ID: {id}</div>;
};

const App = () => (
  <Router>
    <TestPage path="/test/:id" />
  </Router>
);

export default App;
