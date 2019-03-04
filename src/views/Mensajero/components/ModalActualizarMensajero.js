import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Row,
  Col
} from "reactstrap";
import PropTypes from "prop-types";
import ImgMensajero from "./../../../assets/img/courier.svg";

class ModalActualizarMensajero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalupdate
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  render() {
    return (
      <Modal className="modal-lg" isOpen={this.state.modal}>
        <ModalHeader>Actualizar mensajero</ModalHeader>
        <ModalBody>
          <Row>
            <Col sm="3">
              <img src={ImgMensajero} />
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
                      <dt>Identificación </dt>
                      <dd>
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
                      <dt>Nombre </dt>
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
                      <dt>Descripción </dt>
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
                      <dt>Estado </dt>
                      <dd>
                        {" "}
                        <select className="form-control form-control-sm">
                          <option>Seleccione ...</option>
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
          <button className="btn btn-success btn-sm">
            <i className="fa fa-pencil" /> Actualizar
          </button>
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
    );
  }
}

ModalActualizarMensajero.propTypes = {
  modalupdate: PropTypes.bool.isRequired
};

export default ModalActualizarMensajero;
