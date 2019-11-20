import React, { Component } from "react";
import PropTypes from "prop-types";
import { TableHeaderColumn, BootstrapTable } from "react-bootstrap-table";
import { Col } from "reactstrap";
import ModalView from "./ModalViewUser";
import ModalDelete from "./ModalDeleteUser";
import ModalUpdate from "./ModalEditUser";
import ModalChangePassword from "./FormChangePasswordUser";
import ModalExportCSV from "./ModalExportUser";
import "./../../../css/styleTableUsuarios.css";
import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import moment from "react-moment";
import { withTranslation } from "react-i18next";

class TableContentUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalviewuserstate: false,
      modaledituserstate: false,
      modaldeluserstate: false,
      modalchangepassword: false,
      modalexport: false,
      dataUsers: [],
      dataUsersDependence: [],
      dataUsersCharge: [],
      hiddenColumnID: true
    };
  }

  componentDidMount() {
    this.getDataUsers();
  }

  getDataUsers = () => {
    fetch("http://192.168.10.180:7000/api/sgdea/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + window.btoa("sgdea:123456")
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataUsers: data
        });
      })
      .catch(Error => console.log(" ", Error));
  };

  accionesUsuario(cell, row) {
    return (
      <div className="table-actionMenuUsu" style={{ marginRight: "30px" }}>
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
        &nbsp;
        <button
          className="btn btn-warning btn-sm"
          data-hover="hover"
          onClick={() => {
            this.openModalPassword(row.id);
          }}
        >
          {" "}
          <i className="fa fa-lock" />
        </button>
      </div>
    );
  }

  UsuarioStatus(cell, row) {
    const { t } = this.props;
    let status;
    if (row.enabled === true) {
      status = (
        <p className="text-success">
          <b>{t("app_tablas_estado_activo")}</b>
        </p>
      );
    } else if (row.enabled !== true) {
      status = (
        <p className="text-danger">
          <b>{t("app_tablas_estado_inactivo")}</b>
        </p>
      );
    }
    return status;
  }

  openModalView(id) {
    this.refs.child.toggle(id);
  }

  openModalDelete(id) {
    this.refs.child2.toggle(id);
  }

  openModalEdit(id) {
    this.refs.child3.toggle(id);
  }

  openModalPassword(id) {
    this.refs.child4.toggle(id);
  }

  openModalExport = () => {
    this.refs.child5.toggle();
  };

  createCustomButtonGroup = props => {
    const { t } = this.props;
    return (
      <button
        type="button"
        className={`btn btn-secondary btn-sm`}
        onClick={() => this.openModalExport()}
      >
        <i className="fa fa-download" />{" "}
        {t("app_usuarios_administrar_table_boton_exportar")}
      </button>
    );
  };

  FechaCreacionUsuario(cell, row) {
    let createdAt;
    createdAt = new Date(row.createdAt);
    return moment(createdAt).format("YYYY-MM-DD");
  }

  render() {
    const options = {
      btnGroup: this.createCustomButtonGroup,
      pagination: true,
      exportCSV: true
    };
    function indexN(cell, row, enumObject, index) {
      return <div>{index + 1}</div>;
    }

    const dependenceFormatter = data => {
      return !data ? null : `<div>${data.name}</div>`;
    };

    const chargeFormatter = data => {
      return !data ? null : `<div>${data.name}</div>`;
    };

    console.log(this.state.dataUsers);
    const t = this.props.t;
    return (
      <div className="animated fadeIn">
        <Col sm="12">
          <BootstrapTable
            pagination
            search
            searchPlaceholder={t("app_usuarios_administrar_table_placeholder")}
            data={this.state.dataUsers}
            options={options}
            hover
            striped
            bordered={false}
            className="tableUsu texto-Usu"
          >
            <TableHeaderColumn
              export={false}
              isKey
              dataField={"id"}
              hidden={this.state.hiddenColumnID}
            />
            <TableHeaderColumn
              dataField={"id"}
              width={"30"}
              dataAlign="center"
              dataFormat={indexN}
            >
              #
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField={"identification"}
              dataAlign={"center"}
              width={"120"}
            >
              {t("app_usuarios_administrar_table_identificacion")}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField={"name"}
              dataAlign="center"
              width={"100"}
            >
              {t("app_usuarios_administrar_table_nombre")}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField={"username"}
              dataAlign="center"
              width={"90"}
            >
              {t("app_usuarios_administrar_table_usuario")}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField={"dependence"}
              dataAlign="center"
              width={"150"}
              dataFormat={dependenceFormatter}
            >
              {" "}
              {t("app_usuarios_administrar_table_dependencia")}{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField={"charge"}
              dataAlign="center"
              width={"130"}
              dataFormat={chargeFormatter}
            >
              {t("app_usuarios_administrar_table_cargo")}
            </TableHeaderColumn>
            <TableHeaderColumn
              width={"150"}
              dataField={"createdAt"}
              dataAlign="center"
              dataFormat={(cell, row) => this.FechaCreacionUsuario(cell, row)}
            >
              {" "}
              {t("app_usuarios_administrar_table_fecha_creacion")}{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              width={"70"}
              dataField={"enabled"}
              dataAlign="center"
              dataFormat={(cell, row) => this.UsuarioStatus(cell, row)}
            >
              {" "}
              {t("app_usuarios_administrar_table_estado")}{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              width={"150"}
              export={false}
              dataAlign="center"
              dataFormat={(cell, row) => this.accionesUsuario(cell, row)}
              style={{ border: "none" }}
            >
              {t("app_usuarios_administrar_table_acciones")}
            </TableHeaderColumn>
          </BootstrapTable>
        </Col>

        <ModalView
          t={this.props.t}
          modalview={this.state.modalviewuserstate}
          ref="child"
        />
        <ModalDelete
          t={this.props.t}
          modaldel={this.state.modaldeluserstate}
          updateTable={this.getDataUsers}
          ref="child2"
        />
        <ModalUpdate
          t={this.props.t}
          updateTable={this.getDataUsers}
          modaledit={this.state.modaledituserstate}
          ref="child3"
        />
        <ModalChangePassword
          t={this.props.t}
          modalpassword={this.state.modalchangepassword}
          ref="child4"
        />
        <ModalExportCSV
          t={this.props.t}
          modalexport={this.state.modalexport}
          ref={"child5"}
        ></ModalExportCSV>
      </div>
    );
  }
}

TableContentUser.propTypes = {
  t: PropTypes.any
};

export default withTranslation("translations")(TableContentUser);
