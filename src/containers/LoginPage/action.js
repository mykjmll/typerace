import { setGlobalData} from '../App/action';
import { FETCH_DATA, SET_DATA, SET_ERROR, RESET_DATA } from './constant';
import axios from 'axios';
import { forwardTo } from '../../utils/commonHelper';
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


export const login = data => {
  return async dispatch => {
    dispatch(fetchData(true));
    try {
      const success = {"success": true}
      const response = await axios.get(`${jsonApiUrl}/typeracelogin`, success);
      if (response.status !== 200) {
        throw response.error;
      }
      const userResponse = await axios.get(`${jsonApiUrl}/typeraceusers`);
      const user = userResponse.data && userResponse.data.find(f => f.username === data.username)
      if(user) {
        if(user.password === data.password) {
          const dt = {
            ...user,
            isLoggedIn: true,
          }
          dispatch(setGlobalData('user', dt));
          localStorage.setItem('username', user.username);
          forwardTo('/');
        } else {
          dispatch(setError('Username and Password did not match!'));
        }
      } else {
        dispatch(setError('Username and Password does not exist!'));
      }
      dispatch(fetchData(false));
    }
    catch {
      dispatch(setError('API Request Failed!'))
    }
    return 'done';
  };
}
