import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Alert } from "reactstrap";
import { bindActionCreators } from "redux";
import { addNotification } from "./../actions/notificationActions";

class NotificationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const notification = this.props.notificacion;
    return (
      <Fragment>
        <Alert isOpen={this.props.active} color={notification.level}>
          {notification.message}
        </Alert>
      </Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    notificacion: state.notificationReducer,
    active: state.notificationReducer.active,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        addNotification,
      },
      dispatch
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationContainer);
