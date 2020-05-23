import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router';

import history from './utils/history';

import AppReducer from './containers/App/reducer';
import RacePageReducer from './containers/RacePage/reducer';
import LoginPageReducer from './containers/LoginPage/reducer';
import ListPageReducer from './containers/ListPage/reducer';

const rootReducer = combineReducers({
  router: connectRouter(history),
  global: AppReducer,
  RacePageReducer,
  LoginPageReducer,
  ListPageReducer,
})

export default rootReducer;