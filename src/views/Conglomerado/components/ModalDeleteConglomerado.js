import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalFooter, ModalBody, Alert } from "reactstrap";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik, withFormik, ErrorMessage, Field, From } from "formik";

class ModalDeleteConglomerado extends React.Component {
  state = {
    modal: this.props.modaldeletestate,
    idConglomerado: this.props.id,
    alertError: false,
    alertName: false
  };

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      nombre: "",
      idConglomerado: id,
      useLogged: "jferrer"
    });
  };

  onDismiss = () =>{
    this.setState({
      alertError: false,
      alertName:false
    })
  }


  render() {
    const dataInitial = {
      nombre: ""
    };
    return (
      <Fragment>
        <Modal isOpen={this.state.modal}>
          <ModalHeader> Eliminar conglomerado </ModalHeader>
          <Formik
            initialValues={dataInitial}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                fetch(
                  `http://192.168.10.180:7000/api/sgdea/conglomerate/${
                    this.state.idConglomerado
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
                      })
                    } else if (response === 204) {
                      this.setState({ modal: false });
                    } else if(response.status === 400){
                      this.setState({
                        alertName: true
                      })
                    }
                  })
                  .catch(error => console.log(" ", error));
                setSubmitting(false);
              }, 500);
            }}
            validationSchema={Yup.object().shape({
              nombre: Yup.string().required("necesario nombre para eliminacion")
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
                      <Alert className="text-center" color="danger" isOpen={this.state.alertError} toggle={this.onDismiss}>
                        El conglomerado que va a eliminar, esta asociado a otras entidades.
                      </Alert>
                      <Alert color="danger" isOpen={this.state.alertName} toggle={this.onDismiss}>
                        Por favor introduzca un nombre valido.
                      </Alert>
                      <p className="text-center">
                        {" "}
                        Confirmar el <code> Nombre </code> para eliminar el
                        conglomerado{" "}
                      </p>

                      <input
                        type="text"
                        placeholder="nombre del conglomerado a eliminar"
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
                        El conglomerado quedará elimanado de manera permanente{" "}
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

ModalDeleteConglomerado.propTypes = {
  modaldeletestate: PropTypes.bool.isRequired
};

export default ModalDeleteConglomerado;
