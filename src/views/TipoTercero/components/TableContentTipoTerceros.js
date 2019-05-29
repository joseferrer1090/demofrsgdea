import React, { Component } from "react";
import PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import ModalViewTipoTercero from "./ModalViewTipoTercero";
import ModalDeleteTipoTercero from "./ModalDeleteTipoTercero";
import ModalUpdateTipoTercero from "./ModalEditTipoTercero";
import { Row, Col } from "reactstrap";

const dataExample = [
  {
    id: 1,
    codigo: "10101001",
    nombre: "Tercero 1",
    descripcion: "descripcion del tercer1",
    estado: true
  },
  {
    id: 2,
    codigo: "10147522",
    nombre: "Tercero 2",
    descripcion: "descripcion del tercero2",
    estado: false
  },
  {
    id: 3,
    codigo: "1212551",
    nombre: "Tercero 3",
    descripcion: "descripcion del tercero3",
    estado: true
  },
  {
    id: 4,
    codigo: "15254530",
    nombre: "Tercero 4",
    descripcion: "descripcion del tercero4",
    estado: false
  }
];

class TableContentTipoTerceros extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalView: false,
      modaldelete: false,
      modaluptate: false
    };
  }

  estadoTipoTercero = (cell, row) => {
    let status;
    if (row.estado === true) {
      status = <div className="text-success"> Activo </div>;
    } else if (row.estado !== true) {
      status = <div className="text-danger"> Inactivo </div>;
    }
    return status;
  };

  accionesTipoTercer = () => {
    return (
      <div
        className="table-actionMenuTLlegada"
        style={{ textAlign: "center", padding: "0", marginRight: "70px" }}
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
          className="btn btn-danger btn-sm"
          onClick={() => {
            this.openModalDelete();
          }}
        >
          <i className="fa fa-trash" />
        </button>
      </div>
    );
  };

  openModalView() {
    this.refs.child.toggle();
  }

  openModalEdit() {
    this.refs.child2.toggle();
  }

  openModalDelete() {
    this.refs.child3.toggle();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm={12}>
            <BootstrapTable
              data={dataExample}
              bordered={false}
              hover
              pagination
              search
              striped
              searchPlaceholder="Buscar"
              exportCSV
              className="texto-TLlegada"
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
              <TableHeaderColumn
                dataField={"estado"}
                dataAlign="center"
                dataFormat={(cell, row) => this.estadoTipoTercero(cell, row)}
              >
                {" "}
                Estado{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField={""}
                dataAlign="center"
                dataFormat={(cell, row) => this.accionesTipoTercer(cell, row)}
              >
                {" "}
                Acciones{" "}
              </TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
        <ModalViewTipoTercero modalview={this.state.modalView} ref={"child"} />
        <ModalUpdateTipoTercero
          modalupdate={this.state.modaluptate}
          ref={"child2"}
        />
        <ModalDeleteTipoTercero
          modaldelete={this.state.modaldelete}
          ref={"child3"}
        />
      </div>
    );
  }
}

TableContentTipoTerceros.propTypes = {};

export default TableContentTipoTerceros;
