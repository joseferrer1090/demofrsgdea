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
    console.log(this.props.estados);
    return (
      <div>
        <BootstrapTable data={this.props.estados}>
          <TableHeaderColumn dataField={"id"} isKey dataAlign={"center"}>
            ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField={"name"} dataAlign={"center"}>
            Estado
          </TableHeaderColumn>
          <TableHeaderColumn dataField={"description"} dataAlign={"center"}>
            Descripcion
          </TableHeaderColumn>
          <TableHeaderColumn dataField={"createdAt"} dataAlign={"center"}>
            Fecha de creacion
          </TableHeaderColumn>
          <TableHeaderColumn dataField={"updatedAt"} dataAlign={"center"}>
            Fecha de modicacion
          </TableHeaderColumn>
          <TableHeaderColumn>Acciones</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

TableStatusCorrespondence.propTypes = {
  authorization: PropTypes.string.isRequired,
};

function mapState(state) {
  return {
    estados: state.statusCorrespondenceReducer.estados,
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
