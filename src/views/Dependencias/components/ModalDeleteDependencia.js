import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Alert
} from "reactstrap";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";

class ModalDeleteDependencia extends Component {
  state = {
    modal: this.props.modalDel,
    nombre: "",
    id: this.props.id,
    userLogged: "jferrer",
    alertError: false,
    alertName: false,
    alertSuccess: false
  };

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
  };

  onDismiss = () => {
    this.setState({
      alertError: false,
      alertName: false,
      alertSuccess: false
    });
  };

  render() {
    const dataInit = {
      nombre: ""
    };
    console.log(this.state.id);
    return (
      <Fragment>
        <Modal isOpen={this.state.modal}>
          <ModalHeader> Eliminar dependencia </ModalHeader>
          <Formik
            initialValues={dataInit}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                fetch(
                  `http://192.168.10.180:7000/api/sgdea/dependence/${
                    this.state.id
                  }?name=${values.nombre}&username=${this.state.userLogged}`,
                  {
                    method: "DELETE",
                    headers: {
                      Authorization: "Basic " + window.btoa("sgdea:123456")
                    }
                  }
                )
                  .then(response => {
                    if (response.status === 500) {
                      this.setState({
                        alertError: true
                      });
                      setTimeout(() => {
                        this.setState({
                          alertError: false,
                          modal: false
                        });
                      }, 2000);
                    } else if (response.status === 204) {
                      this.setState({
                        alertSuccess: true
                      });
                      setTimeout(() => {
                        this.setState({
                          alertSuccess: false,
                          modal: false
                        });
                      }, 2000);
                    } else if (response.status === 400) {
                      this.setState({
                        alertName: true
                      });
                      setTimeout(() => {
                        this.setState({
                          alertName: false,
                          modal: false
                        });
                      }, 2000);
                    }
                  })
                  .catch(Error => console.log("Error", Error));
                setSubmitting(false);
              }, 500);
            }}
            validationSchema={Yup.object().shape({
              nombre: Yup.string().required(
                "nombre necesario para eliminar la dependencia"
              )
            })}
          >
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
                    <form className="form">
                      <Alert
                        className="text-center"
                        color="danger"
                        isOpen={this.state.alertError}
                        toggle={this.onDismiss}
                      >
                        La dependencia que va a eliminar, esta asociado a otras
                        entidades.
                      </Alert>
                      <Alert
                        color="danger"
                        isOpen={this.state.alertName}
                        toggle={this.onDismiss}
                      >
                        Por favor introduzca un nombre valido.
                      </Alert>
                      <Alert
                        color="success"
                        isOpen={this.state.alertSuccess}
                        toggle={this.onDismiss}
                      >
                        Se elemino la dependencia
                      </Alert>
                      <p className="text-center">
                        {" "}
                        Confirmar el <code> Nombre </code> para eliminar la
                        dependencia{" "}
                      </p>

                      <input
                        name="nombre"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.nombre}
                        className={`form-control form-control-sm col-sm-6 offset-sm-3 ${errors.nombre &&
                          touched.nombre &&
                          "is-invalid"}`}
                        type="text"
                        placeholder="nombre de la dependencia a eliminar"
                        style={{ textAlign: "center" }}
                      />
                      <div className="text-center" style={{ color: "#D54B4B" }}>
                        {errors.nombre && touched.nombre ? (
                          <i class="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="nombre" />
                      </div>
                      <br />
                      <p className="text-center text-danger">
                        {" "}
                        La dependencia quedará eliminada de manera permanente.{" "}
                      </p>
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      type="button"
                      className={"btn btn-outline-danger btn-sm"}
                      onClick={e => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      <i className="fa fa-trash" /> Eliminar
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({ modal: false });
                      }}
                    >
                      <i className="fa fa-times" /> Cerrar{" "}
                    </button>
                  </ModalFooter>
                </Fragment>
              );
            }}
          </Formik>
        </Modal>
      </Fragment>
    );
  }
}

ModalDeleteDependencia.propTypes = {
  modalDel: PropTypes.bool.isRequired
};

export default ModalDeleteDependencia;
