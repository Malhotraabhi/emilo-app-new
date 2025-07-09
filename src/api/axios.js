import axios from 'axios';

const token = localStorage.getItem('token');

const instance = axios.create({
  baseURL: 'https://emls.onrender.com/api',
  headers: {
    'Accept': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  }
});

export default instance;
