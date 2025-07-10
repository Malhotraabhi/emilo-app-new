
const BASE_URL = 'https://emls.onrender.com/api';

const getToken = () => localStorage.getItem('token');
const apiFetch = async (endpoint, options = {}) => {
  const token = getToken();

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`API error: ${response.status} - ${errorBody}`);
  }

  return response.json();
};

export default apiFetch;
