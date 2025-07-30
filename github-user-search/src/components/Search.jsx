import React, { useState } from "react";
import { fetchAdvancedUsers, fetchUserDetails } from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1); // For pagination

  const handleSubmit = async (e, newPage = 1) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (newPage === 1) setResults([]); // Clear old results on new search

    try {
      const data = await fetchAdvancedUsers({
        username,
        location,
        minRepos,
        page: newPage,
      });

      if (!data.items || data.items.length === 0) {
        setError("Looks like we cant find the user");
      } else {
        // Fetch additional details (location, repos)
        const enrichedResults = await Promise.all(
          data.items.map(async (user) => {
            const details = await fetchUserDetails(user.login);
            return {
              ...user,
              location: details.location || "Unknown",
              public_repos: details.public_repos,
            };
          })
        );

        setResults((prev) => (newPage === 1 ? enrichedResults : [...prev, ...enrichedResults]));
        setPage(newPage);
      }
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-12 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        GitHub User Search
      </h1>

      {/* Search Form */}
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row gap-4 justify-center items-center"
      >
        <input
          type="text"
          placeholder="GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded px-4 py-2 w-full md:w-1/4 focus:ring focus:ring-blue-300"
        />
        <input
          type="text"
          placeholder="Location (e.g., Ghana)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border rounded px-4 py-2 w-full md:w-1/4 focus:ring focus:ring-blue-300"
        />
        <input
          type="number"
          placeholder="Minimum Repositories"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="border rounded px-4 py-2 w-full md:w-1/4 focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {/* Loading & Error */}
      {loading && <p className="text-center mt-6 text-gray-600">Loading...</p>}
      {error && <p className="text-center mt-6 text-red-500">{error}</p>}

      {/* Results Grid */}
      <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {results.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-xl transition"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-20 h-20 rounded-full mb-4"
            />
            <h2 className="font-bold text-lg">{user.login}</h2>
            <p className="text-sm text-gray-500">
              Location: {user.location}
            </p>
            <p className="text-sm text-gray-500">
              Public Repos: {user.public_repos}
            </p>
            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 mt-2 hover:underline"
            >
              View Profile
            </a>
          </div>
        ))}
      </div>

      {/* Load More Button for Pagination */}
      {results.length > 0 && !loading && (
        <div className="text-center mt-8">
          <button
            onClick={(e) => handleSubmit(e, page + 1)}
            className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;
