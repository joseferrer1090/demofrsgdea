import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

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
      <Modal isOpen={this.state.modal}>
        <ModalHeader> Actualizar tipo documental </ModalHeader>
        <ModalBody>
          <div className="table-responsive">
            <table className="table table-striped">
              <tr>
                <td> Código </td>
                <td>
                  {" "}
                  <input type="text" className="form-control" />{" "}
                </td>
              </tr>
              <tr>
                <td> Nombre </td>
                <td>
                  {" "}
                  <input type="text" className="form-control" />{" "}
                </td>
              </tr>
              <tr>
                <td> Dependencia </td>
                <td>
                  {" "}
                  <select className="form-control">
                    {" "}
                    <option>Seleccione</option>{" "}
                  </select>{" "}
                </td>
              </tr>
              <tr>
                <td> Horas de respuesta </td>
                <td>
                  {" "}
                  <input type="text" className="form-control" />{" "}
                </td>
              </tr>
              <tr>
                <td> Estado </td>
                <td>
                  {" "}
                  <select className="form-control">
                    <option> Activo </option>
                    <option> Inactivo </option>
                  </select>{" "}
                </td>
              </tr>
            </table>
          </div>
        </ModalBody>
        <ModalFooter>
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

FormEditTipoDocumental.propTypes = {
  modaledit: PropTypes.bool.isRequired
};

export default FormEditTipoDocumental;
