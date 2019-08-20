import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Row,
  Col,
  Collapse,
  Card,
  CardBody,
  CardFooter,
  CardHeader
} from "reactstrap";
import IMGCOMPANY from "./../../../assets/img/company.svg";

class ModalViewEmpresa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalviewempresa,
      collapase: false,
      id: this.props.id,
      dataComponey: {},
      dataCompanyConglomerate: {}
    };
  }

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
    fetch(`http://192.168.10.180:7000/api/sgdea/company/${id}/jferrer`, {
      method: "GET",
      headers: {
        Authorization: "Basic " + window.btoa("sgdea:123456"),
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataComponey: data,
          dataCompanyConglomerate: data.conglomerate
        });
      })
      .catch(Error => console.log(Error));
  };

  toggleCollapse = () => {
    this.setState({
      collapase: !this.state.collapase
    });
  };

  render() {
    const company = this.state.dataComponey;
    const companyconglomerate = this.state.dataCompanyConglomerate;
    // console.log(company);
    // console.log(companyconglomerate);
    const statusCompany = data => {
      let status;
      if (data === 1) {
        status = <b className="text-success">Activada</b>;
      } else if (data === 0) {
        status = <b className="text-danger">Inactiva</b>;
      }
      return status;
    };

    const chargeStatus = data => {
      let charge;
      if (data === null) {
        charge = <b className="text-danger"> Cargo asignado </b>;
      } else if (data !== null) {
        charge = <b>{data}</b>;
      }
      return charge;
    };

    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader> Ver empresa {company.name} </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGCOMPANY} className="img-thumbnail" />
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
                        <dd>{companyconglomerate.name}</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Código </dt>
                        <dd> {company.code} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Nit </dt>
                        <dd>{company.nit} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Nombre </dt>
                        <dd>{company.name}</dd>
                      </dl>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Descripción </dt>
                        <dd>{company.description}</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Estado </dt>
                        <dd>{statusCompany(company.status)}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <br />
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
                    <CardBody>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <dl className="param">
                              <dt>Cargo responsable </dt>
                              <dd> {chargeStatus(company.charge)}</dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <dl className="param">
                              <dt> Fecha de creación </dt>
                              <dd> {company.createdAt} </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <dl className="param">
                              <dt> Fecha de modificación </dt>
                              <dd> {company.updatedAt} </dd>
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
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              {" "}
              <i className="fa fa-times" /> Cerrar{" "}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewEmpresa.propTypes = {
  modalviewempresa: PropTypes.bool.isRequired
};

export default ModalViewEmpresa;
