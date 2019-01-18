import React, { Component } from "react";
import PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Row, Col } from "reactstrap";
import ModalEdit from "./ModalEditSedes";
import ModalView from "./ModalViewSedes";
import ModalDelete from "./ModalDeleteSedes";
import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import "./../../../css/custom_table.css";

const dataExample = [
  {
    id: 1,
    empresa: "empresa1",
    codigo: 123456890,
    nombre: "Sede1",
    estado: true
  },
  {
    id: 2,
    empresa: "empresa2",
    codigo: 123645879,
    nombre: "Sede2",
    estado: false
  },
  {
    id: 3,
    empresa: "empresa3",
    codigo: 13648579,
    nombre: "Sede3",
    estado: true
  },
  {
    id: 4,
    empresa: "empresa4",
    codigo: 126547896,
    nombre: "Sede4",
    estado: true
  },
  {
    id: 5,
    empresa: "empresa5",
    codigo: 165478960,
    nombre: "Sede5",
    estado: false
  }
];

class TableContentSedes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalView: false,
      modalEdit: false,
      modalDel: false
    };
  }

  accionesSedes = (cell, row) => {
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

  openModalView = () => {
    this.refs.child.toggle();
  };

  openModalEdit = () => {
    this.refs.child2.toggle();
  };

  openModalDelete = () => {
    this.refs.child3.toggle();
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="12">
            <div className="">
              <BootstrapTable
                data={dataExample}
                search
                hover
                pagination
                bordered={false}
                searchPlaceholder={"Buscar"}
                exportCSV
              >
                <TableHeaderColumn
                  width={"30"}
                  dataField={"id"}
                  isKey
                  dataAlign="center"
                >
                  #
                </TableHeaderColumn>
                <TableHeaderColumn dataAlign="center" dataField={"empresa"}>
                  Empresa
                </TableHeaderColumn>
                <TableHeaderColumn dataAlign="center" dataField={"codigo"}>
                  Código
                </TableHeaderColumn>
                <TableHeaderColumn dataAlign="center" dataField={"nombre"}>
                  Nombre
                </TableHeaderColumn>
                <TableHeaderColumn dataAlign="center" dataField={"estado"}>
                  Estado
                </TableHeaderColumn>
                <TableHeaderColumn
                  export={false}
                  dataAlign="center"
                  dataFormat={(cell, row) => this.accionesSedes(cell, row)}
                  style={{ border: "none" }}
                />
              </BootstrapTable>
            </div>
          </Col>
        </Row>
        <ModalView modalview={this.state.modalView} ref="child" />
        <ModalEdit modaledit={this.state.modalEdit} ref="child2" />
        <ModalDelete modaldel={this.state.modalDel} ref="child3" />
      </div>
    );
  }
}

TableContentSedes.propTypes = {};

export default TableContentSedes;
