import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalFooter, ModalBody, Alert } from "reactstrap";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
import { GROUPUSER } from "./../../../services/EndPoints";
import { decode } from "jsonwebtoken";

class ModalDeletePais extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldel,
      id: this.props.id,
      dataGroup: {},
      useLogged: "jferrer",
      alertSuccess: false,
      alertError: false,
      alertCode: false,
      auth: this.props.authorization,
      t: this.props.t
    };
  }

  static getDerivedStateFormProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization
      });
    }
  }

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
    this.getDataGroup(id);
  };

  getDataGroup = id => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${GROUPUSER}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.auth
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataGroup: data
        });
      })
      .catch(err => console.log("Error", err));
  };
  render() {
    const dataInitial = {
      code: ""
    };
    const { t } = this.state;
    return (
      <div>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>
            {" "}
            {t("app_grupoUsuarios_modal_eliminar_titulo")}{" "}
            {this.state.dataGroup.name}{" "}
          </ModalHeader>
          <Formik
            initialValues={dataInitial}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                const auth = this.state.auth;
                const username = decode(auth);
                fetch(
                  `${GROUPUSER}${this.state.id}?code=${values.code}&username=${username.user_name}`,
                  {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + auth
                    }
                  }
                )
                  .then(response => {
                    if (response.status === 500) {
                      this.setState({
                        alertError: true
                      });
                    } else if (response.status === 204) {
                      setTimeout(() => {
                        this.setState(
                          {
                            alertSuccess: true,
                            modal: false
                          },
                          () => this.props.updateTable()
                        );
                      }, 3000);
                    } else if (response.status === 400) {
                      this.setState({
                        alertCode: true
                      });
                    }
                  })
                  .catch(Error => console.log("", Error));
                // alert(JSON.stringify(values, "", 2))
              }, 3000);
            }}
            validationSchema={Yup.object().shape({
              code: Yup.string().required(
                " Por favor introduzca el codigo del conglomerado."
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
                  <form className="form">
                    <Alert
                      color="danger"
                      isOpen={this.state.alertError}
                      toggle={this.onDismiss}
                    >
                      Error, al eliminar el grupo {values.code}
                    </Alert>
                    <Alert
                      color="success"
                      isOpen={this.state.alertSuccess}
                      toggle={this.onDismiss}
                    >
                      Se elimino de manera satisfactoria el grupo de usuarios
                    </Alert>
                    <Alert
                      color="danger"
                      isOpen={this.state.alertCode}
                      toggle={this.onDismiss}
                    >
                      El codigo para eliminar no corresponde al grupo
                    </Alert>
                    <ModalBody>
                      <form className="form">
                        <p className="text-center">
                          {" "}
                          {t("app_grupoUsuarios_modal_eliminar_encabezado")}
                        </p>

                        <input
                          type="text"
                          placeholder={t(
                            "app_grupoUsuarios_modal_eliminar_placeholder"
                          )}
                          style={{ textAlign: "center" }}
                          name="code"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.code}
                          className={`form-control form-control-sm col-sm-6 offset-sm-3 ${errors.code &&
                            touched.code &&
                            "is-invalid"}`}
                        />
                        <br />
                        <p className="text-center text-danger">
                          {" "}
                          {t("app_grupoUsuarios_modal_eliminar_texto")}
                        </p>
                      </form>
                    </ModalBody>
                    <ModalFooter>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={e => {
                          e.preventDefault();
                          handleSubmit();
                        }}
                      >
                        {" "}
                        <i className="fa fa-trash" />{" "}
                        {t("app_grupoUsuarios_modal_eliminar_btn_eliminar")}{" "}
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={e => {
                          e.preventDefault();
                          this.setState({ modal: false });
                        }}
                      >
                        {" "}
                        <i className="fa fa-times" />{" "}
                        {t("app_grupoUsuarios_modal_eliminar_btn_cerrar")}{" "}
                      </button>
                    </ModalFooter>
                  </form>
                </Fragment>
              );
            }}
          </Formik>
        </Modal>
      </div>
    );
  }
}

ModalDeletePais.propTypes = {
  modaldel: PropTypes.bool.isRequired,
  authorization: PropTypes.string.isRequired
};

export default ModalDeletePais;
