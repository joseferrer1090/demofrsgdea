import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

class ModalEditDependencia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalView
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
        <Modal isOpen={this.state.modal}>
          <ModalHeader> Actualizar dependecia </ModalHeader>
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
                      <td>Rol responsable</td>
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
                      <td>Sede</td>
                      <td>
                        {" "}
                        <select className="form-control">
                          <option> Sede 1 </option>
                          <option> Sede 2 </option>
                          <option> Sede 3 </option>
                        </select>{" "}
                      </td>
                    </tr>
                    <tr>
                      <td>Estado</td>
                      <td>
                        {" "}
                        <select className="form-control">
                          <option>Activa</option>
                          <option>Inactiva</option>
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
            <Button
              className="btn btn-secondary"
              onClick={() => {
                this.setState({
                  modal: false
                });
              }}
            >
              <i className="fa fa-times" /> Cerrar{" "}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalEditDependencia.propTypes = {
  modalEdit: PropTypes.bool.isRequired
};

export default ModalEditDependencia;
