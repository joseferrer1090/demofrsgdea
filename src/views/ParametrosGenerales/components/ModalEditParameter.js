import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Formik, ErrorMessage, Field } from "formik";
import {
  PARAMETERS_FIND_BY_ID,
  PARAMTERS_UPDATE,
  PARAMETERS_INPUTS
} from "./../../../services/EndPoints";
import * as Yup from "yup";
import { decode } from "jsonwebtoken";

class ModalEditParameter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalEditParameter,
      idParameter: this.props.id,
      dataResult: {},
      auth: this.props.authorization
    };
  }
  render() {
    return (
      <Modal className="" isOpen={this.state.modal}>
        <ModalHeader>Parametro</ModalHeader>
        <Formik>
          <React.Fragment>
            <ModalBody>
              <p>Probando</p>
            </ModalBody>
          </React.Fragment>
        </Formik>
      </Modal>
    );
  }
}

ModalEditParameter.propTypes = {
  authorization: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default ModalEditParameter;
