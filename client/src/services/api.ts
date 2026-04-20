import axios from 'axios';

const SERVER_ORIGIN = import.meta.env.SERVER_ORIGIN;

const api = axios.create({
  baseURL: SERVER_ORIGIN,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
