/*
_      _      _
__(.)< __(.)> __(.)=
\___)  \___)  \___)
*/

import { fromJS } from "immutable";

// Actions
export const DEFAULT_ACTION = "app/Import/DEFAULT_ACTION";

// Reducer
const initialState = fromJS({});

export const reducer = (state = initialState, action, id) => {
  if (id && action.id && id !== action.id) return state;

  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
};

export const reducerWithConfig = (config = {}) => (
  state = initialState.set("config", config),
  action
) => reducer(state, action, config.id);

// Action Creators
export const actionCreators = {
  defaultAction(payload, id) {
    return {
      type: DEFAULT_ACTION,
      payload,
      id
    };
  }
};
