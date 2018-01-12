/*
_      _      _
__(.)< __(.)> __(.)=
\___)  \___)  \___)
*/
import { /* Map, */ fromJS /* , toJS */ } from "immutable";

// Action(Type)s from LH-ID (label reducer)

export const LABEL_FETCH_REQUESTED = "app/Label/LABEL_FETCH_REQUESTED";

// Reducer
const initialState = fromJS({
  error: null,
  bundles: {
    common: {},
    enrolment: {},
    user: {}
  }
});

// prettier-ignore
export const reducer = (state = initialState, { type, payload, error }) => { // eslint-disable-line
  switch (type) {
    default:
      break;
  }
};

// Action Creators
export const actionCreators = {
  labelFetchRequested({ url }) {
    return {
      type: LABEL_FETCH_REQUESTED,
      payload: { url }
    };
  }
};
