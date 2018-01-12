// @flow
import { combineReducers } from "redux-immutable";
import { routerReducer as router } from "react-router-redux";
import { reducer as counter } from "./containers/CounterPage/duck";

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers: any = {}) {
  return combineReducers({
    counter,
    router,
    ...asyncReducers
  });
}
