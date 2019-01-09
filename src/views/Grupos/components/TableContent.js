import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import PropTypes from "prop-types";

const dataExample = [
  { id: 1, codigo: "gp1", nombre: "grupo_nombre", estado: true },
  { id: 2, codigo: "gp2", nombre: "grupo_nombre", estado: true },
  { id: 3, codigo: "gp3", nombre: "grupo_nombre", estado: true },
  { id: 4, codigo: "gp4", nombre: "grupo_nombre", estado: true },
  { id: 5, codigo: "gp5", nombre: "grupo_nombre", estado: true },
  { id: 6, codigo: "gp6", nombre: "grupo_nombre", estado: true },
  { id: 7, codigo: "gp7", nombre: "grupo_nombre", estado: true },
  { id: 8, codigo: "gp8", nombre: "grupo_nombre", estado: true },
  { id: 9, codigo: "gp9", nombre: "grupo_nombre", estado: true },
  { id: 10, codigo: "gp10", nombre: "grupo_nombre", estado: true }
];

class TableContent extends Component {
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
              search
              searchPlaceholder="Buscar"
              bordered={false}
              hover
              striped
            >
              <TableHeaderColumn isKey dataField="id" width={"50"}>
                {" "}
                #
              </TableHeaderColumn>
              <TableContent dataField="codigo"> Codigo </TableContent>
              <TableHeaderColumn dataField="nombre"> Nombre </TableHeaderColumn>
              <TableHeaderColumn dataField="estado"> Estado </TableHeaderColumn>
              <TableHeaderColumn> Acciones </TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
      </div>
    );
  }
}

TableContent.propTypes = {};

export default TableContent;
