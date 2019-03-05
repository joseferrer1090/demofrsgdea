import React, { Component } from "react";
import PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Row, Col } from "reactstrap";
import ModalViewMensajero from "./ModalViewMensajero";
import ModalUpdate from "./ModalActualizarMensajero";
import Modaldelete from "./ModalDeleteMensajero";
import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import "./../../../css/custom_table.css";

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
  constructor(props) {
    super(props);
    this.state = {
      modalView: false,
      modalUpdate: false,
      modaldelte: false
    };
  }

  accionesMensajero(cell, row) {
    return (
      <div
        className="table-menu"
        style={{ textAlign: "center", padding: "0", marginRight: "60px" }}
      >
        <button
          className="btn btn-secondary btn-sm"
          data-trigger="hover"
          onClick={() => {
            this.openModalView();
          }}
        >
          {" "}
          <i className="fa fa-eye" />{" "}
        </button>
        &nbsp;
        <button
          className="btn btn-secondary btn-sm"
          data-trigger="hover"
          onClick={() => {
            this.openModalUpdate();
          }}
        >
          <i className="fa fa-pencil" />
        </button>
        &nbsp;
        <button
          className="btn btn-danger btn-sm"
          data-trigger="hover"
          onClick={() => {
            this.openModalDelete();
          }}
        >
          <i className="fa fa-trash" />
        </button>
      </div>
    );
  }

  EstadoMensajero = (cell, row) => {
    let status;
    if (row.estado === true) {
      status = <div className="text-success">Activo</div>;
    } else if (row.estado !== true) {
      status = <div className="text-danger"> Inactivo </div>;
    }
    return status;
  };

  openModalView = () => {
    this.refs.child.toggle();
  };

  openModalUpdate = () => {
    this.refs.child2.toggle();
  };

  openModalDelete = () => {
    this.refs.child3.toggle();
  };

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
              exportCSV
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
              <TableHeaderColumn
                dataField="estado"
                dataAlign="center"
                dataFormat={(cell, row) => this.EstadoMensajero(cell, row)}
              >
                {" "}
                Estado{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                dataAlign="center"
                dataFormat={(cell, row) => this.accionesMensajero(cell, row)}
              >
                {" "}
                Acciones{" "}
              </TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
        <ModalViewMensajero modalview={this.state.modalView} ref={"child"} />
        <ModalUpdate modalupdate={this.state.modalUpdate} ref={"child2"} />
        <Modaldelete modaldelete={this.state.modaldelte} ref={"child3"} />
      </div>
    );
  }
}

TableContentMensajero.propTypes = {};

export default TableContentMensajero;
