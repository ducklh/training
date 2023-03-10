// eslint-disable-next-line no-unused-vars
import queryString from 'query-string';
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import * as Api from '../constants/api';

export default function callApi(url, method = 'GET', body) {
  return axios({
    method,
    url: `${Api.server}/${url}`,
    data: body,
  }).catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
  });
}

// eslint-disable-next-line no-unused-vars
export function callQueryString(url, param) { 
  return queryString.stringify({
    url,
    query: param,
  });
}
