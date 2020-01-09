import React, { Component, Fragment } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Alert
} from "reactstrap";
import PropTypes from "prop-types";
import { Formik, withFormik, ErrorMessage, Field, Form } from "formik";
import * as Yup from "yup";
import {
  TYPEPROCEDURE_DELETE,
  TYPEPROCEDURE
} from "./../../../services/EndPoints";
import { decode } from "jsonwebtoken";

class ModalDeleteTramite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldelete,
      id: this.props.id,
      dataProcedure: {},
      alertSuccess: false,
      alertError: false,
      alertCode: false,
      code: "",
      auth: this.props.authorization
    };
  }

  static getDerivedStateFromProps(props, state) {
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
        auth: this.props.authorization,
        id: this.props.id
      });
    }
  }

  onDismiss = () => {
    this.setState({
      alertError: false,
      alertCode: false,
      alertSuccess: false
    });
  };

  getData = id => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${TYPEPROCEDURE}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataProcedure: data.typeProcedure
        });
        console.log(this.state.dataProcedure);
      })
      .catch(err => console.log("Error", err));
  };

  toggle = id => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      id: id
    }));
    this.getData(id);
  };

  render() {
    const dataInitial = {
      code: ""
    };
    return (
      <Fragment>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>
            {" "}
            Eliminar tramite {this.state.dataProcedure.name}{" "}
          </ModalHeader>
          <Formik
            initialValues={dataInitial}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                const auth = this.state.auth;
                const username = decode(auth);
                fetch(
                  `${TYPEPROCEDURE_DELETE}${this.state.id}?code=${values.code}&username=${username.user_name}`,
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
                      }, 1000);
                    } else if (response.status === 400) {
                      this.setState({
                        alertCode: true
                      });
                    }
                  })
                  .catch(Error => console.log("", Error));
                // alert(JSON.stringify(values, "", 2))
              }, 1000);
            }}
            validationSchema={Yup.object().shape({
              code: Yup.string().required(
                "Por favor introduzca el codigo el tipo de tramite"
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
                    <ModalBody>
                      <Alert
                        color="danger"
                        isOpen={this.state.alertError}
                        toggle={this.onDismiss}
                      >
                        Error, al eliminar el tipo de tramite {values.code}
                      </Alert>
                      <Alert
                        color="success"
                        isOpen={this.state.alertSuccess}
                        toggle={this.onDismiss}
                      >
                        Se elimino de manera satisfactoria el tipo de tramite
                      </Alert>
                      <Alert
                        color="danger"
                        isOpen={this.state.alertCode}
                        toggle={this.onDismiss}
                      >
                        El codigo para eliminar tipo de tramite no corresponde
                      </Alert>
                      <p className="text-center">
                        {" "}
                        Confirmar el <code> codigo </code> para eliminar el tipo
                        de tramite{" "}
                      </p>
                      <input
                        type="text"
                        placeholder="codigo del tipo de tramite"
                        style={{ textAlign: "center" }}
                        name="code"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.code}
                        className={`form-control form-control-sm col-sm-6 offset-sm-3 ${errors.code &&
                          touched.code &&
                          "is-invalid"}`}
                      />
                      <div className="text-center" style={{ color: "#D54B4B" }}>
                        {errors.code && touched.code ? (
                          <i class="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="code" />
                      </div>
                      <br />
                      <p className="text-center text-danger">
                        El tipo de tramite quedara eliminado permanentemente.
                      </p>
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
                        <i className="fa fa-trash" /> Eliminar
                      </button>
                      <Button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          this.setState({ modal: false });
                        }}
                      >
                        <i className="fa fa-times" /> Cerrar{" "}
                      </Button>
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

ModalDeleteTramite.propTypes = {
  modaldelte: PropTypes.bool.isRequired
};

export default ModalDeleteTramite;
