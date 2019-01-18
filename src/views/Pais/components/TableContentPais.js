import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import ModalView from "./ModalViewPais";
import ModalEdit from "./ModalEditPais";
import ModalDelete from "./ModalDeletePais";
import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import "./../../../css/custom_table.css";

const dataExample = [
  { id: 1, codigo: 12345, nombre: "Colombia1", estado: true },
  { id: 2, codigo: 12345, nombre: "Colombia2", estado: true },
  { id: 3, codigo: 12345, nombre: "Colombia3", estado: true },
  { id: 4, codigo: 12345, nombre: "Colombia4", estado: true },
  { id: 5, codigo: 12345, nombre: "Colombia5", estado: true },
  { id: 6, codigo: 12345, nombre: "Colombia6", estado: true }
];

class TableContentPais extends Component {
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
        className="table-menu"
        style={{ textAlign: "center", padding: "0", marginRight: "85px" }}
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

  render() {
    return (
      <div className="animated fadeIn">
        <div className="col-md-12">
          <BootstrapTable
            exportCSV
            pagination
            search
            searchPlaceholder="Buscar"
            data={dataExample}
            hover
            bordered={false}
          >
            <TableHeaderColumn isKey dataField="id" width="50">
              #
            </TableHeaderColumn>
            <TableHeaderColumn dataField="codigo" dataAlign="center">
              {" "}
              Código{" "}
            </TableHeaderColumn>
            <TableHeaderColumn dataField="nombre" dataAlign="center">
              {" "}
              Nombre{" "}
            </TableHeaderColumn>
            <TableHeaderColumn dataField="estado" dataAlign="center">
              {" "}
              Estado{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
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
        <ModalDelete modaldel={this.state.ModalDelete} ref="child2" />
      </div>
    );
  }
}

export default TableContentPais;
