import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import varialbeReducer from './store/reducers/variableReducer';
import usersReducer from './store/reducers/usersReducer';
import rootSaga from './store/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    variables: varialbeReducer,
    users: usersReducer
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const app = (
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);


ReactDOM.render(app, document.getElementById('root'));
// registerServiceWorker();
