import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import "./../../../css/styleTableTipoTramite.css";
import ModalViewTramite from "./ModalViewTramite";
import ModalDeleteTramite from "./ModalDeleteTramite";
import ModalExport from "./ModalExportCSV";
import ModalExport2 from "./ModalExportCSVTipoTramiteUser";
import moment from "moment";
import { withTranslation } from "react-i18next";
import { TYPEPROCEDURES } from "./../../../services/EndPoints";
import { Link, Redirect } from "react-router-dom";

class TableContentTramite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      t: this.props.t,
      dataTipoTramite: [],
      modalview: false,
      modaldel: false,
      modalexport: false,
      modalexport2: false,
      hiddenColumnID: true,
      auth: this.props.authorization,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState(
        {
          auth: this.props.authorization,
        },
        this.getDataTipoTramite()
      );
    }
  }

  getDataTipoTramite = () => {
    fetch(`${TYPEPROCEDURES}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.auth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataTipoTramite: data,
        });
      })
      .catch((err) => console.log("Error", err));
  };

  accionesTramite = (cell, row) => {
    return (
      <div
        className="table-actionMenuTTramite"
        style={{ textAlign: "center", padding: "0", marginRight: "40px" }}
      >
        <button
          title="Ver tipo de tramite"
          className="btn btn-secondary btn-sm"
          onClick={() => {
            this.openModalView(row.id);
          }}
        >
          <i className="fa fa-eye" />
        </button>
        &nbsp;
        <button
          title="Editar tipo de tramite"
          className="btn btn-secondary btn-sm"
          onClick={() => {
            this.routeChange(row.id);
          }}
        >
          <i className="fa fa-pencil" />
        </button>
        &nbsp;
        <button
          title="Eliminar tipo de tramite"
          className="btn btn-danger btn-sm"
          onClick={() => {
            this.openModalDelete(row.id);
          }}
        >
          <i className="fa fa-trash" />
        </button>
      </div>
    );
  };

  FechaCreacionTipoTramite(cell, row) {
    let createdAt;
    createdAt = new Date(row.createdAt);
    return moment(createdAt).format("DD-MM-YYYY");
  }

  estadotramite = (cell, row) => {
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
  };

  openModalView(id) {
    // this.refs.child1.toggle(id);
    this.ModalViewRef.toggle(id);
  }

  routeChange = (id) => {
    let path = `/#/configuracion/tipotramite/edit/${id}`;
    window.location.replace(path);
  };

  openModalDelete(id) {
    // this.refs.child2.toggle(id);
    this.ModalDeleteRef.toggle(id);
  }

  openModalExport() {
    // this.refs.child3.toggle();
    this.ModalExportRef.toggle();
  }

  openModalExportUsers() {
    // this.refs.child4.toggle();
    this.ModalExportUsersRef.toggle();
  }

  indexN(cell, row, enumObject, index) {
    return <div key={index}>{index + 1}</div>;
  }

  createCustomButtonGroup = (props) => {
    const { t } = this.props;
    return (
      <div>
        <button
          type="button"
          className={`btn btn-secondary btn-sm`}
          onClick={() => this.openModalExport()}
        >
          <i className="fa fa-download" />{" "}
          {t("app_tipoTramite_table_administrar_exportar")}
        </button>
        &nbsp;
        <button
          type="button"
          className={`btn btn-secondary btn-sm`}
          onClick={() => this.openModalExportUsers()}
        >
          <i className="fa fa-download" />{" "}
          {t("app_tipoTramite_table_administrar_exportar_usuarios")}
        </button>
      </div>
    );
  };

  render() {
    const { t } = this.props;
    const { auth } = this.state;

    const options = {
      btnGroup: this.createCustomButtonGroup,
      pagination: true,
      exportCSV: true,
    };
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm={12}>
            <BootstrapTable
              data={this.state.dataTipoTramite}
              bordered={false}
              options={options}
              hover
              pagination
              search
              striped
              searchPlaceholder={t(
                "app_tipoTramite_table_administrar_placeholder"
              )}
              exportCSV
              className="texto-TLlegada"
            >
              <TableHeaderColumn
                isKey
                dataField={"id"}
                width="50"
                hidden={this.state.hiddenColumnID}
              />
              <TableHeaderColumn
                dataField={"id"}
                width="40"
                dataFormat={this.indexN}
              >
                {" "}
                #{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                width={"100"}
                dataField={"code"}
                dataAlign="center"
              >
                {" "}
                {t("app_tipoTramite_table_administrar_codigo")}{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                width={"230"}
                dataField={"name"}
                dataAlign="center"
              >
                {" "}
                {t("app_tipoTramite_table_administrar_nombre")}{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField={"description"} dataAlign="center">
                {" "}
                {t("app_tipoTramite_table_administrar_descripcion")}{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                width={"170"}
                dataField={"answerDays"}
                dataAlign={"center"}
              >
                {" "}
                {t("app_tipoTramite_table_administrar_tiempo_respuesta")}{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField={"createdAt"}
                dataAlign={"center"}
                dataFormat={(cell, row) =>
                  this.FechaCreacionTipoTramite(cell, row)
                }
              >
                {" "}
                {t("app_tipoTramite_table_administrar_fecha_creacion")}
              </TableHeaderColumn>
              <TableHeaderColumn
                width={"100"}
                dataField="status"
                dataAlign="center"
                dataFormat={(cell, row) => this.estadotramite(cell, row)}
              >
                {" "}
                {t("app_tipoTramite_table_administrar_estado")}{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                export={false}
                dataAlign="center"
                dataFormat={(cell, row) => this.accionesTramite(cell, row)}
              >
                {" "}
                {t("app_tipoTramite_table_administrar_acciones")}{" "}
              </TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
        <ModalViewTramite
          t={this.state.t}
          authorization={auth}
          modalviewtramit={this.state.modalview}
          ref={(mv) => (this.ModalViewRef = mv)}
        />
        <ModalDeleteTramite
          t={this.state.t}
          authorization={auth}
          updateTable={this.getDataTipoTramite}
          modaldelete={this.state.modaldel}
          ref={(md) => (this.ModalDeleteRef = md)}
        />
        <ModalExport
          t={this.state.t}
          authorization={auth}
          modalexport={this.state.modalexport}
          ref={(mexp) => (this.ModalExportRef = mexp)}
        />
        <ModalExport2
          t={this.state.t}
          authorization={auth}
          modalexport2={this.state.modalexport2}
          ref={(mexpu) => (this.ModalExportUsersRef = mexpu)}
        />
      </div>
    );
  }
}

TableContentTramite.propTypes = {};

export default withTranslation("translations")(TableContentTramite);
