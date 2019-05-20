import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import ModalView from "./ModalViewDepartamento";
import ModalEdit from "./ModalEditDepartamento";
import ModalDelete from "./ModalDeleteDepartamento";
import "./../../../css/styleTableDepartamento.css";

const dataExample = [
  {
    id: 1,
    codigo: 12345,
    pais: "pais_name",
    nombre: "Colombia1",
    estado: true
  },
  {
    id: 2,
    codigo: 12345,
    pais: "pais_name",
    nombre: "Colombia2",
    estado: true
  },
  {
    id: 3,
    codigo: 12345,
    pais: "pais_name",
    nombre: "Colombia3",
    estado: true
  },
  {
    id: 4,
    codigo: 12345,
    pais: "pais_name",
    nombre: "Colombia4",
    estado: true
  },
  {
    id: 5,
    codigo: 12345,
    pais: "pais_name",
    nombre: "Colombia5",
    estado: true
  },
  { id: 6, codigo: 12345, pais: "pais_name", nombre: "Colombia6", estado: true }
];

class TableContentDepartamento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalViewPais: false,
      ModalEdit: false,
      ModalDel: false
    };
  }

  accionesPais(cell, row) {
    return (
      <div
        className="table-actionMenuDepto"
        style={{ textAlign: "center", padding: "0", marginRight: "65px" }}
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
    this.refs.child.toggle();
  }

  openModalEdit() {
    this.refs.child3.toggle();
  }

  openModalDelete() {
    this.refs.child2.toggle();
  }

 DepartamentoStatus(cell, row) {
    let status;
    if (row.estado === true) status = <b className="text-success">ACTIVO</b>;
    else if (row.estado === false) {
      status = <b className="text-danger">INACTIVO</b>;
    }
    return status;
  }

  render() {
    return (
      <div className="animated fadeIn">
        <div className="col-md-12">
          <BootstrapTable
            exportCSV
            pagination
            search
            striped
            searchPlaceholder="Buscar"
            data={dataExample}
            hover
            bordered={false}
            className="tableDepto texto-Depto"
          >
            <TableHeaderColumn isKey dataField="id" dataAlign="center" width={"80"}>
              #
            </TableHeaderColumn>
            <TableHeaderColumn dataField="pais" dataAlign="center" width={"130"}>
              {" "}
              País{" "}
            </TableHeaderColumn>
            <TableHeaderColumn dataField="codigo" dataAlign="center" width={"130"}>
              {" "}
              Código{" "}
            </TableHeaderColumn>
            <TableHeaderColumn dataField="nombre" dataAlign="center" width={"250"}>
              {" "}
              Nombre{" "}
            </TableHeaderColumn>
            <TableHeaderColumn dataField="estado" dataAlign="center"
            dataFormat={(cell, row) => this.DepartamentoStatus(cell, row)}>
              {" "}
              Estado{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
            width={"200"}
            export={false}
              dataAlign="center"
              dataFormat={(cel, row) => this.accionesPais(cel, row)}
            >
              {" "}
              Acciones{" "}
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
        <ModalView modalview={this.state.ModalViewPais} ref="child" />
        <ModalEdit modaledit={this.state.ModalEdit} ref="child3" />
        <ModalDelete modaldel={this.state.ModalDel} ref="child2" />
      </div>
    );
  }
}

export default TableContentDepartamento;
