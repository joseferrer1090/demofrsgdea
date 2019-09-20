import React, { Component, Fragment } from "react";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Alert,
  Card,
  CardBody
} from "reactstrap";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik, withFormik, ErrorMessage, Field, From } from "formik";

class ModalChangePasswordUser extends React.Component {
  state = {
    modal: this.props.modalpassword,
    id: this.props.id,
    userLogged: "ccuartas",
    nameUser: "",
    alertSuccess: false,
    alertError: false,
    alertCode: false
  };

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
    fetch(
      `http://192.168.10.180:7000/api/sgdea/user/${id}?username=${this.state.userLogged}`,
      {
        method: "GET",
        headers: {
          Authorization: "Basic " + window.btoa("sgdea:123456"),
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          nameUser: data.name
        });
      })
      .catch(Error => console.log(Error));
  };

  onDismiss = () => {
    this.setState({
      alertError: false,
      alertCode: false,
      alertSuccess: false
    });
  };

  render() {
    const dataInitial = {};
    console.log(this.state.id);
    return (
      <Fragment>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>Eliminar usuario {this.state.nameUser}</ModalHeader>
          <Formik
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                fetch(
                  `http://192.168.10.180:7000/api/sgdea/user/change/password`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Basic " + window.btoa("sgdea:123456")
                    },
                    body: JSON.stringify({
                      id: this.state.id,
                      password: values.newpassword,
                      passwordConfirm: values.confirmpassword,
                      userNameAuthenticate: this.state.userLogged
                    })
                  }
                ).then(response => {
                  if (response.status === 500) {
                    this.setState({
                      alertError: true
                    });
                    setTimeout(() => {
                      this.setState({
                        alertError: false
                      });
                    }, 2000);
                  } else if (response.status === 200) {
                    this.setState({
                      alertSuccess: true
                    });
                  }
                });
              }, 1000);
            }}
            validationSchema={Yup.object().shape({})}
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
                  <form className="form">
                    <ModalBody>
                      <Alert
                        color="danger"
                        isOpen={this.state.alertError}
                        toggle={this.onDismiss}
                      >
                        Error, al eliminar el usuario {values.identificacion}
                      </Alert>
                      <Alert
                        color="success"
                        isOpen={this.state.alertSuccess}
                        toggle={this.onDismiss}
                      >
                        Se elimino de manera satisfactoria el usuario
                      </Alert>
                      <Alert
                        color="danger"
                        isOpen={this.state.alertCode}
                        toggle={this.onDismiss}
                      >
                        La identificacion {values.identificacion} para eliminar
                        no corresponde a usuario
                      </Alert>
                      <p
                        className="text-muted"
                        style={{ textAlign: "justify" }}
                      >
                        Tener en cuenta que previamente se debe notificar al
                        usuario
                        <code> Nombre</code>, que la contraseña se va a
                        actualizar. En caso contrario se le pueden borrar las
                        operaciones que se estén realizando en el sistema
                      </p>
                      <Card>
                        <CardBody>
                          <div className="form-group">
                            <label>
                              {" "}
                              Nueva contraseña{" "}
                              <span className="text-danger">*</span>{" "}
                            </label>
                            <input
                              name={"newpassword"}
                              value={values.newpassword}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="form-control form-control-sm"
                              type="password"
                              placeholder=""
                            />
                          </div>
                          <div className="form-group">
                            <label>
                              {" "}
                              Confirmar contraseña{" "}
                              <span className="text-danger">*</span>{" "}
                            </label>
                            <input
                              name={"confirmpassword"}
                              value={values.confirmpassword}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="form-control form-control-sm"
                              type="password"
                              placeholder=""
                            />
                          </div>
                        </CardBody>
                      </Card>
                    </ModalBody>
                    <ModalFooter>
                      <button
                        type="submit"
                        className="btn btn-outline-warning btn-sm"
                        onClick={e => {
                          e.preventDefault();
                          handleSubmit();
                        }}
                      >
                        {" "}
                        <i className="fa fa-trash" /> Eliminar
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          this.setState({
                            modal: false,
                            alertError: false,
                            alertCode: false,
                            alertSuccess: false
                          });
                        }}
                      >
                        <i className="fa fa-times" /> Cerrar
                      </button>
                    </ModalFooter>
                  </form>
                </Fragment>
              );
            }}
          </Formik>
        </Modal>
      </Fragment>
    );
  }
}

ModalChangePasswordUser.propTypes = {
  modalpassword: PropTypes.bool.isRequired
};

export default ModalChangePasswordUser;
