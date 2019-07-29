import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "reactstrap";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";

class ModalDeleteDependencia extends Component {
  state = {
    modal: this.props.modalDel,
    nombre: ""
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    const dataInit = {
      nombre: ""
    };
    return (
      <Fragment>
        <Modal isOpen={this.state.modal}>
          <ModalHeader> Eliminar dependencia </ModalHeader>
          <Formik
            initialValues={dataInit}
            validationSchema={Yup.object().shape({
              nombre: Yup.string().required(
                "nombre necesario para eliminar la dependencia"
              )
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(values, "", 2);
                setSubmitting(false);
              }, 1000);
            }}
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
