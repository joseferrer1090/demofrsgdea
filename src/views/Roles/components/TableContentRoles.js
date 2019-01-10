import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Row, Col } from "reactstrap";

const dataExample = [
  { id: 1, codigo: "rol1", nombre: "rol_nombre", estado: true },
  { id: 2, codigo: "rol2", nombre: "rol_nombre", estado: false },
  { id: 3, codigo: "rol3", nombre: "rol_nombre", estado: true },
  { id: 4, codigo: "rol4", nombre: "rol_nombre", estado: false },
  { id: 5, codigo: "rol5", nombre: "rol_nombre", estado: true },
  { id: 6, codigo: "rol6", nombre: "rol_nombre", estado: false },
  { id: 7, codigo: "rol7", nombre: "rol_nombre", estado: true },
  { id: 8, codigo: "rol8", nombre: "rol_nombre", estado: false },
  { id: 9, codigo: "rol9", nombre: "rol_nombre", estado: true },
  { id: 10, codigo: "rol10", nombre: "rol_nombre", estado: true }
];

class TableContentRoles extends Component {
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
              pagination
              bordered={false}
              hover
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

export default TableContentRoles;
