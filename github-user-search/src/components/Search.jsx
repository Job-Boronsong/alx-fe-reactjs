import React, { useState } from "react";
import { fetchUserData } from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState(""); // For input value
  const [user, setUser] = useState(null); // Store fetched user data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return; // Avoid empty input

    setLoading(true);
    setError("");
    setUser(null);

    try {
      const data = await fetchUserData(username);
      setUser(data);
    } catch (err) {
      setError("Looks like we can't find the user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>
          Search
        </button>
      </form>

      {/* Conditional Rendering */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {user && (
        <div style={{ marginTop: "20px" }}>
          <img
            src={user.avatar_url}
            alt={user.login}
            style={{ width: "100px", borderRadius: "50%" }}
          />
          <h2>{user.name || user.login}</h2>
          <a href={user.html_url} target="_blank" rel="noreferrer">
            Visit GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default Search;
