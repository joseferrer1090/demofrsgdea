import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import Formik from "formik";
import * as Yup from "yup";

class ModalEditStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaledit,
    };
  }

  toggle = (id) => {
    this.setState({
      modal: !this.state.modal,
      id: id,
    });
  };

  render() {
    return (
      <Modal className="modal-lg" isOpen={this.state.modal}>
        <ModalHeader>Editar valores del estado</ModalHeader>
        <ModalBody>
          <p>Probando apenas</p>
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-secondary btn-sm">
            {" "}
            <i className="fa fa-pencil" /> Editar valores del estado
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => {
              this.setState({
                modal: false,
              });
            }}
          >
            {" "}
            <i className="fa fa-times" /> Cancelar
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalEditStatus.propTypes = {};

function mapState(state) {
  return { state };
}

function mapDispatch(dispatch) {}

export default connect(mapState, mapDispatch, null, { forwardRef: true })(
  ModalEditStatus
);
