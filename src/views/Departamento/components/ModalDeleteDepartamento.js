import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import * as Yup from "yup";
import { Formik, withFormik, ErrorMessage, Field, From} from 'formik';

class ModalDeleteDepartamento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldel,
      idDepartment: this.props.id,
      nombre:"",
      useLogged:""
    };
  }

  toggle = (id) => {
    this.setState({
      modal: !this.state.modal,
      idDepartment:id,
      nombre:"",
      useLogged:"ccuartas"
    });
  };

  render() {
    const dataInitial ={
      nombre:""
    }
    return (
      <Fragment>
        <Modal isOpen={this.state.modal}>
          <ModalHeader> Eliminar departamento </ModalHeader>
          <Formik
          initialValues={dataInitial}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              fetch(
                `http://192.168.10.180:7000/api/sgdea/department/${
                  this.state.idDepartment
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
            nombre: Yup.string().required("Por favor introduzca un nombre.")
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
                Confirmar el <code> Nombre </code> para eliminar el departamento{" "}
              </p>

              <input
                input
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
                El departamento quedará eliminado de manera permanente.{" "}
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

ModalDeleteDepartamento.propTypes = {
  modaldel: PropTypes.bool.isRequired
};

export default ModalDeleteDepartamento;
