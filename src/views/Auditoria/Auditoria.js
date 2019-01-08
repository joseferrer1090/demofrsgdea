import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import DatePicker from "react-datepicker";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import ModalViewAditoria from "./components/ModalViewAuditoria";
import "./../../../node_modules/react-datepicker/dist/react-datepicker.css";
import "./../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import "./../../css/custom_calendar.css";
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
      modalviewauditoria: false
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
    );
  }

  openModalView() {
    this.refs.child1.toggle();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="7" md={{ offset: 2 }}>
            <div className="card">
              <div className="card-header">Datos de consulta</div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="">Desde: </label>
                          <br />
                          <DatePicker
                            selected={this.state.startDate}
                            selectsStart
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onChange={this.handleChangeStartDate}
                            className="form-control large2"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="">Hasta: </label>
                          <br />
                          <DatePicker
                            selected={this.state.endDate}
                            selectsEnd
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onChange={this.handleChangeEndDate}
                            className="form-control large2"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label> Acción </label>
                          <select className="form-control">
                            <option>1</option>
                            <option>1</option>
                            <option>1</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label> Tablas </label>
                          <select className="form-control">
                            <option>1</option>
                            <option>1</option>
                            <option>1</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label> Usuario </label>
                          <select className="form-control">
                            <option>1</option>
                            <option>1</option>
                            <option>1</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div className="float-right">
                  <button type="button" className="btn btn-secondary">
                    <i className="fa fa-search" /> Consultar{" "}
                  </button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <div className="card">
              <div className="card-body">
                <BootstrapTable
                  data={dataExample}
                  striped
                  hover
                  pagination
                  search
                  bordered={false}
                  searchPlaceholder="Buscar"
                >
                  <TableHeaderColumn
                    isKey
                    dataField="id"
                    width="50"
                    dataAlign="center"
                  >
                    {" "}
                    #{" "}
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="fecha" dataAlign="center">
                    {" "}
                    Fecha{" "}
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="accion" dataAlign="center">
                    {" "}
                    Acción{" "}
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
                  />
                </BootstrapTable>
              </div>
            </div>
          </Col>
        </Row>
        <ModalViewAditoria
          modalview={this.state.modalviewauditoria}
          ref="child1"
        />
      </div>
    );
  }
}

export default Auditoria;
