import { FETCH_DATA, SET_DATA, SET_ERROR, RESET_DATA } from './constant';
import axios from 'axios';
import {jsonApiUrl} from '../../utils/constants'

export function fetchData(loading = false) {
  return {
    type: FETCH_DATA,
    loading,
  };
}
export function setData(key, data) {
  return {
    type: SET_DATA,
    key,
    data
  };
}
export function setError(error) {
  return {
    type: SET_ERROR,
    error
  };
}

export function resetData(data) {
  return {
    type: RESET_DATA,
    data,
  };
}

export const fetchHistory = () => {
  return async dispatch => {
    dispatch(fetchData(true));
    try {
      const user = localStorage.getItem('username');
      const response = await axios.get(`${jsonApiUrl}/typeracehistory?q=user:${user}`);
      dispatch(setData('historyList', response.data));
      dispatch(fetchData(false));
    }
    catch {
      dispatch(setError('API Request Failed!'))
    }
    return 'done';
  };
}

