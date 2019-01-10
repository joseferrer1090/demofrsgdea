import React, { Component } from "react";
import PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Row, Col } from "reactstrap";

const dataExample = [
  {
    id: 1,
    codigo: "tpd1",
    nombre: "tipo_documental_nombre",
    dependencia: "dependencia_nombre",
    hr: 12,
    estado: true
  },
  {
    id: 1,
    codigo: "tpd2",
    nombre: "tipo_documental_nombre",
    dependencia: "dependencia_nombre",
    hr: 12,
    estado: true
  },
  {
    id: 1,
    codigo: "tpd3",
    nombre: "tipo_documental_nombre",
    dependencia: "dependencia_nombre",
    hr: 12,
    estado: true
  },
  {
    id: 1,
    codigo: "tpd4",
    nombre: "tipo_documental_nombre",
    dependencia: "dependencia_nombre",
    hr: 12,
    estado: true
  },
  {
    id: 1,
    codigo: "tpd5",
    nombre: "tipo_documental_nombre",
    dependencia: "dependencia_nombre",
    hr: 12,
    estado: true
  }
];

class TableContentTipoDocumental extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="12">
            <BootstrapTable data={dataExample}>
              <TableHeaderColumn isKey dataField="id" width="50">
                {" "}
                #
              </TableHeaderColumn>
              <TableHeaderColumn dataField="codigo"> Código </TableHeaderColumn>
              <TableHeaderColumn dataField="nombre"> Nombre </TableHeaderColumn>
              <TableHeaderColumn dataField="dependencia">
                {" "}
                Dependencia{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField="hr">
                {" "}
                Horas de respuesta{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField="estado"> Estado </TableHeaderColumn>
              <TableHeaderColumn> Acciones </TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
      </div>
    );
  }
}

TableContentTipoDocumental.propTypes = {};

export default TableContentTipoDocumental;
