import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import DatePicker from "react-datepicker";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "./../../../node_modules/react-datepicker/dist/react-datepicker.css";
import "./../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import moment from "moment";

const dataExample = [
  {
    dato: "dato",
    dato: "dato",
    dato: "dato",
    dato: "dato"
  },
  {
    dato: "dato",
    dato: "dato",
    dato: "dato",
    dato: "dato"
  },
  {
    dato: "dato",
    dato: "dato",
    dato: "dato",
    dato: "dato"
  },
  {
    dato: "dato",
    dato: "dato",
    dato: "dato",
    dato: "dato"
  },
  {
    dato: "dato",
    dato: "dato",
    dato: "dato",
    dato: "dato"
  },
  {
    dato: "dato",
    dato: "dato",
    dato: "dato",
    dato: "dato"
  }
];

class Auditoria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
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

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="7" md={{ offset: 2 }}>
            <div className="card">
              <div className="card-header">Datos de consulta</div>
              <div className="card-body">
                <form className="form-inline">
                  <div className="form-group">
                    <label htmlFor="">Fecha de inicio: &nbsp;</label>
                    <DatePicker
                      selected={this.state.startDate}
                      selectsStart
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      onChange={this.handleChangeStartDate}
                      className="form-control"
                    />
                  </div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <div className="form-group">
                    <label htmlFor="">Fecha final: &nbsp; </label>
                    <DatePicker
                      selected={this.state.endDate}
                      selectsEnd
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      onChange={this.handleChangeEndDate}
                      className="form-control"
                    />
                  </div>
                </form>
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
                  searchPlaceholder="Buscar"
                >
                  <TableHeaderColumn
                    isKey
                    dataField={"dato"}
                    dataAlign="center"
                  >
                    {" "}
                    Dato
                  </TableHeaderColumn>
                  <TableHeaderColumn data={"dato"} dataAlign="center">
                    {" "}
                    Dato{" "}
                  </TableHeaderColumn>
                  <TableHeaderColumn data={"dato"} dataAlign="center">
                    {" "}
                    Dato{" "}
                  </TableHeaderColumn>
                  <TableHeaderColumn data={"dato"} dataAlign="center">
                    {" "}
                    Dato{" "}
                  </TableHeaderColumn>
                  <TableHeaderColumn data={"dato"} dataAlign="center">
                    {" "}
                    Dato{" "}
                  </TableHeaderColumn>
                  <TableHeaderColumn data={"dato"} dataAlign="center">
                    {" "}
                    Dato{" "}
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Auditoria;
