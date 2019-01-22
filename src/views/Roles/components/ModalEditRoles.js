import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalEditRoles extends Component {
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
        <ModalHeader> Actualizar roles </ModalHeader>
        <ModalBody>
          <div className="table-resposive">
            <table className="table table-striped">
              <tbody>
                <tr>
                  <td> Código: </td>
                  <td>
                    {" "}
                    <input type="text" className="form-control" />{" "}
                  </td>
                </tr>
                <tr>
                  <td> Nombre: </td>
                  <td>
                    {" "}
                    <input type="text" className="form-control" />{" "}
                  </td>
                </tr>
                <tr>
                  <td> Descripción: </td>
                  <td>
                    {" "}
                    <textarea className="form-control" />{" "}
                  </td>
                </tr>
                <tr>
                  <td> Estado: </td>
                  <td>
                    {" "}
                    <select className="form-control">
                      {" "}
                      <option> Activo </option> <option> Desactivo </option>{" "}
                    </select>{" "}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-outline-success">
            {" "}
            <i className="fa fa-pencil" /> Actulizar{" "}
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
    );
  }
}

ModalEditRoles.propTypes = {
  modaledit: PropTypes.bool.isRequired
};

export default ModalEditRoles;
