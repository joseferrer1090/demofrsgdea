import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Collapse
} from "reactstrap";

import IMGDEPENDENCIA from "./../../../assets/img/settings-work-tool.svg";

class ModalViewDependencia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalView,
      collapse: false,
      id: this.props.id,
      userLogged: "jferrer",
      dataDependence: {},
      dataDependenceHeadquarter: {},
      dataDependenceHeadquarterCompany: {},
      dataDependenceHeadquarterCompanyConglomerate: {},
      dataDependenceCharge: {}
    };
  }

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
    fetch(`http://192.168.10.180:7000/api/sgdea/dependence/${id}/jferrer`, {
      method: "GET",
      headers: {
        Authorization: "Basic " + window.btoa("sgdea:123456"),
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataDependence: data,
          dataDependenceHeadquarter: data.headquarter,
          dataDependenceHeadquarterCompany: data.headquarter.company,
          dataDependenceHeadquarterCompanyConglomerate:
            data.headquarter.company.conglomerate,
          dataDependenceCharge: data.charge
        });
      })
      .catch(Error => console.log(Error));
  };

  toggleCollapse = () => {
    this.setState({
      collapse: !this.state.collapse
    });
  };

  render() {
    console.log(this.state.dataDependence);
    console.log(this.state.dataDependenceHeadquarter);
    console.log(this.state.dataDependenceHeadquarterCompany);
    console.log(this.state.dataDependenceHeadquarterCompanyConglomerate);
    console.log(this.state.dataDependenceCharge);

    const statusDependence = data => {
      let status;
      if (data === 1) {
        return (status = <p className="text-success">ACTIVADA</p>);
      } else if (data === 0) {
        return (status = <p className="text-danger"> INACTIVA </p>);
      }
      return status;
    };

    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {" "}
            Ver dependencia {this.state.dataDependence.name}{" "}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGDEPENDENCIA} className="img-thumbnail" />
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
                        <dt>Conglomerado </dt>
                        <dd>
                          {
                            this.state
                              .dataDependenceHeadquarterCompanyConglomerate.name
                          }
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Empresa </dt>
                        <dd>
                          {this.state.dataDependenceHeadquarterCompany.name}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Sede </dt>
                        <dd>{this.state.dataDependenceHeadquarter.name}</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Codigo </dt>
                        <dd>{this.state.dataDependence.code} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Nombre </dt>
                        <dd>{this.state.dataDependence.name}</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Descripción </dt>
                        <dd>{this.state.dataDependence.description} </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </Col>
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
                  <Collapse isOpen={this.state.collapse}>
                    <CardBody>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <dl className="param">
                              <dt>Cargo responsable </dt>
                              <dd> {this.state.dataDependenceCharge.name} </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <dl className="param">
                              <dt>Estado </dt>
                              <dd>
                                {statusDependence(
                                  this.state.dataDependence.status
                                )}{" "}
                              </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <dl className="param">
                              <dt>Fecha de creación </dt>
                              <dd>{this.state.dataDependence.createdAt} </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <dl className="param">
                              <dt>Fecha de modificación </dt>
                              <dd>{this.state.dataDependence.updatedAt}</dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Collapse>
                </Card>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              className="btn btn-secondary"
              onClick={() => {
                this.setState({
                  modal: false
                });
              }}
            >
              <i className="fa fa-times" /> Cerrar{" "}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewDependencia.propTypes = {
  modalView: PropTypes.bool.isRequired
};

export default ModalViewDependencia;
