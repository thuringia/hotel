import { createSelector } from "reselect";

const selectImportDomain = id => state => state.get("Import").get(id);

const makeSelectImport = id =>
  createSelector(
    selectImportDomain(id),
    substate => (substate ? substate.toJS() : {})
  );

export default makeSelectImport;

export { selectImportDomain };
