import { /* apply, */ put, select, takeEvery } from "redux-saga/effects";
import { trimEnd } from "lodash";

import { actionCreators, LABEL_FETCH_REQUESTED } from "./duck";

function* labelFetchRequest(action) {
  try {
    // the bundle key is the last segment of the url, e.g. /labels/profile => profile
    const bundleKey = trimEnd(action.payload.url, "/")
      .split("/")
      .pop();

    // abort loading if the bundle is already loaded
    const bundleAlreadyLoaded = yield select(state => {
      const bundle = state.getIn(["labels", "bundles", bundleKey]);
      return bundle && !bundle.isEmpty();
    });

    if (bundleAlreadyLoaded) {
      yield put(actionCreators.labelFetchAborted({ bundleKey }));
      return;
    }

    // TODO: [DKR]: replace later with an axios server call
    // eslint-disable-next-line
    const labels = require(`../../translations/${bundleKey}.json`);

    yield put(
      actionCreators.labelFetchSucceeded({
        labels,
        bundleKey
      })
    );
  } catch (err) {
    yield put(actionCreators.labelFetchFailed(err));
  }
}

function* bootstrap() {
  yield takeEvery(LABEL_FETCH_REQUESTED, labelFetchRequest);
}
export default [bootstrap];
