import "babel-polyfill";
import { configure, setAddon } from "@storybook/react";
import { setOptions } from "@storybook/addon-options";

// import "./storybook.scss";
/*
import { describe, it } from "storybook-addon-specifications";
import expect from "expect";

window.describe = describe;
window.it = it;
window.expect = expect;
*/
setOptions({
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: true,
  showSearchBox: false,
  downPanelInRight: false,
  sortStoriesByKind: false,
  hierarchySeparator: "\\/|\\.|¯\\\\_\\(ツ\\)_\\/¯"
});

function loadStories() {
  require("../stories");
}

configure(loadStories, module);
