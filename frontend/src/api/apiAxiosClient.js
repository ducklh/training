// eslint-disable-next-line no-unused-vars
import queryString from 'query-string';
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import * as Api from '../constants/api';

const axiosClient = axios.create({
  baseURL: `${Api.server}`,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

// eslint-disable-next-line arrow-body-style
axiosClient.interceptors.request.use(async (config) => { return config; });

// eslint-disable-next-line consistent-return
axiosClient.interceptors.request.use((res) => {
  if (res && res.data) {
    return res.data;
  }
  return res;
}, (err) => {
  throw err;
});

export default axiosClient;
