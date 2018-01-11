// @flow
import { combineReducers } from "redux";
import { routerReducer as router } from "react-router-redux";
import { reducer as counter } from "./containers/CounterPage/duck";

export const rootReducer = combineReducers({
  counter,
  router
});
