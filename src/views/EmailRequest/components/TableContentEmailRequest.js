import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Row, Col, CardBody, CardHeader, Card, Collapse } from "reactstrap";
import {} from "./../../../services/EndPoints";
import { withTranslation } from "react-i18next";
import moment from "moment";
import PropTypes from "prop-types";
import "./../../../css/styleTableEmailRequest.css";
import "./../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import ModalViewEmailRequest from "./ModalViewEmailRequest";
import Modalc from "./Modal";

class TableContentEmailRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalPreview: false,
      ModalEdit: false,
      ModalDel: false,
      templatePreview: "",
      hiddenColumnID: true,
      auth: this.props.authorization,
      t: this.props.t,
      /* */
      collapase: true,
      dataTable: []
    };
  }

  //   static getDerivedStaticFromProps(props, state) {
  //     if (props.auhorization !== state.auth) {
  //       return {
  //         auth: props.authorization
  //       };
  //     }
  //   }

  //   componentDidUpdate(prevProps, prevState) {
  //     if (this.props.authorization !== prevProps.authorization) {
  //       this.setState({
  //         auth: this.props.authorization
  //       });
  //       this.getDataPlantillasEmail();
  //     }
  //   }

  //   getDataPlantillasEmail = () => {
  //     fetch(TEMPLATES_EMAIL, {
  //       method: "GET",
  //       headers: {
  //         Authorization: "Bearer " + this.props.authorization,
  //         "Content-Type": "application/json"
  //       }
  //     })
  //       .then(response => response.json())
  //       .then(data => {
  //         this.setState({
  //           dataPlantillas: data
  //         });
  //       })
  //       .catch(Error => console.log(" ", Error));
  //   };

  toggleCollapse = () => {
    this.setState({
      collapase: !this.state.collapase
    });
  };

  FechaCreacionPlantillasEmail(cell, row) {
    let createdAt;
    createdAt = new Date(row.createdAt);
    return moment(createdAt).format("DD-MM-YYYY");
  }

  accionesPlantillasEmail(cell, row) {
    return (
      <div
        className="table-actionMenuPlantillaEmail"
        style={{ textAlign: "center", padding: "0", marginRight: "40px" }}
      >
        <button
          className="btn btn-secondary btn-sm"
          data-trigger="hover"
          onClick={() => {
            this.openModalView(row.id);
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
            this.openModal(row.id);
          }}
        >
          {" "}
          <i className="fa fa-info-circle" />{" "}
        </button>
      </div>
    );
  }

  openModal = id => {
    this.refs.child2.toggle(id);
  };

  openModalView(id) {
    this.refs.child.toggle(id);
  }

  indexN(cell, row, enumObject, index) {
    return <div key={index}>{index + 1}</div>;
  }

  render() {
    const { t } = this.props;
    const cuenta1 = [
      {
        id: 1,
        remitente: "remitente1_cuenta1@gmail.com",
        asunto: "asunto cuenta1",
        fecha: moment(new Date()).format("DD-MM-YYYY")
      },
      {
        id: 2,
        remitente: "remitente2_cuenta1@gmail.com",
        asunto: "asunto cuenta1",
        fecha: moment(new Date()).format("DD-MM-YYYY")
      },
      {
        id: 3,
        remitente: "remitente3_cuenta1@gmail.com",
        asunto: "asunto cuenta1",
        fecha: moment(new Date()).format("DD-MM-YYYY")
      }
    ];

    const cuenta2 = [
      {
        id: 1,
        remitente: "remitente1_cuenta2@gmail.com",
        asunto: "asunto cuenta2",
        fecha: moment(new Date()).format("DD-MM-YYYY")
      },
      {
        id: 2,
        remitente: "remitente2_cuenta2@gmail.com",
        asunto: "asunto cuenta2",
        fecha: moment(new Date()).format("DD-MM-YYYY")
      },
      {
        id: 3,
        remitente: "remitente3_cuenta2@gmail.com",
        asunto: "asunto cuenta2",
        fecha: moment(new Date()).format("DD-MM-YYYY")
      }
    ];
    const dataTable = e => {
      const value = e.target.value;
      if (value === "1") {
        this.setState({ dataTable: cuenta1 });
      } else if (value === "2") {
        this.setState({
          dataTable: cuenta2
        });
      } else {
        this.setState({
          dataTable: []
        });
      }
    };
    return (
      <div className="animated fadeIn">
        <div className="col-md-12">
          <Row>
            <Col sm="12">
              <Card>
                <CardHeader>
                  {" "}
                  <a
                    onClick={() => {
                      this.toggleCollapse();
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {" "}
                    Peticiones vía correo electrónico
                  </a>{" "}
                </CardHeader>
                <Collapse isOpen={this.state.collapase}>
                  <CardBody>
                    <div className="row">
                      <div className="col-md-6">
                        <dl className="param">
                          <dt>Cuenta de correo electrónico</dt>
                          <dd>
                            <select
                              className={`form-control form-control-sm `}
                              onChange={e => dataTable(e)}
                            >
                              <option value={""}>-- Seleccione --</option>
                              <option value={"1"}>lexco.test@gmail.com</option>
                              <option value={"2"}>lexco.admin@gmail.com</option>
                            </select>
                          </dd>
                        </dl>
                      </div>
                      {/* <div className="col-md-4">
                        <button className="btn-md">Consultar</button>
                      </div> */}
                    </div>
                  </CardBody>
                </Collapse>
              </Card>
            </Col>
          </Row>
          <BootstrapTable
            striped
            pagination
            search
            searchPlaceholder={"Buscar"}
            data={this.state.dataTable}
            // data={cuenta1}
            hover
            bordered={false}
            className="tablePlantillaEmail texto-PlantillaEmail"
          >
            <TableHeaderColumn
              export={false}
              isKey
              dataField={"id"}
              hidden={this.state.hiddenColumnID}
            />
            <TableHeaderColumn
              dataSort={true}
              dataFormat={this.indexN}
              width={"50"}
              dataField={"id"}
              dataAlign="center"
            >
              #
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="remitente"
              dataAlign="center"
              width={"300"}
            >
              Remitente
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="asunto"
              dataAlign="center"
              width={"300"}
            >
              Asunto
            </TableHeaderColumn>
            <TableHeaderColumn
              dataSort={true}
              dataField={"fecha"}
              // dataFormat={(cell, row) =>
              //   this.FechaCreacionPlantillasEmail(cell, row)
              // }
              dataAlign="center"
              width={"150"}
            >
              Fecha
            </TableHeaderColumn>
            <TableHeaderColumn
              width={"170"}
              export={false}
              dataAlign="center"
              dataFormat={(cel, row) => this.accionesPlantillasEmail(cel, row)}
            >
              {" "}
              Acciones
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
        <ModalViewEmailRequest
          ref={"child"}
          modal={this.state.ModalPreview}
          authorization={this.state.auth}
          t={this.state.t}
        />
        <Modalc
          ref={"child2"}
          modal={this.state.ModalEdit}
          authorization={this.state.auth}
          t={this.state.t}
        />
      </div>
    );
  }
}
TableContentEmailRequest.propTypes = {
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired
};

export default withTranslation("translations")(TableContentEmailRequest);
