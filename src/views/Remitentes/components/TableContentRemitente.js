import React, { Component } from "react";
import PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Row, Col } from "reactstrap";
import ModalView from "./ModalViewRemitente";

import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import ModalViewRemitente from "./ModalViewRemitente";

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
    this.state = {
      modalViewRemitente: false
    };
  }

  accionesRemitente(cel, row) {
    return (
      <button
        className="btn btn-secondary"
        onClick={() => {
          this.openModalView();
        }}
      >
        {" "}
        <i className="fa fa-eye" />{" "}
      </button>
    );
  }

  openModalView() {
    this.refs.child.toggle();
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
              <TableHeaderColumn
                isKey
                dataField={"id"}
                dataAlign="center"
                width="50"
              >
                #
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField={"identificacion"}
                dataAlign="center"
              >
                {" "}
                identificación{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField={"nombre"} dataAlign="center">
                {" "}
                Nombre{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField={"email"} dataAlign="center">
                {" "}
                Email{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField={"estado"} dataAlign="center">
                {" "}
                Estado{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                export={false}
                dataAlign="center"
                dataFormat={(cell, row) => this.accionesRemitente(cell, row)}
                style={{ border: "none" }}
              />
            </BootstrapTable>
          </Col>
        </Row>
        <ModalView modalview={this.state.modalViewRemitente} ref="child" />
      </div>
    );
  }
}

TableContentRemitente.propTypes = {};

export default TableContentRemitente;
