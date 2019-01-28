import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Row,
  Col
} from "reactstrap";

import IMGDEPARTAMENTO from "./../../../assets/img/map-marker.svg";

class ModalViewDepartamento extends Component {
  constructor(props) {
    super(props);
    this.state = { modal: this.props.modalview };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader> Ver departamento </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGDEPARTAMENTO} className="img-thumbnail" />
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
                    <dl className="param">
                      <dt> Código </dt>
                      <dd> codigo </dd>
                    </dl>
                  </div>
                  <div className="col-md-6">
                    <dl className="param">
                      <dt> Nombre del país </dt>
                      <dd> nombre del país </dd>
                    </dl>
                  </div>
                  <div className="col-md-6">
                    <dl className="param">
                      <dt> Estado </dt>
                      <dd> estado </dd>
                    </dl>
                  </div>
                  <div className="col-md-6">
                    <dl className="param">
                      <dt> Fecha de creación </dt>
                      <dd> fecha de creación </dd>
                    </dl>
                  </div>
                  <div className="col-md-6">
                    <dl className="param">
                      <dt> Fecha de modificacíoon </dt>
                      <dd> fecha de modificacíoon </dd>
                    </dl>
                  </div>
                </div>
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

ModalViewDepartamento.propTypes = {
  modalview: PropTypes.bool.isRequired
};

export default ModalViewDepartamento;
