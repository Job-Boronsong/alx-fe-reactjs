import axios from 'axios';

const BASE_URL = 'https://api.github.com/users';

const headers = {
  Authorization: `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`,
};

export const fetchGitHubUser = async (username) => {
  const response = await axios.get(`${BASE_URL}/${username}`, {
    headers,
  });
  return response.data;
};
