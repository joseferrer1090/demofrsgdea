import React, { Component } from "react";
import PropTypes, { func } from "prop-types";
import { connect } from "react-redux";
import { obtenerEstadosCorrespondencia } from "./../../../actions/statusCorrespondenceActions";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { bindActionCreators } from "redux";

class TableStatusCorrespondence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: this.props.authorization,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.props.sendTheAlert();
  };

  render() {
    console.log(this.props.estados.estados);
    return (
      <div>
        <p>probnado</p>
      </div>
    );
  }
}

TableStatusCorrespondence.propTypes = {
  authorization: PropTypes.string.isRequired,
};

function mapState(state) {
  return {
    estados: state.statusCorrespondenceReducer,
  };
}

function mapDispatch(dispatch) {
  return {
    sendTheAlert: () => {
      dispatch(obtenerEstadosCorrespondencia());
    },
  };
}

export default connect(mapState, mapDispatch)(TableStatusCorrespondence);
