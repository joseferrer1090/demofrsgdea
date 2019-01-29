import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Row,
  Col,
  Collapse,
  Card,
  CardHeader,
  CardBody
} from "reactstrap";

import IMGGROUPOS from "./../../../assets/img/multiple-users-silhouette.svg";

class ModalViewPais extends Component {
  constructor(props) {
    super(props);
    this.state = { modal: this.props.modalview, collapse: false };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  toggleCollapse = () => {
    this.setState({
      collapse: !this.state.collapse
    });
  };

  render() {
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader> Ver grupo </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGGROUPOS} className="img-thumbnail" width="170" />
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
                        <dd> codigo </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt> Nombre </dt>
                        <dd> nombre </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt> Descripción </dt>
                        <dd> descripción </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt> Estado </dt>
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
                      Más informacion{" "}
                    </a>{" "}
                  </CardHeader>
                  <Collapse isOpen={this.state.collapse}>
                    <CardBody>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <dl className="param">
                              <dt> Fecha de creaciónn </dt>
                              <dd> fecha de creaciónn </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <dl className="param">
                              <dt> Fecha de modificación </dt>
                              <dd> fecha de modificación </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <dl className="param">
                              <dt> Usuarios </dt>
                              <dd>
                                {" "}
                                <textarea
                                  className="form-control"
                                  disabled
                                />{" "}
                              </dd>
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

ModalViewPais.propTypes = {
  modalview: PropTypes.bool.isRequired
};

export default ModalViewPais;
