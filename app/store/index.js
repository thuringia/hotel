// @flow
module.exports =
  process.env.NODE_ENV === "production"
    ? require("./configureStore.prod")
    : require("./configureStore.dev"); // eslint-disable-line global-require
