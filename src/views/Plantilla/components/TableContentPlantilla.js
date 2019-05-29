import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Row, Col } from "reactstrap";
import PropTypes from "prop-types";

const dataExample = [
  {
    id: 1,
    codigo: 1,
    nombre: "Plantilla 1",
    descripcion: "descripcion plantilla",
    estado: true
  },
  {
    id: 2,
    codigo: 2,
    nombre: "Plantilla 2",
    descripcion: "descripcion plantilla",
    estado: false
  },
  {
    id: 3,
    codigo: 3,
    nombre: "Planitlla 3",
    descripcion: "descripcion plantilla",
    estado: true
  },
  {
    id: 4,
    codigo: 3,
    nombre: "Plantilla 4",
    descripcion: "descripcion plantilla",
    estado: false
  }
];

class TableContentPlantilla extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="12">
            <BootstrapTable
              data={dataExample}
              bordered={false}
              hover
              striped
              search
              searchPlaceholder="Buscar"
              exportCSV
              pagination
              className=""
            >
              <TableHeaderColumn
                isKey
                dataField="id"
                dataAlign="center"
                width={"100"}
              >
                {" "}
                #{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="codigo"
                dataAlign="center"
                width={"200"}
              >
                {" "}
                Codigo{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="nombre"
                dataAlign="center"
                width={"250"}
              >
                {" "}
                Nombre{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                width={"200"}
                dataField="estado"
                dataAlign="center"
              >
                {" "}
                Estado{" "}
              </TableHeaderColumn>
              <TableHeaderColumn export={false} dataAlign="center">
                {" "}
                Acciones{" "}
              </TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
      </div>
    );
  }
}

TableContentPlantilla.propTypes = {};

export default TableContentPlantilla;
