import React, { Component } from "react";
import PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import ModalView from "./ModalViewEmpresa";
import ModalEdit from "./ModalEditEmpresa";
import ModalDel from "./ModalDeleteEmpresa";
import { Row, Col } from "reactstrap";
import "./../../../css/styleTableEmpresa.css";

const data = [
  {
    id: 1,
    conglomerado: "Conglomerado 1",
    codigo: "EMP01",
    nit: "1234568870",
    nombre: "Empresa 1",
    estado: true
  },
  {
    id: 2,
    conglomerado: "Conglomerado 3",
    codigo: "EMP02",
    nit: "1234687950",
    nombre: "Empresa 2",
    estado: false
  },
  {
    id: 3,
    conglomerado: "Conglomerado 1",
    codigo: "EMP03",
    nit: "1235879640",
    nombre: "Empresa 3",
    estado: true
  },
  {
    id: 4,
    conglomerado: "Conglomerado 2",
    codigo: "EMP04",
    nit: "123794650",
    nombre: "Empesa 4",
    estado: false
  }
];

class TableContentEmpresa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalview: false,
      modaledit: false,
      modaldel: false
    };
  }

  accionesEmpresa = (cel, row) => {
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

  EstadoEmpresa(cell, row) {
    let status;
    if (row.estado === true) {
      status = <b className="text-success">Activo</b>;
    } else if (row.estado !== true) {
      status = <b className="text-danger">Desactivo</b>;
    }
    return status;
  }

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
        <Col md="12">
          <BootstrapTable
            data={data}
            pagination={true}
            search={true}
            exportCSV
            hover
            striped
            bordered={false}
            searchPlaceholder="Buscar"
            className="tableEmpre tableEmpre1 texto-Empre"
          >
            <TableHeaderColumn
              dataSort={true}
              isKey
              dataField={"id"}
              width={"50"}
              dataAlign="center"
            >
              #
            </TableHeaderColumn>
            <TableHeaderColumn
            width={"200"}
              dataSort={true}
              dataField={"conglomerado"}
              dataAlign="center"
            >
              Conglomerado
            </TableHeaderColumn>
            <TableHeaderColumn
            width={"180"}
              dataSort={true}
              dataField={"codigo"}
              dataAlign="center"
            >
              Código
            </TableHeaderColumn>
            <TableHeaderColumn
            width={"200"}
              dataSort={true}
              dataField={"nit"}
              dataAlign="center"
            >
              Nit
            </TableHeaderColumn>
            <TableHeaderColumn
              dataSort={true}
              dataField={"nombre"}
              dataAlign="center"
            >
              Nombre
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
            width={"190"}
              export={false}
              dataAlign="center"
              dataFormat={(cell, row) => this.accionesEmpresa(cell, row)}
              style={{ border: "none" }}
            >
              Acciones
            </TableHeaderColumn>
          </BootstrapTable>
        </Col>

        <ModalView modalviewempesa={this.state.modalview} ref={"child"} />
        <ModalEdit modaleditempresa={this.state.modaledit} ref={"child2"} />
        <ModalDel modaldelempresa={this.state.modaldel} ref="child3" />
      </div>
    );
  }
}

TableContentEmpresa.propTypes = {};

export default TableContentEmpresa;
