import React, { Component } from "react";
import PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Row, Col } from "reactstrap";
import ModalView from "./ModalViewDependencia";
import ModalEdit from "./ModalEditDependencia";
import ModalDelete from "./ModalDeleteDependencia";
import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import "./../../../css/table_data.css";
const dataExample = [
  {
    IdDependencia: 3,
    Nombre: "GERENCIA GENERAL",
    Cargo: "GERENTE GENERAL",
    Codigo: 1000,
    Sede: "BOGOTA PRINCIPAL",
    Estado: "inactivo"
  },
  {
    IdDependencia: 4,
    Nombre: "CONTROL INTERNO",
    Cargo: "JEFE DE CONTROL INTERNO",
    Codigo: 1100,
    Sede: "BOGOTA PRINCIPAL",
    Estado: "activo"
  },
  {
    IdDependencia: 5,
    Nombre: "SSTA",
    Cargo: "JEFE DE SSMA",
    Codigo: 1200,
    Sede: "BOGOTA PRINCIPAL",
    Estado: "activo"
  },
  {
    IdDependencia: 6,
    Nombre: "DIRECCION TECNICA",
    Cargo: "DIRECTOR TECNICO",
    Codigo: 1300,
    Sede: "BOGOTA PRINCIPAL",
    Estado: "activo"
  },
  {
    IdDependencia: 7,
    Nombre: "GERENCIA OPERATIVA",
    Cargo: "GERENTE OPERATIVO",
    Codigo: 2000,
    Sede: "BOGOTA PRINCIPAL",
    Estado: "activo"
  },
  {
    IdDependencia: 1,
    Nombre: "DIRECCION ADMINISTRATIVA",
    Cargo: "DIRECTOR ADMINISTRATIVO",
    Codigo: 3000,
    Sede: "BOGOTA PRINCIPAL",
    Estado: "activo"
  },
  {
    IdDependencia: 8,
    Nombre: "SEGURIDAD FISICA",
    Cargo: "JEFE DE SEGURIDAD",
    Codigo: 3100,
    Sede: "BOGOTA PRINCIPAL",
    Estado: "activo"
  },
  {
    IdDependencia: 9,
    Nombre: "TALENTO HUMANO",
    Cargo: "COORDINADOR DE TALENTO HUMANO",
    Codigo: 3200,
    Sede: "BOGOTA PRINCIPAL",
    Estado: "activo"
  },
  {
    IdDependencia: 10,
    Nombre: "SERVICIOS ADMINISTRATIVOS",
    Cargo: "COORDINADOR DE SERVICIOS ADMINISTRATIVOS",
    Codigo: 3300,
    Sede: "BOGOTA PRINCIPAL",
    Estado: "activo"
  },
  {
    IdDependencia: 11,
    Nombre: "NOMINA",
    Cargo: "JEFE DE NOMINA",
    Codigo: 3400,
    Sede: "BOGOTA PRINCIPAL",
    Estado: "activo"
  },
  {
    IdDependencia: 12,
    Nombre: "CONTRATACION Y SEGURIDAD SOCIAL",
    Cargo: "COORDINADOR DE CONTRATACION Y SEGURIDAD SOCIAL",
    Codigo: 3500,
    Sede: "BOGOTA PRINCIPAL",
    Estado: "activo"
  },
  {
    IdDependencia: 13,
    Nombre: "ARCHIVO",
    Cargo: "AUXILIAR DE ARCHIVO",
    Codigo: 3600,
    Sede: "BOGOTA CENTRO DE LOGISTICA",
    Estado: "activo"
  },
  {
    IdDependencia: 14,
    Nombre: "GERENCIA DE PLANTA",
    Cargo: "GERENTE DE PLANTA",
    Codigo: 4000,
    Sede: "BOGOTA PRINCIPAL",
    Estado: "activo"
  },
  {
    IdDependencia: 15,
    Nombre: "CONTROL DE CALIDAD",
    Cargo: "JEFE DE CONTROL DE CALIDAD",
    Codigo: 4100,
    Sede: "BOGOTA PRINCIPAL",
    Estado: "activo"
  },
  {
    IdDependencia: 16,
    Nombre: "MANTENIMIENTO",
    Cargo: "JEFE DE MANTENIMIENTO",
    Codigo: 4200,
    Sede: "BOGOTA PRINCIPAL",
    Estado: "activo"
  },
  {
    IdDependencia: 17,
    Nombre: "PRODUCCION",
    Cargo: "JEFE DE PRODUCCION",
    Codigo: 4300,
    Sede: "BOGOTA PRINCIPAL",
    Estado: "activo"
  },
  {
    IdDependencia: 19,
    Nombre: "DIRECCION DE CATEGORIA",
    Cargo: "DIRECTOR DE CATEGORIA",
    Codigo: 5100,
    Sede: "BOGOTA CENTRO DE LOGISTICA",
    Estado: "activo"
  },
  {
    IdDependencia: 18,
    Nombre: "GERENCIA DE MERCADEO",
    Cargo: "GERENTE OPERATIVO",
    Codigo: 5000,
    Sede: "BOGOTA CENTRO DE LOGISTICA",
    Estado: "activo"
  },
  {
    IdDependencia: 20,
    Nombre: "TRADE MARKETING",
    Cargo: "JEFE DE TRADE MARKETING",
    Codigo: 5200,
    Sede: "BOGOTA CENTRO DE LOGISTICA",
    Estado: "activo"
  },
  {
    IdDependencia: 21,
    Nombre: "GERENCIA NACIONAL DE VENTAS",
    Cargo: "GERENTE NACIONAL DE VENTAS",
    Codigo: 6000,
    Sede: "BOGOTA CENTRO DE LOGISTICA",
    Estado: "activo"
  },
  {
    IdDependencia: 22,
    Nombre: "CANAL MERKA Y GANA",
    Cargo: "COORDINADOR CANAL MERKA Y GANA",
    Codigo: 6100,
    Sede: "BOGOTA PRINCIPAL",
    Estado: "activo"
  },
  {
    IdDependencia: 23,
    Nombre: "GERENCIA DE LOGISTICA",
    Cargo: "GERENTE DE LOGISTICA",
    Codigo: 7000,
    Sede: "BOGOTA PRINCIPAL",
    Estado: "activo"
  },
  {
    IdDependencia: 24,
    Nombre: "LOGISTICA DE APROVISIONAMIENTO",
    Cargo: "JEFE DE APROVISIONAMIENTO",
    Codigo: 7100,
    Sede: "BOGOTA PRINCIPAL",
    Estado: "activo"
  },
  {
    IdDependencia: 25,
    Nombre: "ALMACEN",
    Cargo: "JEFE DE ALMACEN",
    Codigo: 7200,
    Sede: "BOGOTA PRINCIPAL",
    Estado: "activo"
  },
  {
    IdDependencia: 26,
    Nombre: "DISTRIBUCION BOGOTA",
    Cargo: "JEFE DE DISTRIBUCION",
    Codigo: 7300,
    Sede: "BOGOTA CENTRO DE LOGISTICA",
    Estado: "activo"
  },
  {
    IdDependencia: 27,
    Nombre: "BODEGA REGIONAL",
    Cargo: "GERENTE DE LOGISTICA",
    Codigo: 7400,
    Sede: "BOGOTA PRINCIPAL",
    Estado: "activo"
  },
  {
    IdDependencia: 2,
    Nombre: "DIRECCION FINANCIERA",
    Cargo: "DIRECTOR",
    Codigo: 8000,
    Sede: "BOGOTA PRINCIPAL",
    Estado: "activo"
  },
  {
    IdDependencia: 28,
    Nombre: "CONTABILIDAD",
    Cargo: "DIRECTOR DE CONTABILIDAD",
    Codigo: 8100,
    Sede: "BOGOTA PRINCIPAL",
    Estado: "activo"
  },
  {
    IdDependencia: 29,
    Nombre: "SISTEMAS",
    Cargo: "DIRECTOR DE SISTEMAS",
    Codigo: 8200,
    Sede: "BOGOTA PRINCIPAL",
    Estado: "activo"
  },
  {
    IdDependencia: 30,
    Nombre: "CREDITO Y CARTERA",
    Cargo: "JEFE DE CARTERA",
    Codigo: 8300,
    Sede: "BOGOTA CENTRO DE LOGISTICA",
    Estado: "activo"
  },
  {
    IdDependencia: 31,
    Nombre: "TESORERIA",
    Cargo: "JEFE DE TESORERIA",
    Codigo: 8400,
    Sede: "BOGOTA PRINCIPAL",
    Estado: "activo"
  },
  {
    IdDependencia: 33,
    Nombre: "LOGISTICA BUCARAMANGA",
    Cargo: "JEFE DE BODEGA",
    Codigo: 7420,
    Sede: "REGIONAL SANTANDER",
    Estado: "activo"
  },
  {
    IdDependencia: 34,
    Nombre: "LOGISTICA CALI",
    Cargo: "JEFE DE BODEGA",
    Codigo: 7430,
    Sede: "REGIONAL OCCIDENTE",
    Estado: "activo"
  },
  {
    IdDependencia: 35,
    Nombre: "LOGISTICA MEDELLIN",
    Cargo: "JEFE DE BODEGA",
    Codigo: 7440,
    Sede: "REGIONAL ANTIOQUIA",
    Estado: "activo"
  },
  {
    IdDependencia: 36,
    Nombre: "LOGISTICA PEREIRA",
    Cargo: "JEFE DE BODEGA",
    Codigo: 7450,
    Sede: "REGIONAL EJE CAFETERO",
    Estado: "activo"
  },
  {
    IdDependencia: 32,
    Nombre: "LOGISTICA BARRANQUILLA",
    Cargo: "JEFE DE BODEGA",
    Codigo: 7410,
    Sede: "REGIONAL ATLANTICO",
    Estado: "activo"
  }
];

class TableContentDependencia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalviewstate: false,
      modaleditstate: false,
      modaldelstate: false
    };
  }
  accionesDependencias(cell, row) {
    return (
      <div
        className="table-menu"
        style={{ textAlign: "center", padding: "0", marginRight: "50px" }}
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
  }

  StatusDependencia(cell, row) {
    let status;
    if (row.Estado === "activo") {
      status = <p className="text-success">ACTIVADA</p>;
    } else if (row.Estado !== "activo") {
      status = <p className="text-danger">INACTIVADA</p>;
    }
    return status;
  }

  openModalView() {
    this.refs.child1.toggle();
  }

  openModalDelete() {
    this.refs.child3.toggle();
  }

  openModalEdit() {
    this.refs.child2.toggle();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Col md="12">
          <BootstrapTable
            data={dataExample}
            pagination
            search
            searchPlaceholder="Buscar"
            exportCSV
            bordered={false}
            hover
            striped
            className="texto-small"
            headerStyle={{ height: "39px" }}
            containerStyle={{ height: "80%" }}
          >
            <TableHeaderColumn
              dataField="Codigo"
              isKey={true}
              dataAlign="center"
              dataSort={true}
            >
              Código
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="Nombre"
              dataSort={true}
              dataAlign="center"
            >
              Nombre
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="Cargo"
              dataAlign="center"
              dataSort={true}
            >
              Cargo responsable
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="Sede"
              dataAlign="center"
              dataSort={true}
            >
              Sede
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="Estado"
              dataAlign="center"
              dataSort={true}
              dataFormat={(cell, row) => this.StatusDependencia(cell, row)}
            >
              {" "}
              Estado{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataAlign="center"
              dataFormat={(cell, row) => this.accionesDependencias(cell, row)}
            >
              Acciones
            </TableHeaderColumn>
          </BootstrapTable>
        </Col>
        <ModalView modalView={this.state.modalviewstate} ref="child1" />
        <ModalEdit modalEdit={this.state.modaleditstate} ref="child2" />
        <ModalDelete modalDel={this.state.modaldelstate} ref="child3" />
      </div>
    );
  }
}

TableContentDependencia.propTypes = {};

export default TableContentDependencia;
