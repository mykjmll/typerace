import { FETCH_GLOBAL_DATA, SET_GLOBAL_DATA, SET_GLOBAL_ERROR } from './constant';

export function fetchGlobalData(loading = false) {
  return {
    type: FETCH_GLOBAL_DATA,
    loading,
  };
}
export function setGlobalData(key, data) {
  return {
    type: SET_GLOBAL_DATA,
    key,
    data
  };
}
export function setGlobalError(error) {
  return {
    type: SET_GLOBAL_ERROR,
    error
  };
}

