import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Row, Col } from "reactstrap";
import PropTypes from "prop-types";

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
    this.state = {};
  }

  estadoTema = (cell, row) => {
    let estado;
    if (row.estado === true) {
      estado = <div className="text-success"> Activo </div>;
    } else if (row.estado !== true) {
      estado = <div className="text-danger"> Inactivo </div>;
    }
    return estado;
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
        >
          <TableHeaderColumn isKey dataField={"id"} dataAlign="center">
            {" "}
            id{" "}
          </TableHeaderColumn>
          <TableHeaderColumn dataField={"name"} dataAlign="center">
            {" "}
            Nombre{" "}
          </TableHeaderColumn>
          <TableHeaderColumn dataField={"descripcion"} dataAlign="center">
            {" "}
            Descripcion{" "}
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField={"estado"}
            dataAlign="center"
            dataFormat={(cell, row) => this.estadoTema(cell, row)}
          >
            {" "}
            Estado{" "}
          </TableHeaderColumn>
          <TableHeaderColumn dataAlign="center"> Acciones </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

TableCotent.propTypes = {};

export default TableCotent;
