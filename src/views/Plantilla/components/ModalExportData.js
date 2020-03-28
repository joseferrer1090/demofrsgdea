import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalExportData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalexport
    };
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  render() {
    return (
      <Modal className={"modal-lg"} isOpen={this.state.modal}>
        <ModalHeader>
          {" "}
          <i className="fa fa-download" /> Exportar datos de la tabla
        </ModalHeader>
        <ModalBody>
          <p>Probando apenas</p>
        </ModalBody>
        <ModalFooter>
          <div className="pull-right">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({
                  modal: false
                });
              }}
            >
              <i className="fa fa-times" /> Cerrar
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalExportData.propTypes = {};

export default ModalExportData;
