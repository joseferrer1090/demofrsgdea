import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Row, Col } from "reactstrap";
import ModalView from "./ModalViewRoles";
import ModalDelete from "./ModalDeleteRoles";
import ModalEdit from "./ModalEditRoles";
import ModalPermission from "./ModalEditPermissionRoles";

const dataExample = [
  {
    id: 1,
    codigo: "rol1",
    nombre: "rol_nombre",
    descripcion: "descripcion general del rol",
    estado: true
  },
  {
    id: 2,
    codigo: "rol2",
    nombre: "rol_nombre",
    descripcion: "descripcion general del rol",
    estado: false
  },
  {
    id: 3,
    codigo: "rol3",
    nombre: "rol_nombre",
    descripcion: "descripcion general del rol",
    estado: true
  },
  {
    id: 4,
    codigo: "rol4",
    nombre: "rol_nombre",
    descripcion: "descripcion general del rol",
    estado: false
  },
  {
    id: 5,
    codigo: "rol5",
    nombre: "rol_nombre",
    descripcion: "descripcion general del rol",
    estado: true
  },
  {
    id: 6,
    codigo: "rol6",
    nombre: "rol_nombre",
    descripcion: "descripcion general del rol",
    estado: false
  },
  {
    id: 7,
    codigo: "rol7",
    nombre: "rol_nombre",
    descripcion: "descripcion general del rol",
    estado: true
  },
  {
    id: 8,
    codigo: "rol8",
    nombre: "rol_nombre",
    descripcion: "descripcion general del rol",
    estado: false
  },
  {
    id: 9,
    codigo: "rol9",
    nombre: "rol_nombre",
    descripcion: "descripcion general del rol",
    estado: true
  },
  {
    id: 10,
    codigo: "rol10",
    nombre: "rol_nombre",
    descripcion: "descripcion general del rol",
    estado: true
  }
];

class TableContentRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalview: false,
      modaldel: false,
      modaledit: false,
      modalpermission: false
    };
  }

  EstadoRoles(cell, row) {
    let status;
    if (row.estado === true) {
      status = <p className="text-success"> Activo </p>;
    } else if (row.estado !== true) {
      status = <p className="text-danger"> Inactivo </p>;
    }
    return status;
  }

  accionesRoles(cel, row) {
    return (
      <div
        className="table-menu"
        style={{ textAlign: "center", padding: "0", marginRight: "45px" }}
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
          className="btn btn-warning btn-sm"
          onClick={() => {
            this.openModalPermission();
          }}
        >
          <i className="fa fa-lock" />
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

  openModalEdit() {
    this.refs.child2.toggle();
  }

  openModalPermission() {
    this.refs.child4.toggle();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <div className="col-md-12">
          <BootstrapTable
            data={dataExample}
            search
            searchPlaceholder="Buscar"
            pagination
            bordered={false}
            hover
            striped
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
            <TableHeaderColumn dataField="descripcion" dataAlign="center">
              {" "}
              Descripción{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="estado"
              dataAlign="center"
              dataFormat={(cell, row) => this.EstadoRoles(cell, row)}
            >
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
        </div>

        <ModalView modalviewroles={this.state.modalview} ref="child" />
        <ModalEdit modaledit={this.state.modaledit} ref="child2" />
        <ModalDelete modaldelete={this.state.modaldel} ref="child3" />
        <ModalPermission
          modaleditpermission={this.state.modalpermission}
          ref="child4"
        />
      </div>
    );
  }
}

export default TableContentRoles;
