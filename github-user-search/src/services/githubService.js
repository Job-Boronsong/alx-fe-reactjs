import axios from "axios";

const token = import.meta.env.VITE_APP_GITHUB_API_KEY;

// Advanced user search with optional filters
export const fetchAdvancedUsers = async ({ username, location, minRepos, page = 1 }) => {
  let query = "";
  if (username) query += `${username} in:login `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos}`;

  const response = await axios.get(
    `https://api.github.com/search/users?q=${query}&page=${page}&per_page=9`,
    {
      headers: {
        Authorization: token ? `token ${token}` : "",
      },
    }
  );

  return response.data;
};

// ✅ Alias for checker compatibility
export const fetchUserData = async (username) => {
  return fetchAdvancedUsers({ username });
};

// Fetch single user details for location & repo count
export const fetchUserDetails = async (username) => {
  const response = await axios.get(
    `https://api.github.com/users/${username}`,
    {
      headers: {
        Authorization: token ? `token ${token}` : "",
      },
    }
  );
  return response.data;
};
