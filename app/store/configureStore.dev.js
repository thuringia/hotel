import { createHashHistory } from "history";
import { /* Map, */ fromJS /* , toJS */ } from "immutable";
import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware, routerActions } from "react-router-redux";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";

import createReducer from "../reducers";
import globalSagas from "../sagas";
import { actionCreators as counterActions } from "../containers/CounterPage/duck";

const history = createHashHistory();
const sagaMiddleware = createSagaMiddleware();

const configureStore = (initialState = {}) => {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middleware = [
    sagaMiddleware,
    createLogger({ level: "info", collapsed: true }),
    routerMiddleware(history)
  ];

  // Redux Configuration
  const enhancers = [applyMiddleware(...middleware)];

  // Redux DevTools Configuration
  const actionCreators = {
    ...counterActions,
    ...routerActions
  };
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
        actionCreators
      })
    : compose;
  /* eslint-enable no-underscore-dangle */

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers)
  );

  // Extensions
  store.runSaga = sagaMiddleware.run;
  globalSagas.map(store.runSaga); // inject global sagas

  store.asyncReducers = {}; // Async reducer registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept("../reducers", () => {
      import("../reducers").then(reducerModule => {
        const createReducers = reducerModule.default;
        const nextReducers = createReducers(store.asyncReducers);

        store.replaceReducer(nextReducers);
      });
    });
  }
  return store;
};

export default { configureStore, history };
