import React, { Component } from "react";
import PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Row, Col } from "reactstrap";

const dataExample = [
  {
    id: 1,
    identificacion: "25468298",
    nombre: "Servientrega",
    descripcion: "Empresa de mensajeria colombiana de miltiple soluciones",
    estado: true
  },
  {
    id: 2,
    identificacion: "25468298",
    nombre: "TCC",
    descripcion: "Empresa de mensajeria colombiana",
    estado: true
  },
  {
    id: 3,
    identificacion: "25468298",
    nombre: "Interapidisimo",
    descripcion: "Empresa de mensajeria colombiana de miltiple soluciones",
    estado: true
  },
  {
    id: 4,
    identificacion: "25468298",
    nombre: "DHL",
    descripcion: "Empresa de mensajeria internacional de multiple soluciones",
    estado: true
  },
  {
    id: 5,
    identificacion: "25468298",
    nombre: "Envia",
    descripcion: "Empresa de mensajeria colombiana de miltiple soluciones",
    estado: true
  }
];

class TableContentMensajero extends Component {
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
              pagination
              search
              searchPlaceholder="Buscar"
            >
              <TableHeaderColumn
                isKey
                dataField="id"
                dataAlign="center"
                width="80"
              >
                {" "}
                id{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField="identificacion" dataAlign="center">
                {" "}
                Identificación{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField="nombre" dataAlign="center">
                {" "}
                Nombre{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField="descripcion" dataAlign="center">
                {" "}
                Descripción{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField="estado" dataAlign="center">
                {" "}
                Estado{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataAlign="center">
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

TableContentMensajero.propTypes = {};

export default TableContentMensajero;
