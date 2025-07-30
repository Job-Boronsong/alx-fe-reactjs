import axios from "axios";

const token = import.meta.env.VITE_APP_GITHUB_API_KEY;
const BASE_URL = "https://api.github.com";

// Search users with optional filters
export const fetchAdvancedUsers = async ({ username, location, minRepos, page }) => {
  let query = "";
  if (username) query += `${username} in:login `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos}`;

  const response = await axios.get(`${BASE_URL}/search/users?q=${query}&page=${page}&per_page=9`, {
    headers: {
      Authorization: token ? `token ${token}` : "",
    },
  });

  return response.data;
};

// Fetch detailed info for each user
export const fetchUserDetails = async (username) => {
  const response = await axios.get(`${BASE_URL}/users/${username}`, {
    headers: {
      Authorization: token ? `token ${token}` : "",
    },
  });
  return response.data;
};
