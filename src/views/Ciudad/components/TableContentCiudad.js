import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import ModalView from "./ModalViewCiudad";
import ModalEdit from "./ModalEditCiudad";
import ModalDelete from "./ModalDeleteCiudad";
import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import "./../../../css/custom_table.css";

const dataExample = [
  {
    id: 1,
    departamento: "departamento_name",
    nombre: "Colombia1",
    estado: true
  },
  {
    id: 2,
    departamento: "departamento_name",
    nombre: "Colombia2",
    estado: true
  },
  {
    id: 3,
    departamento: "departamento_name",
    nombre: "Colombia3",
    estado: true
  },
  {
    id: 4,
    departamento: "departamento_name",
    nombre: "Colombia4",
    estado: true
  },
  {
    id: 5,
    departamento: "departamento_name",
    nombre: "Colombia5",
    estado: true
  },
  {
    id: 6,
    departamento: "departamento_name",
    nombre: "Colombia6",
    estado: true
  }
];

class TableContentCiudad extends Component {
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
        <Row>
          <Col sm="12">
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
              <TableHeaderColumn dataField="departamento" dataAlign="center">
                {" "}
                Departamento{" "}
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
          </Col>
        </Row>
        <ModalView modalview={this.state.ModalViewPais} ref="child" />
        <ModalEdit modaledit={this.state.ModalEdit} ref="child3" />
        <ModalDelete modaldel={this.state.ModalDelete} ref="child2" />
      </div>
    );
  }
}

export default TableContentCiudad;
