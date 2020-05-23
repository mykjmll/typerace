import { FETCH_GLOBAL_DATA, SET_GLOBAL_DATA, SET_GLOBAL_ERROR } from './constant';

export const initialState = {
  loading: false,
  error: false,
  user: false,
}

const AppReducer = (state = initialState, action) => { 
  switch (action.type) {
    case FETCH_GLOBAL_DATA:
      return {...state, loading: true, error: null}
    case SET_GLOBAL_DATA:
      const key = action.key;
      return {...state, loading: false, [key]: action.data}
    case SET_GLOBAL_ERROR:
      return {...state, loading: false, error: action.error}
    default:
      return state
  }
}

export default AppReducer;