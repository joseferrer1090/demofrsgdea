import React, { Component } from "react";
import PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Row, Col } from "reactstrap";
import ModalEdit from "./ModalEditSedes";
import ModalView from "./ModalViewSedes";
import ModalDelete from "./ModalDeleteSedes";
import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import "./../../../css/table_data.css";

const dataExample = [
  {
    IdSede: "1",
    Nombre: "BOGOTA PRINCIPAL",
    Prefijo: "BP",
    Estado: "activo",
    Direccion: "AUTOPISTA SUR  60-51",
    Telefono: "711 90 05",
    Ciudad: "BOGOTA - DISTRITO CAPITAL"
  },
  {
    IdSede: "3",
    Nombre: "REGIONAL ATLANTICO",
    Prefijo: "ATLAN",
    Estado: "activo",
    Direccion: "CALLE 110 9G-330 BODEGA 1415",
    Telefono: "310 398 74 11",
    Ciudad: "BARRANQUILLA - ATLANTICO"
  },
  {
    IdSede: "2",
    Nombre: "BOGOTA CENTRO DE LOGISTICA",
    Prefijo: "BCLED",
    Estado: "activo",
    Direccion: "CALLE 25D 95A-90",
    Telefono: "426 34 44",
    Ciudad: "BOGOTA - DISTRITO CAPITAL"
  },
  {
    IdSede: "6",
    Nombre: "REGIONAL ANTIOQUIA",
    Prefijo: "ANTI",
    Estado: "activo",
    Direccion: "CRA 42 54A-155 BODEGA A 101 ITAGUI",
    Telefono: "4-372 12 45",
    Ciudad: "MEDELLIN - ANTIOQUIA"
  },
  {
    IdSede: "7",
    Nombre: "REGIONAL EJE CAFETERO",
    Prefijo: "EJECAF",
    Estado: "activo",
    Direccion: "CRA 14 88-00 BODEGA MONSERRATE BOD 1 SEC. BELMONTE",
    Telefono: "6-320 51 55",
    Ciudad: "PEREIRA - RISARALDA"
  },
  {
    IdSede: "5",
    Nombre: "REGIONAL OCCIDENTE",
    Prefijo: "OCCI",
    Estado: "activo",
    Direccion: "CRA 27B 13-141 ZONA INDUS. BL 8 BOD 15 ARROYOHONDO",
    Telefono: "2-691 37 07",
    Ciudad: "CALI - VALLE DEL CAUCA"
  },
  {
    IdSede: "4",
    Nombre: "REGIONAL SANTANDER",
    Prefijo: "SANT",
    Estado: "activo",
    Direccion: "MANZANA D BODEGA 1 PARQUE INDUSTRIAL VIA CHIMITA",
    Telefono: "7-676 00 78",
    Ciudad: "BUCARAMANGA - SANTANDER"
  }
];

class TableContentSedes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalView: false,
      modalEdit: false,
      modalDel: false
    };
  }

  accionesSedes = (cell, row) => {
    return (
      <div
        className="table-menu"
        style={{ textAlign: "center", padding: "0", marginRight: "30px" }}
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
            this.openModalEdit();
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
          {" "}
          <i className="fa fa-trash" />{" "}
        </button>
      </div>
    );
  };

  openModalView = () => {
    this.refs.child.toggle();
  };

  openModalEdit = () => {
    this.refs.child2.toggle();
  };

  openModalDelete = () => {
    this.refs.child3.toggle();
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="12">
            <div className="">
              <BootstrapTable
                data={dataExample}
                search
                hover
                pagination
                bordered={false}
                striped
                searchPlaceholder={"Buscar"}
                exportCSV
                className="texto-small"
              >
                <TableHeaderColumn
                  isKey
                  dataField={"IdSede"}
                  width={"50"}
                  dataAlign="center"
                  dataSort={true}
                >
                  #
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField={"Nombre"}
                  dataAlign="center"
                  width={""}
                  dataSort={true}
                >
                  Nombre
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField={"Prefijo"}
                  dataAlign="center"
                  width={"100"}
                  dataSort={true}
                >
                  Prefijo
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField={"Ciudad"}
                  dataAlign={"center"}
                  width={"250"}
                  dataSort={true}
                >
                  {" "}
                  Ciudad{" "}
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField={"Direccion"}
                  dataAlign={"center"}
                  width={"250"}
                  dataSort={true}
                >
                  Dirección
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField={"Telefono"}
                  dataAlign={"center"}
                  dataSort={true}
                >
                  Teléfono
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField={"Estado"}
                  dataAlign={"center"}
                  dataSort={true}
                >
                  {" "}
                  Estado{" "}
                </TableHeaderColumn>
                <TableHeaderColumn
                  export={false}
                  dataAlign="center"
                  dataFormat={(cell, row) => this.accionesSedes(cell, row)}
                  style={{ border: "none" }}
                >
                  {" "}
                  Acciones{" "}
                </TableHeaderColumn>
              </BootstrapTable>
            </div>
          </Col>
        </Row>
        <ModalView modalview={this.state.modalView} ref="child" />
        <ModalEdit modaledit={this.state.modalEdit} ref="child2" />
        <ModalDelete modaldel={this.state.modalDel} ref="child3" />
      </div>
    );
  }
}

TableContentSedes.propTypes = {};

export default TableContentSedes;
