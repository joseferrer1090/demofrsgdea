import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import * as Yup from "yup";
import { Formik, ErrorMessage, Field } from "formik";

class ModalDeleteCiudad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldel,
      idCity: this.props.id,
      nombre:"",
      useLogged:""
    };
  }

  toggle = (id) => {
    this.setState({
      modal: !this.state.modal,
      idCity:id,
      nombre:"",
      useLogged:"ccuartas"
    });
  };

  render() {
    const dataPreview = {
      nombre: ""
    };
    return (
      <Fragment>
        <Modal isOpen={this.state.modal}>
          <ModalHeader> Eliminar ciudad </ModalHeader>
          <Formik
          initialValues={dataPreview}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              fetch(
                `http://192.168.10.180:7000/api/sgdea/city/${
                  this.state.idCity
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
                  this.setState({ modal: false });
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
              <p className="text-center">
                {" "}
                Confirmar el <code> Nombre </code> para eliminar el ciudad{" "}
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
                La ciudad quedará eliminada de manera permanente.{" "}
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

ModalDeleteCiudad.propTypes = {
  modaldel: PropTypes.bool.isRequired
};

export default ModalDeleteCiudad;
