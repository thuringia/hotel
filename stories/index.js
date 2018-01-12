import _ from "lodash/fp";
import React from "react";
// import browser from "browser-detect";

import { linkTo } from "@storybook/addon-links";
import { storiesOf } from "@storybook/react";
import { Welcome } from "@storybook/react/demo";
import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";
import backgrounds from "@storybook/addon-backgrounds";

import AppProvider from "./util/AppProvider";

// import "../scss/index.scss";

storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));

//
// create stories for each directory with nesting
//

/**
 * filter story directories
 *
 * find directory names by matching against (/.*?/),
 * drop "null" (files w/o a directory ) and "util",
 * clean strings up
 *
 * @param {Array<String>}
 * @returns {Array<String>}
 */
const getStoryDirs = _.pipe(
  _.groupBy(dir => dir.match(/(\/.*?\/)/g)),
  _.omit(["null", "/util/"]),
  _.values,
  _.reduce(_.concat, [])
);

const storyRequire = require.context(`./`, true, /\.js$/);

// const browserResult = browser();

// create a wrapper for each directory with `storiesOf()`
// then create individual stories for the directory's contents

_.forEach(name => {
  const storyName = _.pipe(_.slice(2, -3), _.join(""), _.replace("/", "."));
  const theName = storyName(name);
  (storyRequire(name).default || storyRequire(name))(
    storiesOf(theName, module)
      .addDecorator((story, context) => withInfo("common info")(story)(context))
      .addDecorator(withKnobs)
      .addDecorator(AppProvider(name))
      .addDecorator(
        backgrounds([
          { name: "white", value: "rgb(255,255,255)", default: true },
          { name: "gray-dark", value: "rgb(51,51,51)" }
        ])
      )
  );
}, getStoryDirs(storyRequire.keys()));
