import React from "react";
import { render } from "react-dom";

import Root from "./containers/Root";
import { configureStore, history } from "./store";
// import './app.global.css';

const store = configureStore();

render(
  <Root store={store} history={history} />,
  document.getElementById("root")
);
/*
if (module.hot) {
  module.hot.accept("./containers/Root", () => {
    const NextRoot = require("./containers/Root"); // eslint-disable-line global-require
    render(
      <NextRoot store={store} history={history} />,
      document.getElementById("root")
    );
  });
}
*/
