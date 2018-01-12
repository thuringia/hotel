/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { connect, bindActionCreators } from "react-redux";
import { createStructuredSelector } from "reselect";

// import { injectI18n } from "utils/i18n";
// import bindActionCreators from "utils/bindActionCreators";

import { actionCreators } from "./duck";
import makeSelectImport from "./selectors";

class Import extends React.PureComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    config: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired,
    i18n: PropTypes.func.isRequired
  };

  render() {
    const { actions, i18n } = this.props;

    return <div />;
  }
}

const mapStateToProps = id => makeSelectImport(id);

const mapDispatchToProps = bindActionCreators;

const Connected = id =>
  connect(mapStateToProps(id), mapDispatchToProps(actionCreators, id))(Import);

export default id => injectI18n(Connected(id));
