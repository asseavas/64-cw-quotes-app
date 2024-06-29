import axios from 'axios';

const axiosApi = axios.create({
  baseURL:
    'https://klimova-js-25-default-rtdb.europe-west1.firebasedatabase.app/',
});

export default axiosApi;
