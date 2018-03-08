// @flow
import React from "react";
import { hot } from "react-hot-loader";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";

import Routes from "../routes";

type RootType = {
  store: {},
  history: {}
};

function Root({ store, history }: RootType) {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  );
}

export default hot(module)(Root);
