// @flow
/*
_      _      _
__(.)< __(.)> __(.)=
\___)  \___)  \___)
*/

// Actions
export type actionType = {
  +type: string
};

export const INCREMENT_COUNTER = "INCREMENT_COUNTER";
export const DECREMENT_COUNTER = "DECREMENT_COUNTER";

export const actions = {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER
};

// Reducer
export type counterStateType = {
  +counter: number
};

export function reducer(state: number = 0, action: actionType) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state + 1;
    case DECREMENT_COUNTER:
      return state - 1;
    default:
      return state;
  }
}

// Action Creators
export function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

export function decrement() {
  return {
    type: DECREMENT_COUNTER
  };
}

export function incrementIfOdd() {
  return (
    dispatch: (action: actionType) => void,
    getState: () => counterStateType
  ) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}

export function incrementAsync(delay: number = 1000) {
  return (dispatch: (action: actionType) => void) => {
    setTimeout(() => {
      dispatch(increment());
    }, delay);
  };
}

export const actionCreators = {
  increment,
  decrement,
  incrementAsync,
  incrementIfOdd
};
