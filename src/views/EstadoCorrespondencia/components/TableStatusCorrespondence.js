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
      t: this.props.t,
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
    const { t } = this.props;
    return (
      <div>
        <BootstrapTable
          data={this.props.estados}
          hover
          condensed
          striped
          search
          searchPlaceholder={t("app_filing_status_table_acciones_placeholder")}
          pagination
        >
          <TableHeaderColumn dataField={"id"} isKey dataAlign={"center"}>
            {t("app_filing_status_table_id")}
          </TableHeaderColumn>
          <TableHeaderColumn dataField={"name"} dataAlign={"center"}>
            {t("app_filing_status_table_estado")}
          </TableHeaderColumn>
          <TableHeaderColumn dataField={"description"} dataAlign={"center"}>
            {t("app_filing_status_table_descripcion")}
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField={"createdAt"}
            dataAlign={"center"}
            dataFormat={(cell, row) => this.FechaCreacion(cell, row)}
          >
            {t("app_filing_status_table_fecha_creacion")}
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField={"updatedAt"}
            dataAlign={"center"}
            dataFormat={(cell, row) => this.FechaModificacion(cell, row)}
          >
            {t("app_filing_status_table_fecha_modificacion")}
          </TableHeaderColumn>
          <TableHeaderColumn
            dataAlign={"center"}
            dataFormat={(cell, row) =>
              this.accionesEstadosCorrespondencia(cell, row)
            }
          >
            {t("app_filing_status_table_acciones")}
          </TableHeaderColumn>
        </BootstrapTable>
        <ModalView
          t={this.props.t}
          modalview={this.state.modalview}
          ref={(mv) => (this.ModalView = mv)}
        />
        <ModalEdit
          t={this.props.t}
          modaledit={this.state.modaledit}
          ref={(me) => (this.ModalEdit = me)}
          updateTable={this.getData}
        />
      </div>
    );
  }
}

TableStatusCorrespondence.propTypes = {
  authorization: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
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
