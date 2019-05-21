import React, { Component } from "react";
import DatePicker from "react-datepicker";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Row,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import ModalViewAditoria from "./components/ModalViewAuditoria";
import ModalSearch from "./components/ModalSearchAuditoria";
import "./../../../node_modules/react-datepicker/dist/react-datepicker.css";
import "./../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import "./../../css/custom_calendar.css";
import "./../../css/table_data.css";
import "./components/customstyle.css";
import "./../../css/styleTableAuditoria.css";
import styled from "styled-components";
import moment from "moment";

const dataExample = [
  {
    id: 1,
    fecha: "01/01/2019",
    accion: "Grabar",
    tabla: "tabla_entidad",
    usuario: "usuario_nanme",
    tipo: "usuario_type"
  },
  {
    id: 2,
    fecha: "01/01/2019",
    accion: "Grabar",
    tabla: "tabla_entidad",
    usuario: "usuario_nanme",
    tipo: "usuario_type"
  },
  {
    id: 3,
    fecha: "01/01/2019",
    accion: "Grabar",
    tabla: "tabla_entidad",
    usuario: "usuario_nanme",
    tipo: "usuario_type"
  },
  {
    id: 4,
    fecha: "01/01/2019",
    accion: "Grabar",
    tabla: "tabla_entidad",
    usuario: "usuario_nanme",
    tipo: "usuario_type"
  },
  {
    id: 5,
    fecha: "01/01/2019",
    accion: "Grabar",
    tabla: "tabla_entidad",
    usuario: "usuario_nanme",
    tipo: "usuario_type"
  },
  {
    id: 6,
    fecha: "01/01/2019",
    accion: "Grabar",
    tabla: "tabla_entidad",
    usuario: "usuario_nanme",
    tipo: "usuario_type"
  }
];

class Auditoria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      modalviewauditoria: false,
      modalSearch: false,
      visible: false
    };
  }

  handleChangeStartDate = date => {
    this.setState({
      startDate: date
    });
  };

  handleChangeEndDate = date => {
    this.setState({
      endDate: date
    });
  };

  accionVerAuditoria(cel, row) {
    return (
      <div className="table-actionMenuAuditoria" style={{marginRight:"90px"}}>
      <button
        className="btn btn-secondary btn-sm "
        data-trigger="hover"
        onClick={() => {
          this.openModalView();
        }}
      >
        {" "}
        <i className="fa fa-eye" />{" "}
      </button>
      </div>
    );
  }

  createButtonCustom = props => {
    return (
      <div className="btn-group btn-group-sm">
        {props.exportCSVBtn}
        &nbsp;
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => {
            this.openModalSearch();
          }}
        >
          {" "}
          <i className="fa fa-pencil" /> Consultar auditoría{" "}
        </button>
      </div>
    );
  };

  openModalView() {
    this.refs.child1.toggle();
  }

  openModalSearch() {
    this.refs.child2.toggle();
  }

  render() {
    const options = {
      btnGroup: this.createButtonCustom
    };

    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-12">
            <Card body>
              <BootstrapTable
                data={dataExample}
                options={options}
                bordered={false}
                hover
                exportCSV
                search
                searchPlaceholder="Buscar"
                pagination
                striped
                className="tableAuditoria texto-Auditoria"
                // headerStyle={{ height: "39px" }}
                bod
              >
                <TableHeaderColumn isKey dataField="fecha" dataAlign="center">
                  {" "}
                  Fecha{" "}
                </TableHeaderColumn>
                <TableHeaderColumn dataField="accion" dataAlign="center">
                  {" "}
                  Accion{" "}
                </TableHeaderColumn>
                <TableHeaderColumn dataField="tabla" dataAlign="center">
                  {" "}
                  Tabla{" "}
                </TableHeaderColumn>
                <TableHeaderColumn dataField="usuario" dataAlign="center">
                  {" "}
                  Usuario{" "}
                </TableHeaderColumn>
                <TableHeaderColumn dataField="tipo" dataAlign="center">
                  {" "}
                  Tipo{" "}
                </TableHeaderColumn>

                <TableHeaderColumn
                  dataAlign="center"
                  dataFormat={(cel, row) => this.accionVerAuditoria(cel, row)}
                >
                  Acciones{" "}
                </TableHeaderColumn>
              </BootstrapTable>
            </Card>
          </div>
        </div>
        <ModalViewAditoria
          modalview={this.state.modalviewauditoria}
          ref={"child1"}
        />
        <ModalSearch modalSearch={this.state.modalSearch} ref={"child2"} />
      </div>
    );
  }
}

export default Auditoria;
