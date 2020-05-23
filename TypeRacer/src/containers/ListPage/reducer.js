import { FETCH_DATA, SET_DATA, SET_ERROR, RESET_DATA } from './constant';

export const initialState = {
  loading: false,
  error: false,
  historyList: false
}

const ListPageReducer = (state = initialState, action) => { 
  switch (action.type) {
    case FETCH_DATA:
      return {...state, loading: action.loading}
    case SET_DATA:
      const key = action.key;
      return {...state, loading: false, [key]: action.data}
    case SET_ERROR:
      return {...state, loading: false, error: action.error}
    case RESET_DATA:
      return initialState
    default:
      return state
  }
}

export default ListPageReducer;