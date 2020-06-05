import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";

class ModalAssignedTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalassigned: this.props.modal,
    };
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modalassigned,
    });
  };
  render() {
    return (
      <Modal isOpen={this.state.modalassigned} toggle={this.toggle}>
        <ModalHeader>
          <i className="fa fa-object-group" /> Asingar plantilla al tipo
          documental
        </ModalHeader>
        <ModalBody></ModalBody>
        <ModalFooter>
          <div>
            <button className="btn btn-secondary btn-sm">
              Asignar plantilla
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalAssignedTemplate.propTypes = {};

export default ModalAssignedTemplate;
