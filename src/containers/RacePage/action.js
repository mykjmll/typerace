import { FETCH_DATA, SET_DATA, SET_ERROR, RESET_DATA } from './constant';
import axios from 'axios';
import {jsonApiUrl, randomTextApiUrl} from '../../utils/constants'

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
    data
  };
}

export const loadData = () => {
  return async dispatch => {
    dispatch(fetchData(true));
    try {
      const response = await axios.get(randomTextApiUrl);
      dispatch(setData('randomText', response.data));
      dispatch(fetchData(false));
    }
    catch {
      dispatch(setError('API Request Failed!'))
    }
    return 'done';
  };
}

export const postData = data => {
  return async dispatch => {
    dispatch(fetchData(true));
    try {
      await axios.post(`${jsonApiUrl}/typeracehistory`, data)
      dispatch(fetchData(false));
    }
    catch {
      dispatch(setError('API Request Failed!'))
    }
    return 'done';
  };
}

