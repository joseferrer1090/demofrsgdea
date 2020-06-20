import React, { Component } from "react";
import PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Col } from "reactstrap";
import ModalView from "./ModalViewRemitente";
import ModalUpdate from "./ModalUpdateRemitente";
import ModalDel from "./ModalDeleteRemitente";
import ModalExport from "./ModalExportCSV";
import "./../../../css/styleTableRemitente.css";
import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import moment from "moment";
import { withTranslation } from "react-i18next";
import { THIRDPARTYS } from "../../../services/EndPoints";

class TableContentRemitente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalViewRemitente: false,
      modalUpdateRemitente: false,
      modalDeleteRemitente: false,
      dataTercero: [],
      hiddenColumnID: true,
      auth: this.props.authorization,
    };
  }

  static getDerivedStaticFromProps(props, state) {
    if (props.auhorization !== state.auth) {
      return {
        auth: props.authorization,
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization,
      });
      this.getDataTerceros();
    }
  }

  getDataTerceros = () => {
    fetch(`${THIRDPARTYS}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.props.authorization,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataTercero: data,
        });
      })
      .catch((Error) => console.log("", Error));
  };

  FechaCreacionTercero(cell, row) {
    let createdAt;
    createdAt = new Date(row.createdAt);
    return moment(createdAt).format("DD-MM-YYYY");
  }

  accionesRemitente(cel, row) {
    const { t } = this.props;
    return (
      <div
        className="table-actionMenuRemi"
        style={{ textAlign: "center", padding: "0", marginRight: "25px" }}
      >
        <button
          title={t("app_tercero_administrar_table_acciones_btn_ver")}
          className="btn btn-secondary btn-sm"
          onClick={() => {
            this.openModalView(row.id);
          }}
        >
          <i className="fa fa-eye" />
        </button>
        &nbsp;
        <button
          title={t("app_tercero_administrar_table_acciones_btn_editar")}
          className="btn btn-secondary btn-sm"
          onClick={() => {
            this.openModalEdit(row.id);
          }}
        >
          <i className="fa fa-pencil" />
        </button>
        &nbsp;
        <button
          title={t("app_tercero_administrar_table_acciones_btn_eliminar")}
          className="btn btn-danger btn-sm"
          onClick={() => {
            this.openModalDel(row.id);
          }}
        >
          <i className="fa fa-trash" />
        </button>
      </div>
    );
  }

  EstadoRemitente(cell, row) {
    const { t } = this.props;
    let status;
    if (row.status === 1) {
      status = (
        <b className="text-success"> {t("app_tablas_estado_activo")} </b>
      );
    } else if (row.status === 0) {
      status = (
        <b className="text-danger"> {t("app_tablas_estado_inactivo")} </b>
      );
    }
    return status;
  }

  openModalView(id) {
    // this.refs.child.toggle(id);
    this.ModalViewRef.toggle(id);
  }

  openModalDel(id) {
    // this.refs.child2.toggle(id);
    this.ModalDeleteRef.toggle(id);
  }

  openModalEdit(id) {
    // this.refs.child3.toggle(id);
    this.ModalEditRef.toggle(id);
  }
  openModalExport() {
    // this.refs.child4.toggle();
    this.ModalExportRef.toggle();
  }

  indexN(cell, row, enumObject, index) {
    return <div key={index}>{index + 1}</div>;
  }

  typeThirdParty = (typeThirdParty) => {
    return !typeThirdParty ? null : `<div>${typeThirdParty.name}</div>`;
  };
  createCustomButtonGroup = (props) => {
    const { t } = this.props;
    return (
      <button
        type="button"
        className={`btn btn-secondary btn-sm`}
        onClick={() => this.openModalExport()}
      >
        <i className="fa fa-download" />{" "}
        {t("app_tercero_administrar_tabla_boton_exportar")}
      </button>
    );
  };

  render() {
    const options = {
      btnGroup: this.createCustomButtonGroup,
    };
    const dataTerceros = this.state.dataTercero;
    const { t } = this.props;
    return (
      <div className="animated fadeIn">
        <Col sm="12">
          <BootstrapTable
            options={options}
            data={dataTerceros}
            pagination
            search
            searchPlaceholder={t("app_tercero_adminstrar_tabla_placeholder")}
            hover
            striped
            bordered={false}
            exportCSV
            className="tableRemi texto-Remi"
          >
            <TableHeaderColumn
              export={false}
              isKey
              dataField={"id"}
              hidden={this.state.hiddenColumnID}
            />
            <TableHeaderColumn
              dataSort={true}
              dataFormat={this.indexN}
              dataField={"id"}
              dataAlign="center"
              width={"50"}
            >
              #
            </TableHeaderColumn>
            <TableHeaderColumn
              dataSort={true}
              dataFormat={this.typeThirdParty}
              dataField={"typeThirdParty"}
              dataAlign="center"
              width={"170"}
            >
              {" "}
              {t("app_tercero_adminstrar_tabla_TipoTercero")}{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField={"identification"}
              dataAlign="center"
              width={"110"}
            >
              {" "}
              {t("app_tercero_adminstrar_tabla_identificacion")}{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField={"name"}
              dataAlign="center"
              width={"150"}
            >
              {" "}
              {t("app_tercero_adminstrar_tabla_nombre")}{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField={"email"}
              dataAlign="center"
              width={"200"}
            >
              {" "}
              {t("app_tercero_adminstrar_tabla_email")}{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataSort={true}
              dataField={"createdAt"}
              dataFormat={(cell, row) => this.FechaCreacionTercero(cell, row)}
              dataAlign="center"
              width={"150"}
            >
              {t("app_tercero_adminstrar_tabla_fecha_creacion")}
            </TableHeaderColumn>
            <TableHeaderColumn
              width={"80"}
              dataField={"status"}
              dataAlign="center"
              dataFormat={(cell, row) => this.EstadoRemitente(cell, row)}
            >
              {" "}
              {t("app_tercero_adminstrar_tabla_estado")}{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              // width={"120"}
              export={false}
              dataAlign="center"
              dataFormat={(cell, row) => this.accionesRemitente(cell, row)}
              style={{ border: "none" }}
            >
              {" "}
              {t("app_tercero_adminstrar_tabla_acciones")}{" "}
            </TableHeaderColumn>
          </BootstrapTable>
        </Col>

        <ModalView
          authorization={this.state.auth}
          t={this.props.t}
          modalview={this.state.modalViewRemitente}
          ref={(mv) => (this.ModalViewRef = mv)}
        />
        <ModalDel
          authorization={this.state.auth}
          updateTable={this.getDataTerceros}
          t={this.props.t}
          modaldel={this.state.modalDeleteRemitente}
          ref={(md) => (this.ModalDeleteRef = md)}
        />
        <ModalUpdate
          authorization={this.state.auth}
          updateTable={this.getDataTerceros}
          t={this.props.t}
          modalupdate={this.state.modalUpdateRemitente}
          ref={(me) => (this.ModalEditRef = me)}
        />
        <ModalExport
          authorization={this.state.auth}
          t={this.props.t}
          modalExport={this.state.modalexport}
          ref={(mexp) => (this.ModalExportRef = mexp)}
        />
      </div>
    );
  }
}

TableContentRemitente.propTypes = {
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired,
};

export default withTranslation("translations")(TableContentRemitente);
