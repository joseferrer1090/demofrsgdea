import React, { Component } from "react";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import PropTypes from "prop-types";

class ModalEditSedes extends Component {
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
          <ModalHeader> Actualizar sede </ModalHeader>
          <ModalBody>
            <div className="table-responsive">
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td>Código:</td>
                    <td>
                      {" "}
                      <input type="text" className="form-control" />{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>Nombre:</td>
                    <td>
                      {" "}
                      <input type="text" className="form-control" />{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>Prefijo de radicación:</td>
                    <td>
                      {" "}
                      <input type="text" className="form-control" />{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>Dirección:</td>
                    <td>
                      {" "}
                      <input type="text" className="form-control" />{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>Teléfono:</td>
                    <td>
                      {" "}
                      <input type="text" className="form-control" />{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>Secuencia de radicación:</td>
                    <td>
                      {" "}
                      <input type="text" className="form-control" />{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>País:</td>
                    <td>
                      {" "}
                      <select className="form-control">
                        {" "}
                        <option> Seleccione </option>{" "}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Departamento:</td>
                    <td>
                      {" "}
                      <select className="form-control">
                        {" "}
                        <option> Seleccione </option>{" "}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Ciudad:</td>
                    <td>
                      <select className="form-control">
                        {" "}
                        <option> Seleccione </option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Estado:</td>
                    <td>
                      {" "}
                      <select className="form-control">
                        {" "}
                        <option> Activada </option>{" "}
                        <option> Desactivada </option>{" "}
                      </select>{" "}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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

ModalEditSedes.propTypes = {
  modaledit: PropTypes.bool.isRequired
};

export default ModalEditSedes;
