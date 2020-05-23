import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from "redux-thunk";
import "regenerator-runtime/runtime";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap/dist/js/bootstrap.min';
import './index.css';
import rootReducer from './rootReducer';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import history from './utils/history';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, 
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
