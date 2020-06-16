import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import Inputs from "./../components/Forms/components/Inputs";

class ModalEditValuesTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaledit,
      auth: this.props.authorization,
      type: "",
      data: this.props.data,
    };
  }

  toggle = (type) => {
    this.setState({
      modal: !this.state.modal,
      type: type,
    });
  };

  render() {
    console.log(this.state.type);
    console.log(this.props.data);
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>Editar Valor de la plantilla</ModalHeader>
          <ModalBody>
            <Inputs formType={this.state.type} />
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-secondary btn-sm">
              {" "}
              Editar
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() =>
                this.setState({
                  modal: false,
                })
              }
            >
              {" "}
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

ModalEditValuesTemplate.propTypes = {
  data: PropTypes.array,
};

export default ModalEditValuesTemplate;
