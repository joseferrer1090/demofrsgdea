import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import ModalView from "./ModalViewGrupo";
import ModalDelete from "./ModalDeleteGrupo";
import ModalEdit from "./ModalEditGrupo";
import "./../../../css/custom_table.css";

const dataExample = [
  { id: 1, codigo: "gp1", nombre: "grupo_nombre", estado: true },
  { id: 2, codigo: "gp2", nombre: "grupo_nombre", estado: true },
  { id: 3, codigo: "gp3", nombre: "grupo_nombre", estado: true },
  { id: 4, codigo: "gp4", nombre: "grupo_nombre", estado: true },
  { id: 5, codigo: "gp5", nombre: "grupo_nombre", estado: true },
  { id: 6, codigo: "gp6", nombre: "grupo_nombre", estado: true },
  { id: 7, codigo: "gp7", nombre: "grupo_nombre", estado: true },
  { id: 8, codigo: "gp8", nombre: "grupo_nombre", estado: true },
  { id: 9, codigo: "gp9", nombre: "grupo_nombre", estado: true },
  { id: 10, codigo: "gp10", nombre: "grupo_nombre", estado: true }
];

class TableContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalview: false,
      modaledit: false,
      modaldelete: false
    };
  }

  accionesGrupo = (cel, row) => {
    return (
      <div
        className="table-menu"
        style={{ textAlign: "center", padding: "0", marginRight: "60px" }}
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
  };

  EstadoGrupo(cell, row) {
    let status;
    if (row.estado === true) {
      status = <p className="text-success"> Activo </p>;
    } else if (row.estado !== true) {
      status = <p className="text-danger"> Inactivo </p>;
    }
    return status;
  }

  openModalView = () => {
    this.refs.child.toggle();
  };

  openModalEdit = () => {
    this.refs.child3.toggle();
  };

  openModalDelete = () => {
    this.refs.child2.toggle();
  };
  render() {
    return (
      <div className="animated fadeIn">
        <Col md="12">
          <BootstrapTable
            data={dataExample}
            bordered={false}
            hover
            striped
            search
            searchPlaceholder="Buscar"
            exportCSV
            pagination
          >
            <TableHeaderColumn
              isKey
              dataField="id"
              dataAlign="center"
              width="50"
            >
              {" "}
              #{" "}
            </TableHeaderColumn>
            <TableHeaderColumn dataField="codigo" dataAlign="center">
              {" "}
              Codigo{" "}
            </TableHeaderColumn>
            <TableHeaderColumn dataField="nombre" dataAlign="center">
              {" "}
              Nombre{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="estado"
              dataAlign="center"
              dataFormat={(cell, row) => this.EstadoGrupo(cell, row)}
            >
              {" "}
              Estado{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataFormat={(cell, row) => this.accionesGrupo(cell, row)}
              dataAlign="center"
            >
              {" "}
              Acciones{" "}
            </TableHeaderColumn>
          </BootstrapTable>
        </Col>
        <ModalView modalview={this.state.modalview} ref="child" />
        <ModalDelete modaldel={this.state.modaldelete} ref="child2" />
        <ModalEdit modaledit={this.state.modaledit} ref="child3" />
      </div>
    );
  }
}

export default TableContent;
