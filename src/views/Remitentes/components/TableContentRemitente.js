import React, { Component } from "react";
import PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Row, Col } from "reactstrap";
import ModalView from "./ModalViewRemitente";
import ModalUpdate from "./ModalUpdateRemitente";
import ModalDel from "./ModalDeleteRemitente";
import "./../../../css/styleTableRemitente.css";
import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
const dataExample = [
  {
    id: 1,
    identificacion: 12315468,
    nombre: "Remitente 1",
    email: "remitente@remitente.com",
    estado: true
  },
  {
    id: 2,
    identificacion: 1231634568,
    nombre: "Remitente 2",
    email: "remitente2@remitente2.com",
    estado: true
  },
  {
    id: 3,
    identificacion: 123165485,
    nombre: "Remitente 3",
    email: "remitente3@remitente3.com",
    estado: false
  },
  {
    id: 4,
    identificacion: 132165468,
    nombre: "Remitente 4",
    email: "remitente4@remitente4.com",
    estado: false
  }
];

class TableContentRemitente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalViewRemitente: false,
      modalUpdateRemitente: false,
      modalDeleteRemitente: false
    };
  }

  accionesRemitente(cel, row) {
    return (
      <div
        className="table-actionMenuRemi"
        style={{ textAlign: "center", padding: "0", marginRight: "65px" }}
      >
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => {
            this.openModalView();
          }}
        >
          <i className="fa fa-eye" />
        </button>
        &nbsp;
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => {
            this.openModalEdit();
          }}
        >
          <i className="fa fa-pencil" />
        </button>
        &nbsp;
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            this.openModalDel();
          }}
        >
          <i className="fa fa-trash" />
        </button>
      </div>
    );
  }

  EstadoRemitente(cell, row) {
    let status;
    if (row.estado === true) {
      status = <p className="text-success"> Activo </p>;
    } else if (row.estado !== true) {
      status = <p className="text-danger"> Inactivo </p>;
    }
    return status;
  }

  openModalView() {
    this.refs.child.toggle();
  }

  openModalDel() {
    this.refs.child2.toggle();
  }

  openModalEdit() {
    this.refs.child3.toggle();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Col sm="12">
          <BootstrapTable
            data={dataExample}
            pagination
            search
            searchPlaceholder="Buscar"
            hover
            striped
            bordered={false}
            exportCSV
            className="tableRemi texto-Remi"
          >
            <TableHeaderColumn
              isKey
              dataField={"id"}
              dataAlign="center"
             width={"80"}
            >
              #
            </TableHeaderColumn>
            <TableHeaderColumn dataField={"identificacion"} dataAlign="center" width={"110"}>
              {" "}
              Identificación{" "}
            </TableHeaderColumn>
            <TableHeaderColumn dataField={"nombre"} dataAlign="center" width={"200"}>
              {" "}
              Nombre{" "}
            </TableHeaderColumn>
            <TableHeaderColumn dataField={"email"} dataAlign="center" width={"200"}>
              {" "}
              Email{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField={"estado"}
              dataAlign="center"
              dataFormat={(cell, row) => this.EstadoRemitente(cell, row)}
            >
              {" "}
              Estado{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
            width={"200"}
              export={false}
              dataAlign="center"
              dataFormat={(cell, row) => this.accionesRemitente(cell, row)}
              style={{ border: "none" }}
            >
              {" "}
              Acciones{" "}
            </TableHeaderColumn>
          </BootstrapTable>
        </Col>

        <ModalView modalview={this.state.modalViewRemitente} ref="child" />
        <ModalDel modaldel={this.state.modalDeleteRemitente} ref="child2" />
        <ModalUpdate
          modalupdate={this.state.modalUpdateRemitente}
          ref="child3"
        />
      </div>
    );
  }
}

TableContentRemitente.propTypes = {};

export default TableContentRemitente;
