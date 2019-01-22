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
              <table className="table table-striped">
                <thead>
                  <tr>
                    <td>Dessert (100g serving)</td>
                    <td numeric>Calories</td>
                    <td numeric>Fat (g)</td>
                    <td numeric>Carbs (g)</td>
                    <td numeric>Protein (g)</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>nombre</td>
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
