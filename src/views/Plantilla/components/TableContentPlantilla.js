import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import ModalDelete from "./ModalDeletePlantilla";
import ModalView from "./ModalViewPlantilla";
import ModalViewPlantilla from "./ModalViewPlantilla";

const dataExample = [
  {
    id: 1,
    codigo: 1,
    nombre: "Plantilla 1",
    descripcion: "descripcion plantilla",
    estado: true
  },
  {
    id: 2,
    codigo: 2,
    nombre: "Plantilla 2",
    descripcion: "descripcion plantilla",
    estado: false
  },
  {
    id: 3,
    codigo: 3,
    nombre: "Planitlla 3",
    descripcion: "descripcion plantilla",
    estado: true
  },
  {
    id: 4,
    codigo: 3,
    nombre: "Plantilla 4",
    descripcion: "descripcion plantilla",
    estado: false
  }
];

class TableContentPlantilla extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modaldelete: false,
      modalview_: false
    };
  }

  accionesPlnatilla = (cel, row) => {
    return (
      <div
        className="table-actionMenuGUsu"
        style={{ textAlign: "center", padding: "0", marginRight: "190px" }}
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
          className="btn btn-secondary btn-sm"
          data-trigger="hover"
          onClick={() => {
            this.openViewAddIndexes();
          }}
        >
          <i className="fa fa-address-card-o " />
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

  estadoPlantilla(cell, row) {
    let status;
    if (row.estado === true) {
      status = <p className="text-success"> Activo </p>;
    } else if (row.estado !== true) {
      status = <p className="text-danger"> Inactivo </p>;
    }
    return status;
  }

  openModalDelete() {
    this.refs.child3.toggle();
  }

  openModalEdit() {
    let path = `/#/configuracion/plantilla/edit`;
    window.location.replace(path);
  }

  openViewAddIndexes() {
    let path = `/#/configuracion/plantilla/addindexes`;
    window.location.replace(path);
  }

  openModalView() {
    this.refs.child1.toggle();
  }

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
              search
              searchPlaceholder="Buscar"
              exportCSV
              pagination
              className=""
            >
              <TableHeaderColumn
                isKey
                dataField="id"
                dataAlign="center"
                width={"100"}
              >
                {" "}
                #{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="codigo"
                dataAlign="center"
                width={"200"}
              >
                {" "}
                Codigo{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="nombre"
                dataAlign="center"
                width={"250"}
              >
                {" "}
                Nombre{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                width={"200"}
                dataField="estado"
                dataAlign="center"
                dataFormat={(cell, row) => this.estadoPlantilla(cell, row)}
              >
                {" "}
                Estado{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                export={false}
                dataAlign="center"
                dataFormat={(cell, row) => this.accionesPlnatilla(cell, row)}
              >
                {" "}
                Acciones{" "}
              </TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
        <ModalViewPlantilla modalview={this.state.modalview_} ref={"child1"} />
        <ModalDelete modaldelete={this.state.modaldelete} ref={"child3"} />
      </div>
    );
  }
}

TableContentPlantilla.propTypes = {};

export default TableContentPlantilla;
