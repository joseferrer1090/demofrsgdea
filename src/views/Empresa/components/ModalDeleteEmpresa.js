import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import * as Yup from "yup";
import { Formik, withFormik, ErrorMessage } from "formik";

class ModalDeleteEmpresa extends React.Component {
  state = {
    modal: this.props.modaldelempresa,
    idCompany: this.props.id
  };

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      idCompany: id,
      useLogged: "jferrer"
    });
  };

  render() {
    const dataInitial = {
      nombre: ""
    };
    console.log(this.state.idCompany);
    return (
      <Fragment>
        <Modal isOpen={this.state.modal}>
          <ModalHeader> Eliminar conglomerado </ModalHeader>
          <Formik
            initialValues={dataInitial}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                fetch(
                  `http://192.168.10.180:7000/api/sgdea/company/${
                    this.state.idCompany
                  }?name=${values.nombre}&username=${this.state.useLogged}`,
                  {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Basic " + window.btoa("sgdea:123456")
                    }
                  }
                )
                  .then(response => {
                    this.setState({
                      modal: false
                    });
                  })
                  .catch(error => console.log("", error));
                setSubmitting(false);
              }, 3000);
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
                      <p className="text-center">
                        {" "}
                        Confirmar el <code> Nombre </code> para eliminar la
                        empresa{" "}
                      </p>

                      <input
                        type="text"
                        placeholder="nombre de la empresa a eliminar"
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
                        La empresa quedará elimanado de manera permanente{" "}
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

ModalDeleteEmpresa.propTypes = {
  modaldelempresa: PropTypes.bool.isRequired
};

export default ModalDeleteEmpresa;
