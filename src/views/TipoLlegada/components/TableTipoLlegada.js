import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import ModalView from "./ModalViewTipoLlegada";
import ModalEdit from "./ModalEditTipoLlegada";
import ModalDelete from "./ModalDeleteTipoLlegada";
import PropTypes from "prop-types";
import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import "./../../../css/styleTableTipoLlegada.css";

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
    descripcion: "Tipo de llegada via electronica email",
    estado: true
  }
];

class TableTipoLlegada extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalviewtipollegada: false,
      modaledittipollegada: false,
      modaldeletetipollegada: false
    };
  }

  accionesTipoLlegada = (cell, row) => {
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

  estadoTipoLlegada = (cell, row) => {
    let status;
    if (row.estado === true) {
      status = <div className="text-success"> Activo </div>;
    } else if (row.estado !== true) {
      status = <div className="text-danger"> Inactivo </div>;
    }
    return status;
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
                dataFormat={(cell, row) => this.estadoTipoLlegada(cell, row)}
              >
                {" "}
                Estado{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                export={false}
                dataAlign="center"
                dataFormat={(cell, row) => this.accionesTipoLlegada(cell, row)}
              >
                {" "}
                Acciones{" "}
              </TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
        <ModalView modalview={this.state.modalviewtipollegada} ref={"child"} />
        <ModalEdit modaledit={this.state.modaledittipollegada} ref={"child2"} />
        <ModalDelete
          modaldelete={this.state.modaldeletetipollegada}
          ref={"child3"}
        />
      </div>
    );
  }
}

TableTipoLlegada.propTypes = {};

export default TableTipoLlegada;
