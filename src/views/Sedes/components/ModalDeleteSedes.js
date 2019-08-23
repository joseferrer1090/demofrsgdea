import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Alert } from "reactstrap";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik, ErrorMessage, Field } from "formik";

class ModalDeleteSedes extends Component {
  state = {
    modal: this.props.modaldel,
    idSede: this.props.id,
    nombre:"",
    useLogged:"",
    alertError: false,
    alertName: false,
    alertSuccess: false,
  };

  toggle = (id) => {
    console.log(id);
    this.setState({
      modal: !this.state.modal,
      nombre:"",
      idSede: id,
      useLogged:"ccuartas"
    });
  };

  onDismiss = () => {
    this.setState({
      alertError: false,
      alertName: false,
      alertSuccess: false,
    });
  };

  render() {
    const dataPreview = {
      nombre: ""
    };
    return (
      <Fragment>
        <Modal isOpen={this.state.modal}>
          <ModalHeader> Eliminar sede </ModalHeader>
          <Formik
            initialValues={dataPreview}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                fetch(
                  `http://192.168.10.180:7000/api/sgdea/headquarter/${
                    this.state.idSede
                  }?name=${values.nombre}&username=${this.state.useLogged}`,
                  {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "BASIC " + window.btoa("sgdea:123456")
                    }
                  }
                )
                .then(response => {
                    if (response.status === 500) {
                      this.setState({
                        alertError: true
                      });
                    } else if (response.status === 204) {
                        this.setState({
                            alertSuccess: true
                      });
                      setTimeout(()=>{
                        this.setState({
                          modal:false,
                          alertSuccess: false
                        })
                    },3000)
                    } else if (response.status === 400) {
                      this.setState({
                        alertName: true
                      });
                    }
                  })
                .catch(error => console.log(" ", error));
                setSubmitting(false);
              }, 500);
            }}
            validationSchema={Yup.object().shape({
              nombre: Yup.string().required(
                "Es requirido el nombre para la eliminacion"
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
                        color="success"
                        isOpen={this.state.alertSuccess}
                        toggle={this.onDismiss}
                      >
                        La sede ha sido eliminada con exito.
                      </Alert>
                      <Alert
                        className="text-center"
                        color="danger"
                        isOpen={this.state.alertError}
                        toggle={this.onDismiss}
                      >
                        El conglomerado que va a eliminar, esta asociado a otras
                        entidades.
                      </Alert>
                      <Alert
                        color="danger"
                        isOpen={this.state.alertName}
                        toggle={this.onDismiss}
                      >
                        Por favor introduzca un nombre valido.
                      </Alert>
                      <p className="text-center">
                        {" "}
                        Confirmar el <code> Nombre </code> para eliminar el sede{" "}
                      </p>

                      <input
                        name={"nombre"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        placeholder="nombre para eliminar la sede"
                        style={{ textAlign: "center" }}
                        className={`form-control form-control-sm col-sm-6 offset-sm-3 ${errors.nombre &&
                          touched.nombre &&
                          "is-invalid"}`}
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
                        La sede quedará eliminada de manera permanente.{" "}
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
                        this.setState({
                            modal: false ,
                            alertError: false,
                            alertName: false,
                            alertSuccess: false,
                          });
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

ModalDeleteSedes.propTypes = {
  modaldel: PropTypes.bool.isRequired
};

export default ModalDeleteSedes;
