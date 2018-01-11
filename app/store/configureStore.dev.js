import { createHashHistory } from "history";
import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware, routerActions } from "react-router-redux";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";

import { rootReducer } from "../reducers";
import { actionCreators as counterActions } from "../containers/CounterPage/duck";

import type { counterStateType } from "../containers/CounterPage/duck";

const history = createHashHistory();
const sagaMiddleware = createSagaMiddleware();

const configureStore = (initialState?: counterStateType) => {
  // Redux Configuration
  const enhancers = [];

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middleware = [
    sagaMiddleware,
    createLogger({ level: "info", collapsed: true }),
    routerMiddleware(history)
  ];

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

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  // Create Store
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept(
      "../reducers",
      () => store.replaceReducer(require("../reducers")) // eslint-disable-line global-require
    );
  }

  return store;
};

export default { configureStore, history };
