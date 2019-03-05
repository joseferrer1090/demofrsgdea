import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import PropTypes from "prop-types";

const dataExample = [
  {
    id: 1,
    codigo: 12366,
    nombre: "A la mano",
    descripcion: "tipo de llegada via fisica",
    estado: true
  },
  {
    id: 2,
    codigo: 12366,
    nombre: "Electronica",
    descripcion: "Tipo de llegada via electronica, email",
    estado: true
  }
];

class TableTipoLlegada extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Row>
          <Col sm="12">
            <BootstrapTable
              data={dataExample}
              bordered={false}
              hover
              pagination
              search
              striped
              searchPlaceholder="Buscar"
              exportCSV
            >
              <TableHeaderColumn isKey dataField={"id"} width="50">
                {" "}
                #{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField={"codigo"} dataAlign="center">
                {" "}
                Código{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField={"nombre"} dataAlign="center">
                {" "}
                Nombre{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField={"descripcion"} dataAlign="center">
                {" "}
                Descripción{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField={"estado"} dataAlign="center">
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

TableTipoLlegada.propTypes = {};

export default TableTipoLlegada;
