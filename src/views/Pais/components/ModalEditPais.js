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

import IMGCOUNTRY from "./../../../assets/img/flag.svg";

class ModalEditPais extends Component {
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
          <ModalHeader> Actualizar país </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGCOUNTRY} className="img-thumbnail" />
              </Col>
              <Col sm="9">
                <div className="">
                  {" "}
                  <h5 className="" style={{ borderBottom: "1px solid black" }}>
                    {" "}
                    Datos{" "}
                  </h5>{" "}
                </div>
                <form className="form">
                  <div className="row">
                    <div className="col-md-6">
                      <label>
                        {" "}
                        Código <span className="text-danger">*</span>
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          {" "}
                          Nombre <span className="text-danger">*</span>{" "}
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>
                          {" "}
                          Estado <span className="text-danger">*</span>{" "}
                        </label>
                        <select className="form-control">
                          {" "}
                          <option> Seleccione... </option>{" "}
                        </select>
                      </div>
                    </div>
                  </div>
                  .
                </form>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-outline-success">
              {" "}
              <i className="fa fa-pencil" /> Actualizar{" "}
            </button>
            <button
              type="button"
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

ModalEditPais.propTypes = {
  modaledit: PropTypes.bool.isRequired
};

export default ModalEditPais;
