import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { obtenerEstadosCorrespondencia } from "./../../../actions/statusCorrespondenceActions";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import ModalView from "./ModalViewStatus";
import ModalEdit from "./ModalEditStatus";
import moment from "moment";

class TableStatusCorrespondence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: this.props.authorization,
      modalview: false,
      modaledit: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.props.sendTheAlert();
  };

  accionesEstadosCorrespondencia(cell, row) {
    return (
      <div>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          title="Ver estado"
          onClick={() => {
            this.openModalView(row.id);
          }}
        >
          <i className="fa fa-eye" />
        </button>
        &nbsp;
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          title={"Editar valores del estado"}
          onClick={() => {
            this.openModalEdit(row.id);
          }}
        >
          {" "}
          <i className="fa fa-pencil" />{" "}
        </button>
      </div>
    );
  }

  openModalView(id) {
    this.ModalView.toogle(id);
  }

  openModalEdit(id) {
    this.ModalEdit.toggle(id);
  }

  FechaCreacion(data) {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format("DD-MM-YYYY, h:mm:ss a");
  }
  FechaModificacion(data) {
    let updatedAt;
    updatedAt = new Date(data);
    return moment(updatedAt).format("DD-MM-YYYY, h:mm:ss a");
  }

  render() {
    return (
      <div>
        <BootstrapTable
          data={this.props.estados}
          hover
          condensed
          striped
          search
          searchPlaceholder="Buscar"
          pagination
        >
          <TableHeaderColumn dataField={"id"} isKey dataAlign={"center"}>
            ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField={"name"} dataAlign={"center"}>
            Estado
          </TableHeaderColumn>
          <TableHeaderColumn dataField={"description"} dataAlign={"center"}>
            Descripcion
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField={"createdAt"}
            dataAlign={"center"}
            dataFormat={(cell, row) => this.FechaCreacion(cell, row)}
          >
            Fecha de creacion
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField={"updatedAt"}
            dataAlign={"center"}
            dataFormat={(cell, row) => this.FechaModificacion(cell, row)}
          >
            Fecha de modicacion
          </TableHeaderColumn>
          <TableHeaderColumn
            dataAlign={"center"}
            dataFormat={(cell, row) =>
              this.accionesEstadosCorrespondencia(cell, row)
            }
          >
            Acciones
          </TableHeaderColumn>
        </BootstrapTable>
        <ModalView
          modalview={this.state.modalview}
          ref={(mv) => (this.ModalView = mv)}
        />
        <ModalEdit
          modaledit={this.state.modaledit}
          ref={(me) => (this.ModalEdit = me)}
        />
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
