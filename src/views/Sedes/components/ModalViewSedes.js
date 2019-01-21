import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalViewSedes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalview
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
          <ModalHeader> Ver sede </ModalHeader>
          <ModalBody>
            <div className="container">
              <form className="form">
                <div className="row">
                  <div className="col-md-4">
                    <dl className="param">
                      <dt>Código </dt>
                      <dd> THE WORLD BANK</dd>
                    </dl>
                  </div>
                  <div className="col-md-4">
                    <dl className="param">
                      <dt>Nombre </dt>
                      <dd> THE WORLD BANK</dd>
                    </dl>
                  </div>
                  <div className="col-md-4">
                    <dl className="param">
                      <dt>Descripción </dt>
                      <dd> THE WORLD BANK</dd>
                    </dl>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-6">
                    <dl className="param">
                      <dt>Conglomerado </dt>
                      <dd> THE WORLD BANK</dd>
                    </dl>
                  </div>
                  <div className="col-md-6">
                    <dl className="param">
                      <dt>Empresa: </dt>
                      <dd> THE WORLD BANK</dd>
                    </dl>
                  </div>
                  <div className="col-md-6">
                    <dl className="param">
                      <dt>Prefijo de radicación </dt>
                      <dd> THE WORLD BANK</dd>
                    </dl>
                  </div>
                  <div className="col-md-6">
                    <dl className="param">
                      <dt>Secuencia de radicacioón </dt>
                      <dd> THE WORLD BANK</dd>
                    </dl>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-4">
                    <dl className="param">
                      <dt>Pais </dt>
                      <dd> THE WORLD BANK</dd>
                    </dl>
                  </div>
                  <div className="col-md-4">
                    <dl className="param">
                      <dt>Departamento </dt>
                      <dd> THE WORLD BANK</dd>
                    </dl>
                  </div>
                  <div className="col-md-4">
                    <dl className="param">
                      <dt>Ciudad </dt>
                      <dd> THE WORLD BANK</dd>
                    </dl>
                  </div>
                  <div className="col-md-4">
                    <dl className="param">
                      <dt>Dirección: </dt>
                      <dd> THE WORLD BANK</dd>
                    </dl>
                  </div>
                  <div className="col-md-4">
                    <dl className="param">
                      <dt>Telefono </dt>
                      <dd> THE WORLD BANK</dd>
                    </dl>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-6">
                    <dl className="param">
                      <dt>Cargo </dt>
                      <dd> THE WORLD BANK</dd>
                    </dl>
                  </div>
                  <div className="col-md-6">
                    <dl className="param">
                      <dt>Estado </dt>
                      <dd> THE WORLD BANK</dd>
                    </dl>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-6">
                    <dl className="param">
                      <dt>Fecha de creación </dt>
                      <dd> THE WORLD BANK</dd>
                    </dl>
                  </div>
                  <div className="col-md-6">
                    <dl className="param">
                      <dt>Fecha de modificación </dt>
                      <dd> THE WORLD BANK</dd>
                    </dl>
                  </div>
                </div>
              </form>
            </div>
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

ModalViewSedes.propTypes = {
  modalview: PropTypes.bool.isRequired
};

export default ModalViewSedes;
