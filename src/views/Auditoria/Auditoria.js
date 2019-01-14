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
        <div className="container">
          <Row>
            <Col sm="10" md={{ offset: 1 }}>
              <Card>
                <CardBody>
                  <CardTitle>
                    {" "}
                    Parametros de busqueda <hr />{" "}
                  </CardTitle>
                  <br />
                  <Form>
                    <Card body>
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="exampleEmail">
                              {" "}
                              Desde: <span className="text-danger">*</span>{" "}
                            </Label>
                            <DatePicker
                              selected={this.state.startDate}
                              selectsStart
                              startDate={this.state.startDate}
                              endDate={this.state.endDate}
                              onChange={this.handleChangeStartDate}
                              className="form-control large2"
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="exampleEmail">
                              {" "}
                              Hasta: <span className="text-danger">*</span>{" "}
                            </Label>
                            <DatePicker
                              selected={this.state.endDate}
                              selectsEnd
                              startDate={this.state.startDate}
                              endDate={this.state.endDate}
                              onChange={this.handleChangeEndDate}
                              className="form-control large2"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Card>
                    <Row>
                      <Col sm="6">
                        <div className="form-group">
                          <label> Acción: </label>
                          <select className="form-control">
                            {" "}
                            <option> seleccione </option>{" "}
                          </select>
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="form-group">
                          <label> Tablas: </label>
                          <select className="form-control">
                            {" "}
                            <option> Seleccione </option>{" "}
                          </select>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="12">
                        <div className="form-group">
                          <label> Usuarios: </label>
                          <select className="form-control">
                            {" "}
                            <option> Seleccione </option>{" "}
                          </select>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <div className="float-right">
                    <button className="btn btn-secondary">
                      {" "}
                      <i className="fa fa-search" /> Consultar{" "}
                    </button>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
        <Row sm="12">
          <Card body>
            <BootstrapTable data={dataExample} bordered={false} striped hover>
              <TableHeaderColumn
                dataField="id"
                isKey
                dataAlign={"center"}
                width="50"
              >
                #
              </TableHeaderColumn>
              <TableHeaderColumn dataField="fecha" dataAlign={"center"}>
                {" "}
                Fecha{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField="accion" dataAlign={"center"}>
                {" "}
                Accion{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField="tabla" dataAlign={"center"}>
                {" "}
                Tabla{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField="usuario" dataAlign={"center"}>
                {" "}
                Usuario{" "}
              </TableHeaderColumn>
              <TableHeaderColumn dataField="tipo" dataAlign={"center"}>
                {" "}
                Tipo{" "}
              </TableHeaderColumn>
              <TableHeaderColumn
                dataAlign="center"
                dataFormat={(cel, row) => this.accionVerAuditoria(cel, row)}
              >
                {" "}
                Accion{" "}
              </TableHeaderColumn>
            </BootstrapTable>
          </Card>
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
