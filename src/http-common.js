import axios from 'axios';

export default axios.create({
  baseURL: process.env.EXPO_PUBLIC_AXIOS_EXPORT_URL,
  headers: {
    'Content-type': 'application/json',
  },
});