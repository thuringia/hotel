import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Counter from "../../components/Counter";

import { actionCreators } from "./duck";

function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
