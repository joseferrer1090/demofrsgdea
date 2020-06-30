import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Formik from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { obtenerEstadoCorrespondenciaID } from "./../../../actions/statusCorrespondenceActions";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

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
    this.getDate(id);
  };

  getDate = (id) => {
    this.props.getDataEdit(id);
  };

  render() {
    const estado = this.props.estadoEdit;
    console.log(estado);
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
  return {
    estadoEdit: state.statusCorrespondenceReducer.estado,
  };
}

function mapDispatch(dispatch) {
  return {
    getDataEdit: (id) => {
      dispatch(obtenerEstadoCorrespondenciaID(id));
    },
  };
}

export default connect(mapState, mapDispatch, null, { forwardRef: true })(
  ModalEditStatus
);
