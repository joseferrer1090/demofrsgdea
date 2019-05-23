import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import ModalView from "./ViewCargoModal";
import ModalEdit from "./ModalEditCargo";
import ModalDel from "./ModalDeleteCargo";
import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import "./../../../css/styleTableCargo.css";
const dataExample = [
  {
    id: 1,
    codigo: 1233455,
    nombre: "Cargo 1",
    descripcion: "Descripcion del cargo 1",
    estado: true,
    observacion: ""
  },
  {
    id: 2,
    codigo: 23324345,
    nombre: "Cargo 2",
    descripcion: "Descripcion del cargo 2",
    estado: true,
    observacion: ""
  },
  {
    id: 3,
    codigo: 34434545,
    nombre: "Cargo 3",
    descripcion: "Descripcion del cargo 3",
    estado: true,
    observacion: ""
  },
  {
    id: 4,
    codigo: 34567890,
    nombre: "Cargo 3",
    descripcion: "Descripcion del cargo 4",
    estado: false,
    observacion: ""
  },
  {
    id: 5,
    codigo: 9987767,
    nombre: "Cargo 5",
    descripcion: "Descripcion del cargo 5",
    estado: false,
    observacion: ""
  },
  {
    id: 6,
    codigo: 998776,
    nombre: "Cargo 6",
    descripcion: "Descripcion del cargo 6",
    estado: true,
    observacion: ""
  },
  {
    id: 7,
    codigo: 998776,
    nombre: "Cargo 7",
    descripcion: "Descripcion del cargo 7",
    estado: true,
    observacion: ""
  }
];

class TableContentCargo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalview: false,
      modaledit: false,
      modaldelete: false
    };
  }

  CargoStatus = (cell, row) => {
    let status;
    if (row.estado === true) {
      status = <b className="text-success">ACTIVO</b>;
    } else if (row.estado === false) {
      status = <b className="text-danger">INACTIVO</b>;
    }
    return status;
  };

  accionesCargo(cell, row) {
    return (
      <div
        className="table-actionMenuCargo"
        style={{ textAlign: "center", padding: "0", marginRight: "105px" }}
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
      </div>
    );
  }

  openModalView() {
    this.refs.child1.toggle();
  }

  openModalEdit() {
    this.refs.child2.toggle();
  }

  openModalDelete() {
    this.refs.child3.toggle();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Col md="12">
          <BootstrapTable
            striped
            hover
            search
            searchPlaceholder="Buscar"
            data={dataExample}
            exportCSV
            pagination
            bordered={false}
            className="tableCargo texto-Cargo"
            // headerStyle={{ height: "55px" }}
          >
            <TableHeaderColumn
              dataAlign="center"
              dataField={"id"}
              isKey
              width={50}
            >
              #
            </TableHeaderColumn>
            <TableHeaderColumn
              dataAlign="center"
              dataField="codigo"
              width={100}
            >
              {" "}
              Código{" "}
            </TableHeaderColumn>
            <TableHeaderColumn dataAlign="center" dataField="nombre" width={"100"}>
              Nombre
            </TableHeaderColumn>

            <TableHeaderColumn
              dataAlign="center"
              dataField="descripcion"
              width={200}
            >
              {" "}
              Descripción{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataAlign="center"
              dataField="estado"
              dataFormat={(cell, row) => this.CargoStatus(cell, row)}
              width="100"
            >
              {" "}
              Estado{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
            width={"200"}
            export={false}
              dataAlign="center"
              dataFormat={(cell, row) => this.accionesCargo(cell, row)}
            >
              {" "}
              Acciones{" "}
            </TableHeaderColumn>
          </BootstrapTable>
        </Col>
        <ModalView modalviewcargo={this.state.modalview} ref="child1" />
        <ModalEdit modaleditcargo={this.state.modaledit} ref="child2" />
        <ModalDel modaldelete={this.state.modaldelete} ref="child3" />
      </div>
    );
  }
}

export default TableContentCargo;
