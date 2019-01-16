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
              <div className="row">
                <div className="col-md-12">
                  <table className="table table-striped table-hover">
                    <tbody>
                      <tr>
                        <td>
                          <dl className="param">
                            <dt>Código: </dt>
                            <dd> THE WORLD BANK</dd>
                          </dl>
                        </td>
                        <td>
                          <dl className="param">
                            <dt>Empresa: </dt>
                            <dd> 12345678912345</dd>
                          </dl>
                        </td>
                        <td>
                          <dl className="param">
                            <dt>Nombre: </dt>
                            <dd> 123456789</dd>
                          </dl>
                        </td>
                        <td>
                          <dl className="param">
                            <dt>Fecha de creación: </dt>
                            <dd> dd/mm/aaaa</dd>
                          </dl>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <dl className="param">
                            <dt>Prefijo de radicación: </dt>
                            <dd> THE WORLD BANK</dd>
                          </dl>
                        </td>
                        <td>
                          <dl className="param">
                            <dt>Dirección: </dt>
                            <dd> 12345678912345</dd>
                          </dl>
                        </td>
                        <td>
                          <dl className="param">
                            <dt>Teléfono: </dt>
                            <dd> 123456789</dd>
                          </dl>
                        </td>
                        <td>
                          <dl className="param">
                            <dt>Fecha de modificación: </dt>
                            <dd> dd/mm/aaaa</dd>
                          </dl>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <dl className="param">
                            <dt>Secuencia de radicación: </dt>
                            <dd> THE WORLD BANK</dd>
                          </dl>
                        </td>
                        <td>
                          <dl className="param">
                            <dt>Ciudad: </dt>
                            <dd> 12345678912345</dd>
                          </dl>
                        </td>
                        <td>
                          <dl className="param">
                            <dt>Rol responsable: </dt>
                            <dd> 123456789</dd>
                          </dl>
                        </td>
                        <td>
                          <dl className="param">
                            <dt>Estado: </dt>
                            <dd> activo / inactivo </dd>
                          </dl>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
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
