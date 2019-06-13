import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col
} from "reactstrap";

import IMGTIPODOCUMENTALRADICACION from "./../../../assets/img/file-path.svg";

class FormEditTipoDocumental extends Component {
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
      <Modal className="modal-lg" isOpen={this.state.modal}>
        <ModalHeader> Actualizar tipo documental radicación </ModalHeader>
        <ModalBody>
          <Row>
            <Col sm="3">
              <img
                src={IMGTIPODOCUMENTALRADICACION}
                className="img-thumbnail"
                width="170"
              />
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
                    <label>
                      {" "}
                      Código <span className="text-danger">*</span>{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      {" "}
                      Nombre <span className="text-danger">*</span>{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      {" "}
                      Descripción <span className="text-danger">*</span>{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      {" "}
                      Estado <span className="text-danger">*</span>{" "}
                    </label>
                    <select className="form-control form-control-sm">
                      {" "}
                      <option> Seleccione... </option>{" "}
                    </select>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
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
    );
  }
}

FormEditTipoDocumental.propTypes = {
  modaledit: PropTypes.bool.isRequired
};

export default FormEditTipoDocumental;
