import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import ModalView from "./ModalViewDepartamento";
import ModalEdit from "./ModalEditDepartamento";
import ModalDelete from "./ModalDeleteDepartamento";
import ModalExport from "./ModalExportCSV";
import "./../../../css/styleTableDepartamento.css";
import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import { DEPARTMENTS } from "./../../../services/EndPoints";
import moment from "moment";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";

class TableContentDepartamento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalViewPais: false,
      ModalEdit: false,
      ModalDel: false,
      modalexport: false,
      dataDepartment: [],
      hiddenColumnID: true,
      t: this.props.t,
      auth: this.props.authorization
    };
  }

  static getDerivedStaticFromProps(props, state) {
    if (props.auhorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization
      });
      this.getDataDepartment();
    }
  }

  getDataDepartment = () => {
    fetch(DEPARTMENTS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.authorization
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataDepartment: data
        });
      })
      .catch(Error => console.log(" ", Error));
  };

  accionesDepartamento(cell, row) {
    if (row.country.status !== 1) {
      return (
        <div
          className="table-actionMenuDepto"
          style={{ textAlign: "center", padding: "0", marginRight: "80px" }}
        >
          <button
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
    } else {
      return (
        <div
          className="table-actionMenuDepto"
          style={{ textAlign: "center", padding: "0", marginRight: "65px" }}
        >
          <button
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

  openModalView(id) {
    this.refs.child.toggle(id);
  }

  openModalEdit(id) {
    this.refs.child3.toggle(id);
  }

  openModalDelete(id) {
    this.refs.child2.toggle(id);
  }

  openModalExport = () => {
    this.refs.child4.toggle();
  };

  indexN(cell, row, enumObject, index) {
    return <div key={index}>{index + 1}</div>;
  }

  DepartamentoStatus(cell, row) {
    const { t } = this.props;
    let status;
    if (row.status === 1)
      status = <b className="text-success">{t("app_tablas_estado_activo")}</b>;
    else if (row.status === 0) {
      status = <b className="text-danger">{t("app_tablas_estado_inactivo")}</b>;
    }
    return status;
  }

  createCustomButtonGroup = props => {
    const { t } = this.props;
    return (
      <button
        type="button"
        className={`btn btn-secondary btn-sm`}
        onClick={() => this.openModalExport()}
      >
        <i className="fa fa-download" />{" "}
        {t("app_departamento_administrar_table_button_exportar")}
      </button>
    );
  };
  FechaCreacionDepartamento(cell, row) {
    let createdAt;
    createdAt = new Date(row.createdAt);
    return moment(createdAt).format("DD-MM-YYYY");
  }

  PaisInfo = country => {
    return !country ? null : `<div>${country.name}</div>`;
  };
  render() {
    const options = {
      btnGroup: this.createCustomButtonGroup
    };
    const { t } = this.props;
    return (
      <div className="animated fadeIn">
        <div className="col-md-12">
          <BootstrapTable
            options={options}
            exportCSV
            pagination
            search
            striped
            searchPlaceholder={t(
              "app_departamento_administrar_table_placeholder"
            )}
            data={this.state.dataDepartment}
            hover
            bordered={false}
            className="tableDepto texto-Depto"
          >
            <TableHeaderColumn
              export={false}
              isKey
              dataField={"id"}
              hidden={this.state.hiddenColumnID}
            />
            <TableHeaderColumn
              dataField={"id"}
              dataFormat={this.indexN}
              width={"50"}
              dataAlign="center"
              dataSort={true}
            >
              #
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="country"
              dataFormat={this.PaisInfo}
              dataAlign="center"
              width={"130"}
            >
              {" "}
              {t("app_departamento_administrar_table_pais")}{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="code"
              dataAlign="center"
              width={"130"}
            >
              {" "}
              {t("app_departamento_administrar_table_codigo")}{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="name"
              dataAlign="center"
              width={"250"}
            >
              {" "}
              {t("app_departamento_administrar_table_nombre")}{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataSort={true}
              dataField={"createdAt"}
              dataFormat={(cell, row) =>
                this.FechaCreacionDepartamento(cell, row)
              }
              dataAlign="center"
              width={"150"}
            >
              {t("app_departamento_administrar_table_fecha_creacion")}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="status"
              dataAlign="center"
              dataFormat={(cell, row) => this.DepartamentoStatus(cell, row)}
            >
              {" "}
              {t("app_departamento_administrar_table_estado")}{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              width={"200"}
              export={false}
              dataAlign="center"
              dataFormat={(cel, row) => this.accionesDepartamento(cel, row)}
            >
              {" "}
              {t("app_departamento_administrar_table_acciones")}{" "}
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
        <ModalView
          t={this.props.t}
          modalview={this.state.ModalViewPais}
          ref="child"
          authorization={this.state.auth}
        />
        <ModalEdit
          t={this.props.t}
          modaledit={this.state.ModalEdit}
          updateTable={this.getDataDepartment}
          ref="child3"
          authorization={this.state.auth}
        />
        <ModalDelete
          t={this.props.t}
          modaldel={this.state.ModalDel}
          updateTable={this.getDataDepartment}
          ref="child2"
          authorization={this.state.auth}
        />
        <ModalExport
          t={this.props.t}
          modalexport={this.state.ModalExport}
          ref="child4"
          authorization={this.state.auth}
        />
      </div>
    );
  }
}
TableContentDepartamento.propTypes = {
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired
};
export default withTranslation("translations")(TableContentDepartamento);
