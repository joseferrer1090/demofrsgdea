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
    pais: "pais_nombre",
    departamento: "departamento_name",
    nombre: "Ciudad_nombre",
    estado: true,
    codigo:1078
  },
  {
    id: 2,
    pais: "pais_nombre",
    departamento: "departamento_name",
    nombre: "Ciudad_nombre",
    estado: true,
    codigo:1012
  },
  {
    id: 3,
    pais: "pais_nombre",
    departamento: "departamento_name",
    nombre: "Ciudad_nombre",
    estado: true,
    codigo:1021
  },
  {
    id: 4,
    pais: "pais_nombre",
    departamento: "departamento_name",
    nombre: "Ciudad_nombre",
    estado: false,
    codigo:1028
  },
  {
    id: 5,
    pais: "pais_nombre",
    departamento: "departamento_name",
    nombre: "Ciudad_nombre",
    estado: true,
    codigo:1078
  },
  {
    id: 6,
    pais: "pais_nombre",
    departamento: "departamento_name",
    nombre: "Ciudad_nombre",
    estado: true,
    codigo:1096
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
  EstadoEmpresa(cell, row) {
    let status;
    if (row.estado === true) {
      status = <b className="text-success">Activo</b>;
    } else if (row.estado !== true) {
      status = <b className="text-danger">Desactivo</b>;
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
            searchPlaceholder="Buscar"
            data={dataExample}
            hover
            bordered={false}
          >
            <TableHeaderColumn isKey dataField="id" width="50">
              #
            </TableHeaderColumn>
            <TableHeaderColumn dataField="pais" dataAlign="center">
              {" "}
              País{" "}
            </TableHeaderColumn>

            <TableHeaderColumn dataField="departamento" dataAlign="center">
              {" "}
              Departamento{" "}
            </TableHeaderColumn>
            <TableHeaderColumn dataField="codigo" dataAlign="center">
              {" "}
              Código{" "}
            </TableHeaderColumn>
            <TableHeaderColumn dataField="nombre" dataAlign="center">
              {" "}
              Nombre{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataSort={true}
              dataField={"estado"}
              dataAlign="center"
              dataFormat={(cell, row) => this.EstadoEmpresa(cell, row)}
            >
              Estado
            </TableHeaderColumn>
            <TableHeaderColumn
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
        <ModalDelete modaldel={this.state.ModalDelete} ref="child2" />
      </div>
    );
  }
}

export default TableContentCiudad;
