import React, { Component, cloneElement } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";
import { compose } from "redux";

class ModalPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalPreview: this.props.modalpreview,
      type: this.props.inputType
    };
  }
  toggle = () => {
    this.setState({
      modalPreview: !this.state.modalPreview
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (props.inputType !== state.type) {
      return {
        type: props.inputType
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.inputType !== prevProps.inputType) {
      this.setState({
        type: this.props.inputType
      });
    }
  }

  render() {
    console.log(this.state.type);
    return (
      <Modal isOpen={this.state.modalPreview} toggle={this.toggle}>
        <ModalHeader> Metadato </ModalHeader>
        <ModalBody>
          <p>Probando</p>
        </ModalBody>
        <ModalFooter>
          <div className="pull-right">
            <button
              className="btn btn-secondary btn-sm"
              onClick={e => {
                this.setState({ modalPreview: false });
              }}
            >
              <i className="fa fa-times" style={{ color: "red" }} /> Cerrar
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalPreview.propType = {
  inputType: PropTypes.string,
  modalpreview: PropTypes.bool.isRequired
};
export default ModalPreview;
