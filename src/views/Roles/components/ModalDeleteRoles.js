import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalFooter, ModalBody, Alert } from "reactstrap";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
import { ROLES_SHOW, ROLES_DELETE } from "./../../../services/EndPoints";
import { decode } from "jsonwebtoken";

class ModalDeleteRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldelete,
      id: this.props.id,
      dataRolById: {},
      t: this.props.t,
      alertError500: false,
      alertSuccess: false,
      alertError400: false,
      auth: this.props.authorization
    };
  }

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
    this.getDataRolById(id);
  };

  getDataRolById = id => {
    const token = this.props.authorization;
    const username = decode(token);
    fetch(`${ROLES_SHOW}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataRolById: data
        });
      })
      .catch(err => console.log("Error", err));
  };

  onDismiss = () => {
    this.setState({
      alertError500: false,
      alertError400: false,
      alertSuccess: false
    });
  };

  render() {
    const dataInitial = {
      codigo: ""
    };
    const { t } = this.props;
    return (
      <Fragment>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>
            {" "}
            {t("app_roles_modal_eliminar_titulo")} {this.state.dataRolById.name}{" "}
          </ModalHeader>
          <Formik
            initialValues={dataInitial}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                const token = this.props.authorization;
                const username = decode(token);
                fetch(
                  `${ROLES_DELETE}${this.state.id}?code=${values.codigo}&username=${username.user_name}`,
                  {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + token
                    }
                  }
                )
                  .then(response => {
                    if (response.status === 500) {
                      this.setState({
                        alertError500: true
                      });
                    } else if (response.status === 204) {
                      this.setState(
                        {
                          alertSuccess: true
                        },
                        () => this.props.updateTable()
                      );
                      setTimeout(() => {
                        this.setState({
                          modal: false,
                          alertSuccess: false
                        });
                      }, 3000);
                    } else if (response.status === 400) {
                      this.setState({
                        alertError400: true
                      });
                    }
                  })
                  .catch(err => console.log("Error", err));
              }, 500);
            }}
            validationSchema={Yup.object().shape({
              codigo: Yup.string().required(
                " Por favor introduzca el codigo del rol a eliminar"
              )
            })}
          >
            {props => {
              const {
                values,
                touched,
                errors,
                handleChange,
                handleBlur,
                handleSubmit
              } = props;
              return (
                <Fragment>
                  <ModalBody>
                    <Alert
                      className={"text-center"}
                      color="danger"
                      isOpen={this.state.alertError500}
                      toggle={this.onDismiss}
                    >
                      {t("app_roles_modal_eliminar_alert_error_500")}
                    </Alert>
                    <Alert
                      color="danger"
                      className={"text-center"}
                      isOpen={this.state.alertError400}
                      toggle={this.onDismiss}
                    >
                      {t("app_roles_modal_eliminar_alert_error_400")}
                    </Alert>
                    <Alert color="success" isOpen={this.state.alertSuccess}>
                      {t("app_roles_modal_eliminar_alert_success")}
                    </Alert>
                    <form className="form">
                      <p className="text-center">
                        {" "}
                        {t("app_roles_modal_eliminar_titulo_2")}{" "}
                      </p>
                      <input
                        name="codigo"
                        value={values.codigo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`form-control col-sm-6 offset-sm-3 form-control-sm ${errors.codigo &&
                          touched.codigo &&
                          "is-invalid"}`}
                        type="text"
                        placeholder={t("app_roles_modal_eliminar_placeholder")}
                        style={{ textAlign: "center" }}
                      />
                      <div className="text-center" style={{ color: "#D54B4B" }}>
                        {errors.codigo && touched.codigo ? (
                          <i class="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="codigo" />
                      </div>

                      <br />
                      <p className="text-center text-danger">
                        {" "}
                        {t("app_roles_modal_eliminar_titulo_3")}{" "}
                      </p>
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      type="submit"
                      className="btn btn-outline-danger btn-sm"
                      onClick={e => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      {" "}
                      <i className="fa fa-trash" />{" "}
                      {t("app_roles_modal_eliminar_boton_eliminar")}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({
                          modal: false,
                          alertSuccess: false,
                          alertError500: false,
                          alertError400: false
                        });
                      }}
                    >
                      <i className="fa fa-times" />{" "}
                      {t("app_roles_modal_eliminar_boton_cerrar")}{" "}
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

ModalDeleteRoles.propType = {
  modaldelete: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  t: PropTypes.array
};

export default ModalDeleteRoles;
