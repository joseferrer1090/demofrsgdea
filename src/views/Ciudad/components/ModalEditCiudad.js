import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Row,
  Col
} from "reactstrap";

import IMGCITY from "./../../../assets/img/skyline.svg";

class ModalEditCiudad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaledit
    };
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
          <ModalHeader> Actualizar ciudad </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGCITY} className="img-thumbnail" />
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
                        <dt>País </dt>
                        <dd>
                          {" "}
                          <select className="form-control form-control-sm">
                            {" "}
                            <option> Seleccione... </option>{" "}
                          </select>{" "}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt>Departamento </dt>
                      <dd>
                        {" "}
                        <select className="form-control form-control-sm">
                          {" "}
                          <option> Seleccione... </option>{" "}
                        </select>{" "}
                      </dd>
                    </dl>
                  </div>
                </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Código </dt>
                        <dd>
                          {" "}
                          <input
                            type="text"
                            className="form-control form-control-sm"
                          />
                        </dd>
                      </dl>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt> Nombre </dt>
                        <dd>
                          {" "}
                          <input
                            type="text"
                            className="form-control form-control-sm"
                          />{" "}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt> Estado </dt>
                        <dd>
                          {" "}
                          <select className="form-control form-control-sm">
                            {" "}
                            <option> Seleccione... </option>{" "}
                          </select>{" "}
                        </dd>
                      </dl>
                    </div>
                  </div>

                </div>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-outline-success btn-sm ">
              {" "}
              <i className="fa fa-pencil" /> Actualizar{" "}
            </button>
            <button
              type="button"
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

ModalEditCiudad.propTypes = {
  modaledit: PropTypes.bool.isRequired
};

export default ModalEditCiudad;
