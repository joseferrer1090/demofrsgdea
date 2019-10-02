import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Card,
  CardTitle,
  CardText,
  UncontrolledAlert
} from "reactstrap";
import { Formik, ErrorMessage, FormikProps, Form, Field } from "formik";
import * as Yup from "yup";

class ModalEditPermissionRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      modal: this.props.modaleditpermission,
      dataPermisos: []
    };
  }

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
  };

  render() {
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}></Modal>
        <ModalHeader>Editar Permisos rol</ModalHeader>
        <Formik>
          {props => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset
            } = props;
            return (
              <Fragment>
                <ModalBody>
                  <p>Hola mundo</p>
                </ModalBody>
                <ModalFooter>
                  <button>Probando</button>
                </ModalFooter>
              </Fragment>
            );
          }}
        </Formik>
      </Fragment>
    );
  }
}

ModalEditPermissionRoles.propTypes = {
  id: PropTypes.string.isRequired,
  modal: PropTypes.bool.isRequired
};

export default ModalEditPermissionRoles;
