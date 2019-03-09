import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import ReactTableContainer from "react-table-container";

class ModalViewUserTipoDocumentalRadicacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalviewusers,
      backdrop: true
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <Modal
        className="modal-lg"
        isOpen={this.state.modal}
        backdrop={this.state.backdrop}
      >
        <ModalHeader> Usuarios asignados </ModalHeader>
        <ModalBody>
          <div className="table-responsive">
            <ReactTableContainer width="100%" height="300px">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <td>Nombre</td>
                    <td numeric>sede</td>
                    <td numeric>Dependencia</td>
                    <td numeric>Cargo</td>
                    <td numeric>Otro</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td numeric>1</td>
                    <td numeric>1</td>
                    <td numeric>1</td>
                    <td numeric>1</td>
                    <td numeric>1</td>
                  </tr>
                </tbody>
              </table>
            </ReactTableContainer>
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

ModalViewUserTipoDocumentalRadicacion.propTypes = {
  modalviewusers: PropTypes.bool.isRequired
};

export default ModalViewUserTipoDocumentalRadicacion;
