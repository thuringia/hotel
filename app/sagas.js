/** Global sagas */

import _ from "lodash";

const globalSagas = [];

// flatten array of saga arrays
export default _.flatten(globalSagas);
