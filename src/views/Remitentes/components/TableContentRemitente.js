import React, { Component } from "react";
import PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Row, Col } from "reactstrap";

import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";

const dataExample = [
  {
    id: 1,
    identificacion: 12315468,
    nombre: "Remitente 1",
    email: "remitente@remitente.com",
    estado: true
  },
  {
    id: 2,
    identificacion: 1231634568,
    nombre: "Remitente 2",
    email: "remitente2@remitente2.com",
    estado: true
  },
  {
    id: 3,
    identificacion: 123165485,
    nombre: "Remitente 3",
    email: "remitente3@remitente3.com",
    estado: false
  },
  {
    id: 4,
    identificacion: 132165468,
    nombre: "Remitente 4",
    email: "remitente4@remitente4.com",
    estado: false
  }
];

class TableContentRemitente extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="12">
            <BootstrapTable
              data={dataExample}
              pagination
              search
              searchPlaceholder="Buscar"
              exportCSV
            >
              <TableHeaderColumn isKey dataField={"id"}>
                #
              </TableHeaderColumn>
              <TableHeaderColumn dataField={"identificacion"}>
                {" "}
                identificación{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField={"nombre"}>
                {" "}
                Nombre{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField={"email"}> Email </TableHeaderColumn>
              <TableHeaderColumn dataField={"estado"}>
                {" "}
                Estado{" "}
              </TableHeaderColumn>
              <TableHeaderColumn> Acciones </TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
      </div>
    );
  }
}

TableContentRemitente.propTypes = {};

export default TableContentRemitente;
