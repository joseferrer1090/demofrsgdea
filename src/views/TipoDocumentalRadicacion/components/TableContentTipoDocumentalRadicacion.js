import React, { Component } from "react";
import PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Row, Col, Button } from "reactstrap";
import ModalView from "./ModalViewTipoDocumentalRadicacion";
import ModalDelete from "./ModalDeleteTipoDocumentalRadicacion";
import ModalEdit from "./ModalEditTipoDocumentalRadicacion";
import ModalIndices from "./ModalEditIndicesTipoDocumentalRadicacion";
import ModalUsers from "./ModalViewUserTipoDocumentalRadicacion";
import ModalEditUsers from "./ModalEditUsersTipoDocumentalRadicacion";
import "./../../../css/custom_css.css";

const dataExample = [
  {
    id: 1,
    codigo: "tpd1",
    nombre: "tipo_documental_radicacion_nombre",
    usuarios: "",
    estado: true
  },
  {
    id: 1,
    codigo: "tpd2",
    nombre: "tipo_documental_radicacion_nombre",
    usuarios: "",
    estado: true
  },
  {
    id: 1,
    codigo: "tpd3",
    nombre: "tipo_documental_radicacion_nombre",
    usuarios: "",
    estado: true
  },
  {
    id: 1,
    codigo: "tpd4",
    nombre: "tipo_documental_radicacion_nombre",
    usuairos: "",
    estado: true
  },
  {
    id: 1,
    codigo: "tpd5",
    nombre: "tipo_documental:_radicacion_nombre",
    usuarios: "",
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
      modalindices: false,
      modalviewusers: false,
      modaleditusers: false
    };
  }

  accionesTipoDocumentalRadicacion(cel, row) {
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
          className="btn btn-secondary btn-sm"
          onClick={() => {
            this.openModalEditUsers();
          }}
        >
          <i className="fa fa-user" />
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

  accionusuarios(cel, row) {
    return (
      <div>
        <Button
          color="link"
          onClick={() => {
            this.openModalViewUsers();
          }}
          style={{}}
        >
          {" "}
          ver{" "}
        </Button>
      </div>
    );
  }

  openModalViewUsers() {
    this.refs.child5.toggle();
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

  openModalEditUsers() {
    this.refs.child6.toggle();
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
              <TableHeaderColumn
                dataField="usuarios"
                dataAlign="center"
                dataFormat={(cel, row) => this.accionusuarios(cel, row)}
              >
                {" "}
                Usuarios{" "}
              </TableHeaderColumn>

              <TableHeaderColumn dataField="estado" dataAlign="center">
                {" "}
                Estado{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                dataAlign="center"
                dataFormat={(cel, row) =>
                  this.accionesTipoDocumentalRadicacion(cel, row)
                }
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
        <ModalUsers modalviewusers={this.state.modaluserview} ref="child5" />
        <ModalEditUsers
          modaleditusers={this.state.modaleditusers}
          ref={"child6"}
        />
      </div>
    );
  }
}

TableContentTipoDocumental.propTypes = {};

export default TableContentTipoDocumental;
