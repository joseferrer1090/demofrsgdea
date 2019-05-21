import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import ModalViewTheme from "./ModalViewTema";
import ModalEditTheme from "./ModalEditTheme";
import ModalDisabledTheme from "./ModalDisabledTheme";
import "./../../../css/styleTableTema.css"
import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
const dataExample = [
  {
    id: 1,
    name: "Tema 1",
    descripcion: "Descripcion del tema",
    estado: true
  },
  {
    id: 2,
    name: "Tema 2",
    descripcion: "Descripcion del tema",
    estado: true
  },
  {
    id: 3,
    name: "Tema 3",
    descripcion: "Descripcion del tema",
    estado: false
  },
  {
    id: 4,
    name: "Tema 4",
    descripcion: "Descripcion del tema",
    estado: true
  },
  {
    id: 5,
    name: "Tema 5",
    descripcion: "Descripcion del tema",
    estado: false
  }
];

class TableCotent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalview: false,
      modaledit: false,
      modaldisabled: false
    };
  }

  accionesTemas = (cell, row) => {
    return (
      <div className="table-actionMenuTema" style={{marginRight:"100px"}}>
        <button
          className="btn btn-secondary btn-sm"
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
          onClick={() => {
            this.openModalEdit();
          }}
        >
          {" "}
          <i className="fa fa-pencil" />{" "}
        </button>
        &nbsp;
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            this.openModalDisabled();
          }}
        >
          {" "}
          <i className="fa fa-trash" />{" "}
        </button>
      </div>
    );
  };

  estadoTema = (cell, row) => {
    let estado;
    if (row.estado === true) {
      estado = <div className="text-success"> Activo </div>;
    } else if (row.estado !== true) {
      estado = <div className="text-danger"> Inactivo </div>;
    }
    return estado;
  };

  openModalView = () => {
    this.refs.child.toggle();
  };

  openModalEdit = () => {
    this.refs.child2.toggle();
  };

  openModalDisabled = () => {
    this.refs.child3.toggle();
  };

  render() {
    return (
      <div className="animated fadeIn">
        <BootstrapTable
          data={dataExample}
          bordered={false}
          hover
          striped
          pagination
          search
          searchPlaceholder={"Buscar"}
          className="tableTema texto-Tema"
        >
          <TableHeaderColumn isKey dataField={"id"} dataAlign="center" width={"100"}>
            {" "}
            Id{" "}
          </TableHeaderColumn>
          <TableHeaderColumn dataField={"name"} dataAlign="center" width={"200"}>
            {" "}
            Nombre{" "}
          </TableHeaderColumn>
          <TableHeaderColumn dataField={"descripcion"} dataAlign="center" width={"300"}>
            {" "}
            Descripcion{" "}
          </TableHeaderColumn>
          <TableHeaderColumn
          width={"200"}
            dataField={"estado"}
            dataAlign="center"
            dataFormat={(cell, row) => this.estadoTema(cell, row)}
          >
            {" "}
            Estado{" "}
          </TableHeaderColumn>
          <TableHeaderColumn
            dataAlign="center"
            dataFormat={(cell, row) => this.accionesTemas(cell, row)}
          >
            {" "}
            Acciones{" "}
          </TableHeaderColumn>
        </BootstrapTable>
        <ModalViewTheme modalview={this.state.modalview} ref={"child"} />
        <ModalEditTheme modaledit={this.state.modaledit} ref={"child2"} />
        <ModalDisabledTheme
          modaldisabled={this.state.modaldisabled}
          ref={"child3"}
        />
      </div>
    );
  }
}

TableCotent.propTypes = {};

export default TableCotent;
