import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";

class ModalDisabledTheme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldisabled
    };
  }
  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  render() {
    return (
      <Modal isOpen={this.state.modal}>
        <ModalHeader>Probando</ModalHeader>
        <ModalBody>
          <p>Probando</p>
        </ModalBody>
        <ModalFooter>
          <div>
            <button className="btn btn-danger btn-sm">
              {" "}
              <i className="fa fa-power-off" /> Desactivar{" "}
            </button>
            &nbsp;
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({
                  modal: false
                });
              }}
            >
              {" "}
              <i className="fa fa-times" /> Cerrar{" "}
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalDisabledTheme.propTypes = {
  modaldisabled: PropTypes.bool.isRequired
};

export default ModalDisabledTheme;
