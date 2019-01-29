import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col
} from "reactstrap";
import PropTypes from "prop-types";
import IMGCARGO from "./../../../assets/img/employee.svg";

class ModalViewCargo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalviewcargo
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <Modal className="modal-lg" isOpen={this.state.modal}>
        <ModalHeader> Ver cargo </ModalHeader>
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
                      <dd> código </dd>
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
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt> Fecha de creación </dt>
                      <dd> fecha de creación </dd>
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
