import { createSelector } from "reselect";

const selectLabelDomain = state => state.get("labels");

const makeSelectLabel = () =>
  createSelector(
    selectLabelDomain,
    substate => (substate ? substate.toJS() : {})
  );

export default makeSelectLabel;

export { selectLabelDomain };
