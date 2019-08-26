import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Card,
  CardHeader,
  Collapse,
  CardBody,
  Table
} from "reactstrap";
import PropTypes from "prop-types";
import IMGCARGO from "./../../../assets/img/employee.svg";

class ModalViewCargo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalviewcargo,
      id: this.props.id,
      datCharge: {}
    };
  }

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
    this.getDataCargoById(id);
  };

  toggleCollapse = () => {
    this.setState({
      collapase: !this.state.collapase
    });
  };

  getDataCargoById = id => {
    fetch(`http://192.168.10.180:7000/api/sgdea/charge/${id}/jferrer`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + window.btoa("sgdea:123456")
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          datCharge: data
        });
      })
      .catch("Error", console.log("Error", Error));
  };

  render() {
    console.log(this.state.id);
    console.log(this.state.datCharge);
    const statusCharge = data => {
      let status;
      if (data === 1) {
        status = <p className="text-success">ACTIVADO</p>;
      } else if (data === 0) {
        status = <p className="text-danger"> INACTIVO </p>;
      }
      return status;
    };
    return (
      <Modal className="modal-lg" isOpen={this.state.modal}>
        <ModalHeader> Ver cargo {this.state.datCharge.name} </ModalHeader>
        <ModalBody>
          <Row>
            <Col sm="3">
              <img src={IMGCARGO} className="img-thumbnail" />
            </Col>
            <Col sm="9">
              <div className="">
                {" "}
                <h5 className="" style={{ borderBottom: "1px solid black" }}>
                  {" "}
                  Datos{" "}
                </h5>{" "}
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt> Código </dt>
                      <dd> {this.state.datCharge.code} </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt> Nombre </dt>
                      <dd> {this.state.datCharge.name} </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt> Descripción </dt>
                      <dd> {this.state.datCharge.description} </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt> Estado </dt>
                      <dd> {statusCharge(this.state.datCharge.status)} </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt> Fecha de creación </dt>
                      <dd>{this.state.datCharge.createdAt}</dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt> Fecha de modificación </dt>
                      <dd>{this.state.datCharge.updatedAt} </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
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
                    Más información{" "}
                  </a>{" "}
                </CardHeader>
                <Collapse isOpen={this.state.collapase}>
                  <Row>
                    <Col sm="12">
                      <Table size="sm" striped hover>
                        <thead>
                          <tr className="text-center">
                            <th> Asignar responsabilidades</th>
                            <th> </th>
                            <th> Responsable </th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          <tr>
                            <td>Conglomerado</td>
                            <td>
                              <label> Nombre conglomerado </label>
                            </td>
                            <td>
                              <label>Si / No</label>
                            </td>
                          </tr>
                          <tr>
                            <td>Empresa</td>
                            <td>
                              <label> Nombre empresa </label>
                            </td>
                            <td>
                              <label>Si / No</label>
                            </td>
                          </tr>
                          <tr>
                            <td>Sede</td>
                            <td>
                              <label> Nombre sede </label>
                            </td>
                            <td>
                              <label>Si / No</label>
                            </td>
                          </tr>
                          <tr>
                            <td>Dependencia</td>
                            <td>
                              <label> Nombre dependencia </label>
                            </td>
                            <td>
                              <label>Si / No</label>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </Collapse>
              </Card>
            </Col>
          </Row>
        </ModalBody>

        <ModalFooter>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              this.setState({ modal: false });
            }}
          >
            <i className="fa fa-times" /> Cerrar{" "}
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalViewCargo.propTypes = {
  modalviewcargo: PropTypes.bool.isRequired
};

export default ModalViewCargo;
