import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Col } from "reactstrap";
import ModalView from "./ModalViewDependencia";
import ModalEdit from "./ModalEditDependencia";
import ModalDelete from "./ModalDeleteDependencia";
import ModalExport from "./ModalExportCSV";
import "./../../../css/styleTableDependencia.css";
import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import moment from "moment";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { DEPENDENCIES } from "../../../services/EndPoints";

class TableContentDependencia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalviewstate: false,
      modaleditstate: false,
      modaldelstate: false,
      modalexport: false,
      dataDependence: [],
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
      this.getDataDependence();
    }
  }

  getDataDependence = () => {
    fetch(`${DEPENDENCIES}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.props.authorization,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataDependence: data,
        });
      })
      .catch((Error) => console.log("", Error));
  };
  FechaCreacionDependencia(cell, row) {
    let createdAt;
    createdAt = new Date(row.createdAt);
    return moment(createdAt).format("DD-MM-YYYY");
  }

  accionesDependencias(cell, row) {
    const { t } = this.props;
    if (row.headquarter.status !== 1)
      return (
        <div className="table-actionMenuDep" style={{ marginRight: "55px" }}>
          <button
            title={t("app_dependencia_administrar_table_acciones_btn_ver")}
            className="btn btn-secondary btn-sm"
            data-trigger="hover"
            onClick={() => {
              this.openModalView(row.id);
            }}
          >
            {" "}
            <i className="fa fa-eye" />{" "}
          </button>
          &nbsp;
          <button
            title={t("app_dependencia_administrar_table_acciones_btn_eliminar")}
            className="btn btn-danger btn-sm"
            data-trigger="hover"
            onClick={() => {
              this.openModalDelete(row.id);
            }}
          >
            {" "}
            <i className="fa fa-trash" />{" "}
          </button>
        </div>
      );
    else {
      return (
        <div className="table-actionMenuDep" style={{ marginRight: "40px" }}>
          <button
            title={t("app_dependencia_administrar_table_acciones_btn_ver")}
            className="btn btn-secondary btn-sm"
            data-trigger="hover"
            onClick={() => {
              this.openModalView(row.id);
            }}
          >
            {" "}
            <i className="fa fa-eye" />{" "}
          </button>
          &nbsp;
          <button
            title={t("app_dependencia_administrar_table_acciones_btn_editar")}
            className="btn btn-secondary btn-sm"
            data-trigger="hover"
            onClick={() => {
              this.openModalEdit(row.id);
            }}
          >
            <i className="fa fa-pencil" />
          </button>
          &nbsp;
          <button
            title={t("app_dependencia_administrar_table_acciones_btn_eliminar")}
            className="btn btn-danger btn-sm"
            data-trigger="hover"
            onClick={() => {
              this.openModalDelete(row.id);
            }}
          >
            {" "}
            <i className="fa fa-trash" />{" "}
          </button>
        </div>
      );
    }
  }

  StatusDependencia(cell, row) {
    const { t } = this.props;
    let status;
    if (row.status === 1) {
      status = <b className="text-success">{t("app_tablas_estado_activo")}</b>;
    } else if (row.status === 0) {
      status = <b className="text-danger">{t("app_tablas_estado_inactivo")}</b>;
    }
    return status;
  }

  openModalView(id) {
    // this.refs.child1.toggle(id);
    this.ModalViewRef.toggle(id);
  }

  openModalDelete(id) {
    // this.refs.child3.toggle(id);
    this.ModalDeleteRef.toggle(id);
  }

  openModalEdit(id) {
    // this.refs.child2.toggle(id);
    this.ModalEditRef.toggle(id);
  }

  openModalExport() {
    // this.refs.child4.toggle();
    this.ModalExportRef.toggle();
  }

  indexN(cell, row, enumObject, index) {
    return <div key={index}>{index + 1}</div>;
  }

  headquarter = (headquarter) => {
    return !headquarter ? null : `<div>${headquarter.name}</div>`;
  };

  charge = (charge) => {
    return !charge ? null : `<div>${charge.name}</div>`;
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
        {t("app_dependencia_administrar_table_button_exportar")}
      </button>
    );
  };

  render() {
    const dataDependence = this.state.dataDependence;
    const options = {
      btnGroup: this.createCustomButtonGroup,
    };
    const { t } = this.props;
    return (
      <div className="animated fadeIn">
        <Col md="12">
          <BootstrapTable
            options={options}
            data={dataDependence}
            pagination
            search
            searchPlaceholder={t(
              "app_dependencia_administrar_table_placeholder"
            )}
            exportCSV
            bordered={false}
            hover
            striped
            className="tableDep texto-Dep"
          >
            <TableHeaderColumn
              export={false}
              isKey
              dataField={"id"}
              hidden={this.state.hiddenColumnID}
            />
            <TableHeaderColumn
              dataSort={true}
              dataField={"id"}
              width={"30"}
              dataFormat={this.indexN}
              dataAlign="center"
            >
              #
            </TableHeaderColumn>
            <TableHeaderColumn
              width={"120"}
              dataField="headquarter"
              dataFormat={this.headquarter}
              dataAlign="center"
              dataSort={true}
            >
              {t("app_dependencia_administrar_table_sede")}
            </TableHeaderColumn>
            <TableHeaderColumn
              width={"100"}
              dataField="code"
              dataAlign="center"
              dataSort={true}
            >
              {t("app_dependencia_administrar_table_codigo")}
            </TableHeaderColumn>
            <TableHeaderColumn
              width={"170"}
              dataField="name"
              dataSort={true}
              dataAlign="center"
            >
              {t("app_dependencia_administrar_table_nombre")}
            </TableHeaderColumn>
            <TableHeaderColumn
              width={"120"}
              dataField="charge"
              dataFormat={this.charge}
              dataAlign="center"
              dataSort={true}
            >
              {t("app_dependencia_administrar_table_cargo_responsable")}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataSort={true}
              dataField={"createdAt"}
              dataFormat={(cell, row) =>
                this.FechaCreacionDependencia(cell, row)
              }
              dataAlign="center"
              width={"140"}
            >
              {t("app_dependencia_administrar_table_fecha_creacion")}
            </TableHeaderColumn>
            <TableHeaderColumn
              width={"70"}
              dataField="Estado"
              dataAlign="center"
              dataSort={true}
              dataFormat={(cell, row) => this.StatusDependencia(cell, row)}
            >
              {" "}
              {t("app_dependencia_administrar_table_estado")}{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              width={"120"}
              export={false}
              dataAlign="center"
              dataFormat={(cell, row) => this.accionesDependencias(cell, row)}
            >
              {t("app_dependencia_administrar_table_acciones")}
            </TableHeaderColumn>
          </BootstrapTable>
        </Col>
        <ModalView
          authorization={this.state.auth}
          t={this.props.t}
          modalView={this.state.modalviewstate}
          ref={(mv) => (this.ModalViewRef = mv)}
        />
        <ModalEdit
          authorization={this.state.auth}
          t={this.props.t}
          modalEdit={this.state.modaleditstate}
          updateTable={this.getDataDependence}
          ref={(me) => (this.ModalEditRef = me)}
        />
        <ModalDelete
          authorization={this.state.auth}
          t={this.props.t}
          modalDel={this.state.modaldelstate}
          updateTable={this.getDataDependence}
          ref={(md) => (this.ModalDeleteRef = md)}
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

TableContentDependencia.propTypes = {
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired,
};

export default withTranslation("translations")(TableContentDependencia);
