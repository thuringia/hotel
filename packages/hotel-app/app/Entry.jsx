// App.js
import React from "react";
import { render } from "react-dom";
import { hot } from "react-hot-loader";

const App = () => <div>Hello World!</div>;

render(<App />, document.getElementById("app"));

export default hot(module)(App);
