import { createBrowserHistory } from "history";
import { /* Map, */ fromJS /* , toJS */ } from "immutable";
import { routerMiddleware } from "react-router-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import createReducer from "../reducers";

const history = createBrowserHistory();
const router = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(sagaMiddleware, router);

function configureStore(initialState = {}) {
  return createStore(createReducer, fromJS(initialState), enhancer);
}

export default { configureStore, history };
