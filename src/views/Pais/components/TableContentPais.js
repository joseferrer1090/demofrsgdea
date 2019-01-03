import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";

const dataExample = [
  { id: 1, codigo: 12345, nombre: "Colombia1", estado: true },
  { id: 2, codigo: 12345, nombre: "Colombia2", estado: true },
  { id: 3, codigo: 12345, nombre: "Colombia3", estado: true },
  { id: 4, codigo: 12345, nombre: "Colombia4", estado: true },
  { id: 5, codigo: 12345, nombre: "Colombia5", estado: true },
  { id: 6, codigo: 12345, nombre: "Colombia6", estado: true }
];

class TableContentPais extends Component {
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
              exportCSV
              pagination
              search
              searchPlaceholder="Buscar"
              data={dataExample}
            >
              <TableHeaderColumn isKey dataField="id" width="50">
                #
              </TableHeaderColumn>
              <TableHeaderColumn dataField="codigo" dataAlign="center">
                {" "}
                Código{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField="nombre" dataAlign="center">
                {" "}
                Nombre{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField="estado" dataAlign="center">
                {" "}
                Estado{" "}
              </TableHeaderColumn>
              <TableHeaderColumn  dataAlign="center"> Acciones </TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TableContentPais;
