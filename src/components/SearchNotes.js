import React, { useState } from "react";
import { db } from "../firebase";

const SearchNotes = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchNotes = async () => {
    const snapshot = await db.collection("notes").where("title", "==", query).get();
    const notes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setResults(notes);
  };

  return (
    <div>
      <h2>Search Notes</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by title"
      />
      <button onClick={searchNotes}>Search</button>
      <ul>
        {results.map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchNotes;
