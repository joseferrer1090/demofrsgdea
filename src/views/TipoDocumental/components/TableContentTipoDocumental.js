import React, { Component } from "react";
import PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Row, Col } from "reactstrap";
import ModalView from "./ModalViewTipoDocumental";
import ModalDelete from "./ModalDeleteTipoDocumental";
import ModalEdit from "./ModalEditTipoDocumental";
import ModalIndices from "./ModalEditIndicesTipoDocumental";

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
  constructor(props) {
    super(props);
    this.state = {
      modalview: false,
      modaldel: false,
      modaledit: false,
      modalindices: false
    };
  }

  accionesTipoDocumental(cel, row) {
    return (
      <div
        className="table-menu"
        style={{ textAlign: "center", padding: "0", marginRight: "45px" }}
      >
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => {
            this.openModalView();
          }}
        >
          <i className="fa fa-eye" />
        </button>
        &nbsp;
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => {
            this.openModalEdit();
          }}
        >
          <i className="fa fa-pencil" />
        </button>
        &nbsp;
        <button
          className="btn btn-warning btn-sm"
          onClick={() => {
            this.openModalIndices();
          }}
        >
          <i className="fa fa-lock" />
        </button>
        &nbsp;
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            this.openModalDel();
          }}
        >
          <i className="fa fa-trash" />
        </button>
      </div>
    );
  }

  openModalView() {
    this.refs.child.toggle();
  }

  openModalIndices() {
    this.refs.child2.toggle();
  }

  openModalDel() {
    this.refs.child4.toggle();
  }

  openModalEdit() {
    this.refs.child3.toggle();
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
              bordered={false}
              hover
              striped
              exportCSV
            >
              <TableHeaderColumn isKey dataField="id" width="50">
                {" "}
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
              <TableHeaderColumn dataField="dependencia" dataAlign="center">
                {" "}
                Dependencia{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField="hr" dataAlign="center">
                {" "}
                Horas de respuesta{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField="estado" dataAlign="center">
                {" "}
                Estado{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                dataAlign="center"
                dataFormat={(cel, row) => this.accionesTipoDocumental(cel, row)}
              >
                {" "}
                Acciones{" "}
              </TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
        <ModalView modalview={this.state.modalview} ref="child" />
        <ModalDelete modaldelete={this.state.modaldel} ref="child4" />
        <ModalEdit modaledit={this.state.modaledit} ref="child3" />
        <ModalIndices modalindices={this.state.modalindices} ref="child2" />
      </div>
    );
  }
}

TableContentTipoDocumental.propTypes = {};

export default TableContentTipoDocumental;
