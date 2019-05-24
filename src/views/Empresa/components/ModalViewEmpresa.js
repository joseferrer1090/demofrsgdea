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
      collapase: false
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  toggleCollapse = () => {
    this.setState({
      collapase: !this.state.collapase
    });
  };

  render() {
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader> Ver empresa </ModalHeader>
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
                        <dd>conglomerado </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt>Código </dt>
                      <dd> codigo </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Nit </dt>
                        <dd>nit </dd>
                      </dl>
                    </div>
                  </div>
                <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Nombre </dt>
                        <dd>nombre </dd>
                      </dl>
                    </div>
                  </div>



                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Descripción </dt>
                        <dd> descripción </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Estado </dt>
                        <dd> estado </dd>
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
                              <dd> cargo responsable </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <dl className="param">
                              <dt> Fecha de creación </dt>
                              <dd> fecha de creación </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <dl className="param">
                              <dt> Fecha de modificación </dt>
                              <dd> fecha de modificación </dd>
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
              className="btn btn-secondary"
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
