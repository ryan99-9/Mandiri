import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

import App from './app'

import { createStore,applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import allReducer from './redux/reducers'
import ReduxThunk from 'redux-thunk'

let globalState = createStore(allReducer,applyMiddleware(ReduxThunk))


ReactDOM.render(
    <Provider store={globalState}>
        <App />
    </Provider>,
    document.getElementById('root')
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
