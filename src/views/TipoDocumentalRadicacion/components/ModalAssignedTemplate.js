import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";

class ModalAssignedTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalassigned: this.props.modal,
      auth: this.props.athorization,
      t: this.props.t,
    };
  }
  toggle = () => {
    this.setState({
      modalassigned: !this.state.modalassigned,
    });
  };
  render() {
    return (
      <Modal
        className="modal-lg"
        isOpen={this.state.modalassigned}
        toggle={this.toggle}
      >
        <ModalHeader>
          <i className="fa fa-object-group" /> Asingar plantilla al tipo
          documental
        </ModalHeader>
        <ModalBody></ModalBody>
        <ModalFooter>
          <div>
            <button className="btn btn-secondary btn-sm">
              <i className="fa fa-check" />
              Asignar plantilla
            </button>
            &nbsp;
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => this.setState({ modalassigned: false })}
            >
              <i className="fa fa-times" /> Cerrar
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalAssignedTemplate.propTypes = {
  authorization: PropTypes.string.isRequired,
  t: PropTypes.any,
};

export default ModalAssignedTemplate;
