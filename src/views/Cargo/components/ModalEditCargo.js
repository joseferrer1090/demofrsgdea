import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalEditCargo extends Component {
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
      <Modal isOpen={this.state.modal}>
        <ModalHeader> Actualizar cargo </ModalHeader>
        <ModalBody>
          <form className="form">
            <div className="table-responsive">
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td>Código</td>
                    <td>
                      {" "}
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder=""
                      />{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>Nombre</td>
                    <td>
                      {" "}
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder=""
                      />{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>Descripción</td>
                    <td>
                      {" "}
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder=""
                      />{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>Estado</td>
                    <td>
                      <select className="form-control">
                        <option>Activo</option>
                        <option> Inactivo </option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-outline-success">
            {" "}
            <i className="fa fa-pencil" /> Actualizar{" "}
          </button>
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
    );
  }
}

ModalEditCargo.propTypes = {
  modaledit: PropTypes.bool.isRequired
};

export default ModalEditCargo;
