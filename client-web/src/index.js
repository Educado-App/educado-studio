import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import * as serviceWorker from './serviceWorker';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


// Import reducers
import settingsReducer from './store/reducers/Settings';
import authReducer from './store/reducers/authReducer';

// Create root reducer that combines all individual reducers
const rootReducer = combineReducers({
  settings: settingsReducer,
  auth: authReducer,
})


// Create store for managing state with Redux
const store = createStore(rootReducer, applyMiddleware(thunk));


// Logic for rendering app
// If props.state.auth.loginStatus = false
// Then main = <Login />
// Else main = <App />

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();