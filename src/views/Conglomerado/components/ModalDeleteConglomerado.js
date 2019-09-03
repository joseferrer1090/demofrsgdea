import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalFooter, ModalBody, Alert } from "reactstrap";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik, withFormik, ErrorMessage, Field, From } from "formik";
import { Trans } from "react-i18next";

class ModalDeleteConglomerado extends React.Component {
  state = {
    modal: this.props.modaldeletestate,
    idConglomerado: this.props.id,
    alertSuccess: false,
    alertError: false,
    alertName: false,
    t: this.props.t
  };

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      nombre: "",
      idConglomerado: id,
      useLogged: "jferrer"
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
    const dataInitial = {
      nombre: ""
    };
    return (
      <Fragment>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>
            {" "}
            {this.props.t("app_conglomerado_modal_eliminar_titulo")}
          </ModalHeader>
          <Formik
            initialValues={dataInitial}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                fetch(
                  `http://192.168.10.180:7000/api/sgdea/conglomerate/${this.state.idConglomerado}?name=${values.nombre}&username=${this.state.useLogged}`,
                  {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "BASIC " + window.btoa("sgdea:123456")
                    }
                  }
                )
                  .then(response => {
                    console.log(response);
                    if (response.status === 500) {
                      this.setState({
                        alertError: true
                      });
                      setTimeout(() => {
                        this.setState({
                          modal: false,
                          alertError: false
                        });
                      }, 3000);
                    } else if (response.status === 204) {
                      this.setState({
                        alertSuccess: true
                      });
                      setTimeout(() => {
                        this.setState({
                          modal: false,
                          alertSuccess: false
                        });
                      }, 3000);
                    } else if (response.status === 400) {
                      this.setState({
                        alertName: true
                      });
                      setTimeout(() => {
                        this.setState({
                          alertName: false
                        });
                      }, 3000);
                    }
                  })
                  .catch(error => console.log(" ", error));
                setSubmitting(false);
              }, 500);
            }}
            validationSchema={Yup.object().shape({
              nombre: Yup.string().required(
                " Por favor introduzca el nombre del conglomerado."
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
                        El conglomerado a eliminar, esta asociado a otras
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
                        className="text-center"
                        color="success"
                        isOpen={this.state.alertSuccess}
                        toggle={this.onDismiss}
                      >
                        El conglomerado ha sido eliminado con exito.
                      </Alert>

                      <p className="text-center">
                        {" "}
                        {this.props.t(
                          "app_conglomerado_modal_eliminar_informacion"
                        )}
                      </p>

                      <input
                        type="text"
                        placeholder={this.props.t(
                          "app_conglomerado_modal_eliminar_placeholder"
                        )}
                        style={{ textAlign: "center" }}
                        name="nombre"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.nombre}
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
                      {/* <div className="text-center">
                        <ErrorMessage name={"nombre"} />
                      </div> */}
                      <br />
                      <p className="text-center text-danger">
                        {" "}
                        {this.props.t(
                          "app_conglomerado_modal_eliminar_informacion_2"
                        )}{" "}
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
                      <i className="fa fa-trash" />{" "}
                      {this.props.t("app_conglomerado_modal_eliminar_boton")}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({
                          modal: false,
                          alertError: false,
                          alertName: false,
                          alertSuccess: false
                        });
                      }}
                    >
                      <i className="fa fa-times" />{" "}
                      {this.props.t("app_conglomerado_modal_eliminar_boton_2")}{" "}
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

ModalDeleteConglomerado.propTypes = {
  modaldeletestate: PropTypes.bool.isRequired,
  t: PropTypes.any
};

export default ModalDeleteConglomerado;
