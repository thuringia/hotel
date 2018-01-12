import { fromJS } from "immutable";
import { actionCreators, DEFAULT_ACTION, reducer } from "../duck";

describe("import duck", () => {
  describe("import reducer", () => {
    it("returns the initial state", () => {
      expect(reducer(undefined, {})).toEqual(fromJS({}));
    });
  });

  describe("Import actions", () => {
    describe("Default Action", () => {
      it("has a type of DEFAULT_ACTION", () => {
        const expected = {
          type: DEFAULT_ACTION
        };
        expect(actionCreators.defaultAction()).toEqual(expected);
      });
    });
  });
});
