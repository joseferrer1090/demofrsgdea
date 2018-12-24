import React, { Component } from "react";
import PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Row, Col } from "reactstrap";
import ModalView from "./ModalViewDependencia";
import ModalEdit from "./ModalEditDependencia";
import ModalDelete from "./ModalDeleteDependencia";
import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import "./../../../css/custom_table.css";

const dataExample = [
  {
    id: 1,
    codigo: 123649785,
    nombre: "Dependencia 1",
    rol_responsable: "Administrador",
    sede: "sede 1",
    estado: true
  },
  {
    id: 2,
    codigo: 123546879,
    nombre: "Dependencia 2",
    rol_responsable: "Administador 2",
    sede: "sede 2",
    estado: true
  },
  {
    id: 3,
    codigo: 123645879,
    nombre: "Dependencia 3 ",
    rol_responsable: "Administrador 3",
    sede: "Sede 3",
    estado: true
  },
  {
    id: 4,
    codigo: 123546879,
    nombre: "Dependencia 4 ",
    rol_responsable: "Administrador 4",
    sede: "Sede 4",
    estado: true
  },
  {
    id: 5,
    codigo: 123546879,
    nombre: "Dependencia 5",
    rol_responsable: "Administrador 5",
    sede: "Sede 5",
    estado: true
  }
];

class TableContentDependencia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalviewstate: false,
      modaleditstate: false,
      modaldelstate: false
    };
  }
  accionesDependencias(cell, row) {
    return (
      <div
        className="table-menu"
        style={{ textAlign: "center", padding: "0", marginRight: "100px" }}
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
      </div>
    );
  }

  openModalView() {
    this.refs.child1.toggle();
  }

  openModalDelete() {
    this.refs.child3.toggle();
  }

  openModalEdit() {
    this.refs.child2.toggle();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="12">
            <BootstrapTable
              search={true}
              searchPlaceholder={"Buscar"}
              pagination={true}
              data={dataExample}
              exportCSV
              bordered={false}
              hover
            >
              <TableHeaderColumn isKey dataField={"id"} width="100">
                {" "}
                #{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField={"codigo"}>
                {" "}
                Codigo{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField={"nombre"}>Nombre</TableHeaderColumn>
              <TableHeaderColumn dataField={"rol_responsable"}>
                {" "}
                Rol respondable{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField={"sede"}> Sede </TableHeaderColumn>
              <TableHeaderColumn dataField={"estado"}>Estado</TableHeaderColumn>
              <TableHeaderColumn
                dataFormat={(cell, row) => this.accionesDependencias(cell, row)}
              >
                {" "}
                Acciones{" "}
              </TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
        <ModalView modalView={this.state.modalviewstate} ref="child1" />
        <ModalEdit modalEdit={this.state.modaleditstate} ref="child2" />
        <ModalDelete modalDel={this.state.modaldelstate} ref="child3" />
      </div>
    );
  }
}

TableContentDependencia.propTypes = {};

export default TableContentDependencia;
