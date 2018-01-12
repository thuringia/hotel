import { combineReducers } from "redux-immutable";
import React from "react";

import { getAsyncInjectors } from "../../app/utils/asyncInjectors";
import Import from "../../app/containers/Import";

const { injectReducer, injectSagas } = getAsyncInjectors(window.store);

const className = "hotel-import";
const name = "Import";

const config = {
  id: `${className}-unique`
};

class Story extends React.Component {
  state = {
    loading: true
  };

  /* eslint-disable promise/catch-or-return */
  componentWillMount() {
    Promise.all([
      import(`../../app/containers/${name}/duck.js`).then(
        ({ reducerWithConfig }) =>
          injectReducer(
            name,
            combineReducers({
              [config.id]: reducerWithConfig(config)
            })
          )
      ),
      import(`../../app/containers/${name}/sagas.js`).then(
        ({ default: sagas }) => injectSagas(sagas)
      )
    ]).then(() => this.setState({ loading: false }));
  }
  /* eslint-enable promise/catch-or-return */

  render() {
    if (this.state.loading) return <div>Loading...</div>;
    return React.createElement(Import(config.id));
  }
}

export default container => {
  container.add(name, () => <Story />);
};
