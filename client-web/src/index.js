import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

// Import reducers
import settingsReducer from './store/reducers/Settings';
import authReducer from './store/reducers/authReducer';
import courseReducer from './store/reducers/courseReducer';

// Create root reducer that combines all individual reducers
const rootReducer = combineReducers({
  settings: settingsReducer,
  auth: authReducer,
  course: courseReducer,
})


// Create store for managing state with Redux
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
