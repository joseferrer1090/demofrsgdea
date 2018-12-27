import React, { Component } from "react";
import PropTypes from "prop-types";
import { TableHeaderColumn, BootstrapTable } from "react-bootstrap-table";
import { Row, Col } from "reactstrap";
import ModalView from "./ModalViewUser";
import ModalDelete from "./ModalDeleteUser";
import ModalUpdate from "./ModalEditUser";
import ModalChangePassword from "./FormChangePasswordUser";

import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import "./../../../css/custom_table.css";

const data = [
  {
    id: 1,
    nombre: "Nombre del usuario",
    username: "usuario1",
    dependencia: "Dependencia 1",
    cargo: "Cargo 1",
    estado: true
  },
  {
    id: 2,
    nombre: "Nombre del usuario",
    username: "usuario2",
    dependencia: "Dependencia 2",
    cargo: "Cargo 2",
    estado: true
  },
  {
    id: 3,
    nombre: "Nombre del usuario",
    username: "usuario 3",
    dependencia: "Dependencia 3",
    cargo: "Cargo 3",
    estado: true
  },
  {
    id: 4,
    nombre: "Nombre del usuario",
    username: "usuario 4",
    dependencia: "Dependencia 4",
    cargo: "Cargo 4",
    estado: true
  }
];

class TableContentUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalviewuserstate: false,
      modaledituserstate: false,
      modaldeluserstate: false,
      modalchangepassword: false
    };
  }

  accionesUsuario(cell, row) {
    return (
      <div
        className="table-menu"
        style={{ textAlign: "center", padding: "0", marginRight: "40px" }}
      >
        <button
          className="btn btn-secondary btn-sm"
          data-trigger="hover"
          onClick={() => {
            this.openModalView();
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
            this.openModalDelete();
          }}
        >
          {" "}
          <i className="fa fa-trash" />{" "}
        </button>
        &nbsp;
        <button
          className="btn btn-secondary btn-sm"
          data-trigger="hover"
          onClick={() => {
            this.openModalEdit();
          }}
        >
          <i className="fa fa-pencil" />
        </button>
        &nbsp;
        <button
          className="btn btn-warning btn-sm"
          data-hover="hover"
          onClick={() => {
            this.openModalPassword();
          }}
        >
          {" "}
          <i className="fa fa-lock" />
        </button>
      </div>
    );
  }

  openModalView() {
    this.refs.child.toggle();
  }

  openModalDelete() {
    this.refs.child2.toggle();
  }

  openModalEdit() {
    this.refs.child3.toggle();
  }

  openModalPassword() {
    this.refs.child4.toggle();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="12">
            <BootstrapTable
              pagination
              search
              searchPlaceholder="Buscar usuario"
              data={data}
              exportCSV
              hover
              bordered={false}
            >
              <TableHeaderColumn
                dataField={"id"}
                isKey
                width={50}
                dataAlign="center"
              >
                #
              </TableHeaderColumn>
              <TableHeaderColumn dataField={"nombre"} dataAlign="center">
                {" "}
                Nombre{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField={"username"} dataAlign="center">
                {" "}
                Usuario{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField={"dependencia"} dataAlign="center">
                {" "}
                Dependencia{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField={"cargo"} dataAlign="center">
                Cargo
              </TableHeaderColumn>
              <TableHeaderColumn dataField={"estado"} dataAlign="center">
                {" "}
                Estado{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                export={false}
                dataAlign="center"
                dataFormat={(cell, row) => this.accionesUsuario(cell, row)}
                style={{ border: "none" }}
              />
            </BootstrapTable>
          </Col>
        </Row>
        <ModalView modalview={this.state.modalviewuserstate} ref="child" />
        <ModalDelete modaldel={this.state.modaldeluserstate} ref="child2" />
        <ModalUpdate modaledit={this.state.modaledituserstate} ref="child3" />
        <ModalChangePassword
          modalpassword={this.state.modalchangepassword}
          ref="child4"
        />
      </div>
    );
  }
}

TableContentUser.propTypes = {};

export default TableContentUser;
