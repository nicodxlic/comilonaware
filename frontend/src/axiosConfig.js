import Axios from 'axios'

const BASE_URL = 'http://localhost:8000'

export const axios = Axios.create({
    baseURL: BASE_URL,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
    },
    withCredentials: true,
    withXSRFToken: true,
  });