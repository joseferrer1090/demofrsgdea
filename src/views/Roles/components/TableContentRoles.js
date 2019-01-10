import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Row, Col } from "reactstrap";
import ModalView from "./ModalViewRoles";
import ModalDelete from "./ModalDeleteRoles";

const dataExample = [
  { id: 1, codigo: "rol1", nombre: "rol_nombre", estado: true },
  { id: 2, codigo: "rol2", nombre: "rol_nombre", estado: false },
  { id: 3, codigo: "rol3", nombre: "rol_nombre", estado: true },
  { id: 4, codigo: "rol4", nombre: "rol_nombre", estado: false },
  { id: 5, codigo: "rol5", nombre: "rol_nombre", estado: true },
  { id: 6, codigo: "rol6", nombre: "rol_nombre", estado: false },
  { id: 7, codigo: "rol7", nombre: "rol_nombre", estado: true },
  { id: 8, codigo: "rol8", nombre: "rol_nombre", estado: false },
  { id: 9, codigo: "rol9", nombre: "rol_nombre", estado: true },
  { id: 10, codigo: "rol10", nombre: "rol_nombre", estado: true }
];

class TableContentRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalview: false,
      modaldel: false
    };
  }

  accionesRoles(cel, row) {
    return (
      <div
        className="table-menu"
        style={{ textAlign: "center", padding: "0", marginRight: "60px" }}
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

  openModalView() {
    this.refs.child.toggle();
  }

  openModalDel() {
    this.refs.child3.toggle();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="12">
            <BootstrapTable
              data={dataExample}
              search
              searchPlaceholder="Buscar"
              pagination
              bordered={false}
              hover
              exportCSV
            >
              <TableHeaderColumn
                isKey
                dataField="id"
                dataAlign="center"
                width={"50"}
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
              <TableHeaderColumn dataField="estado" dataAlign="center">
                {" "}
                Estado{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                dataAlign="center"
                dataFormat={(cell, row) => this.accionesRoles(cell, row)}
              >
                {" "}
                Acciones{" "}
              </TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
        <ModalView modalviewroles={this.state.modalview} ref="child" />
        <ModalDelete modaldelete={this.state.modaldel} ref="child3" />
      </div>
    );
  }
}

export default TableContentRoles;
