import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { TEMPLATE_SHOW, TEMPLATE_UPDATE } from "./../../../services/EndPoints";
import { Formik } from "formik";
import * as Yup from "yup";

class ModalEditPlantilla extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaledit,
      auth: this.props.authorization,
      id: this.props.id
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization,
        id: this.props.id
      });
    }
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  render() {
    console.log(this.props);
    return (
      <Modal className={"modal-lg"} isOpen={this.state.modal}>
        <ModalHeader>Probando apenas</ModalHeader>
        <Formik>
          {props => {
            const {
              values,
              touched,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              setFieldTouched
            } = props;
            return (
              <React.Fragment>
                <ModalBody>
                  <p>Formulario de edicion </p>
                </ModalBody>
                <ModalFooter>
                  <div className="pull-right">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({ modal: false });
                      }}
                    >
                      {" "}
                      <i className="fa fa-times" /> Cancelar{" "}
                    </button>
                  </div>
                </ModalFooter>
              </React.Fragment>
            );
          }}
        </Formik>
      </Modal>
    );
  }
}

ModalEditPlantilla.propTypes = {
  authorization: PropTypes.string.isRequired
};

export default ModalEditPlantilla;
