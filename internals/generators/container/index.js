/**
 * Container Generator
 */

const componentExists = require("../utils/componentExists");

module.exports = {
  description: "Add a container component",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "What should it be called?",
      default: "Form",
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? "A component or container with this name already exists"
            : true;
        }

        return "The name is required";
      }
    },
    {
      type: "list",
      name: "component",
      message: "Select a base component:",
      default: "PureComponent",
      choices: () => ["PureComponent", "Component"]
    },
    {
      type: "confirm",
      name: "wantReduxForm",
      default: true,
      message: "Do you want to use redux form?"
    },
    {
      type: "confirm",
      name: "wantMessages",
      default: true,
      message: "Do you want i18n messages (i.e. will this component use text)?"
    },
    {
      type: "confirm",
      name: "wantStory",
      default: true,
      message: "Do you want to generate a story for storybook?"
    }
  ],
  actions: data => {
    // Generate index.js and index.test.js
    const actions = [
      {
        type: "add",
        path: "../../app/containers/{{properCase name}}/index.js",
        templateFile: "./container/index.js.hbs",
        abortOnFail: true
      },
      {
        type: "add",
        path: "../../app/containers/{{properCase name}}/tests/index.test.js",
        templateFile: "./container/test.js.hbs",
        abortOnFail: true
      }
    ];

    // If component wants messages
    if (data.wantMessages) {
      actions.push({
        type: "add",
        path: "../../app/containers/{{properCase name}}/messages.js",
        templateFile: "./container/messages.js.hbs",
        abortOnFail: true
      });
    }

    // Selectors
    actions.push({
      type: "add",
      path: "../../app/containers/{{properCase name}}/selectors.js",
      templateFile: "./container/selectors.js.hbs",
      abortOnFail: true
    });
    actions.push({
      type: "add",
      path: "../../app/containers/{{properCase name}}/tests/selectors.test.js",
      templateFile: "./container/selectors.test.js.hbs",
      abortOnFail: true
    });

    // Duck
    actions.push({
      type: "add",
      path: "../../app/containers/{{properCase name}}/duck.js",
      templateFile: "./container/duck.js.hbs",
      abortOnFail: true
    });
    actions.push({
      type: "add",
      path: "../../app/containers/{{properCase name}}/tests/duck.test.js",
      templateFile: "./container/duck.test.js.hbs",
      abortOnFail: true
    });

    // Sagas
    actions.push({
      type: "add",
      path: "../../app/containers/{{properCase name}}/sagas.js",
      templateFile: "./container/sagas.js.hbs",
      abortOnFail: true
    });
    actions.push({
      type: "add",
      path: "../../app/containers/{{properCase name}}/tests/sagas.test.js",
      templateFile: "./container/sagas.test.js.hbs",
      abortOnFail: true
    });

    if (data.wantStory) {
      actions.push({
        type: "add",
        path: "../../stories/Apps/{{properCase name}}.js",
        templateFile: "./container/story.js.hbs",
        abortOnFail: true
      });
    }

    return actions;
  }
};
