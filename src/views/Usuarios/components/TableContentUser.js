import React, { Component } from "react";
import PropTypes from "prop-types";
import { TableHeaderColumn, BootstrapTable } from "react-bootstrap-table";
import { Row, Col } from "reactstrap";
import ModalView from "./ModalViewUser";
import ModalDelete from "./ModalDeleteUser";
import ModalUpdate from "./ModalEditUser";
import ModalChangePassword from "./FormChangePasswordUser";
import "./../../../css/styleTableUsuarios.css";
import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import Moment from "react-moment";

class TableContentUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalviewuserstate: false,
      modaledituserstate: false,
      modaldeluserstate: false,
      modalchangepassword: false,
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
      <div className="table-actionMenuUsu" style={{ marginRight: "65px" }}>
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
            this.openModalEdit();
          }}
        >
          <i className="fa fa-pencil" />
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

  UsuarioStatus(cell, row) {
    let status;
    if (row.enabled === true) {
      status = <p className="text-success">ACTIVO</p>;
    } else if (row.enabled !== true) {
      status = <p className="text-danger">INACTIVO</p>;
    }
    return status;
  }

  openModalView(id) {
    this.refs.child.toggle(id);
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
    function indexN(cell, row, enumObject, index) {
      return <div>{index + 1}</div>;
    }

    const dependenceFormatter = data => {
      return !data ? null : `<div>${data.name}</div>`;
    };

    const chargeFormatter = data => {
      return !data ? null : `<div>${data.name}</div>`;
    };

    const DateFormat = data => {
      return <Moment format="YYYY/MM/DD">{data}</Moment>;
    };

    console.log(this.state.dataUsers);

    return (
      <div className="animated fadeIn">
        <Col sm="12">
          <BootstrapTable
            pagination
            search
            searchPlaceholder="Buscar"
            data={this.state.dataUsers}
            exportCSV
            hover
            striped
            bordered={false}
            className="tableUsu texto-Usu"
            // headerStyle={{ height: "px" }}
          >
            <TableHeaderColumn
              export={false}
              isKey
              dataField={"id"}
              hidden={this.state.hiddenColumnID}
            />
            <TableHeaderColumn
              dataField={"id"}
              width={"20"}
              dataAlign="center"
              dataFormat={indexN}
            >
              #
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField={"name"}
              dataAlign="center"
              width={"100"}
            >
              Nombre
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField={"username"}
              dataAlign="center"
              width={"90"}
            >
              Usuario
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField={"dependence"}
              dataAlign="center"
              width={"70"}
              dataFormat={dependenceFormatter}
            >
              {" "}
              Dependencia{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField={"charge"}
              dataAlign="center"
              width={"70"}
              dataFormat={chargeFormatter}
            >
              Cargo
            </TableHeaderColumn>
            <TableHeaderColumn
              width={"100"}
              dataField={"createdAt"}
              dataAlign="center"
              dataFormat={DateFormat}
            >
              {" "}
              Fecha de creacrion{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              width={"70"}
              dataField={"enabled"}
              dataAlign="center"
              dataFormat={(cell, row) => this.UsuarioStatus(cell, row)}
            >
              {" "}
              Estado{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              width={"190"}
              export={false}
              dataAlign="center"
              dataFormat={(cell, row) => this.accionesUsuario(cell, row)}
              style={{ border: "none" }}
            >
              Acciones
            </TableHeaderColumn>
          </BootstrapTable>
        </Col>

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
