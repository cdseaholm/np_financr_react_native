import axios from 'axios';
import {EXPO_PUBLIC_AXIOS_EXPORT_URL} from '@env';

export default axios.create({
  baseURL: EXPO_PUBLIC_AXIOS_EXPORT_URL,
  headers: {
    'Content-type': 'application/json',
  },
});