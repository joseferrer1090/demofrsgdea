import React, { Component } from "react";
import { WithRouter } from "react-router-dom";
import { Row, Col } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import ModalViewTipoDocumentalRadication from "./ModalViewTipoDocumentalRadication";
import ModalDeleteTipoDocumentalRadication from "./ModalDeleteTipoDocumentalRadication";
import PropTypes from "prop-types";
import "./../../../css/styleTableTipoDocumentalRadicacion.css";

const dataExample = [
  {
    id: 1,
    codigo: 12366,
    nombre: "tipo tramite1",
    descripcion: "Tramite 1",
    estado: true
  },
  {
    id: 2,
    codigo: 12366,
    nombre: "tipo tramite2",
    descripcion: "Tramite 2",
    estado: true
  },
  {
    id: 3,
    codigo: 12366,
    nombre: "tipo tramite3",
    descripcion: "Tramite 3",
    estado: false
  }
];

class TableContentTramite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalview: false,
      modaldel: false
    };
  }

  accionesTramite = (cell, row) => {
    return (
      <div
        className="table-actionMenuTLlegada"
        style={{ textAlign: "center", padding: "0", marginRight: "0px" }}
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
            this.routeChange();
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

  estadoTipodocumentalradicacion = (cell, row) => {
    let status;
    if (row.estado === true) {
      status = <p className="text-success"> Activo </p>;
    } else if (row.estado !== true) {
      status = <p className="text-danger"> Inactivo </p>;
    }
    return status;
  };

  openModalView() {
    this.refs.child1.toggle();
  }

  routeChange = () => {
    let path = `#/configuracion/tipodocumentalradication/edit`;
    window.location.replace(path);
  };

  openModalDelete() {
    this.refs.child2.toggle();
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
                dataFormat={(cell, row) =>
                  this.estadoTipodocumentalradicacion(cell, row)
                }
              >
                {" "}
                Estado{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                export={false}
                dataAlign="center"
                dataFormat={(cell, row) => this.accionesTramite(cell, row)}
              >
                {" "}
                Acciones{" "}
              </TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
        <ModalViewTipoDocumentalRadication
          modalviewtramit={this.state.modalview}
          ref={"child1"}
        />
        <ModalDeleteTipoDocumentalRadication
          modaldelete={this.state.modaldel}
          ref={"child2"}
        />
      </div>
    );
  }
}

TableContentTramite.propTypes = {};

export default TableContentTramite;
