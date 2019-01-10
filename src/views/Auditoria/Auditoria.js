import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { Card, CardBody, CardHeader, CardFooter } from "reactstrap";
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
          <div className="row">
            <div className="col-md-12">
              <Card>
                <CardHeader> p </CardHeader>
                <CardBody>p</CardBody>
                <CardFooter>p</CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Auditoria;
