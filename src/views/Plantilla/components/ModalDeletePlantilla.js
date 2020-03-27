import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from "reactstrap";
import { TEMPLATE_SHOW, TEMPLATE_DELETE } from "./../../../services/EndPoints";
import PropTypes from "prop-types";
import { decode } from "jsonwebtoken";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

class ModalDeletePlantilla extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldelete,
      auth: this.props.authorization,
      id: this.props.id,
      dataTemplate: {},
      alert200: false,
      alert400: false,
      alert500: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
    if (props.id !== state.id) {
      return {
        id: props.id
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.id !== prevProps.id) {
      this.setState({
        id: this.props.id,
        auth: this.props.authorization
      });
      this.getDataTemplate(this.state.id, this.state.auth);
    } else if (this.props.authorization === "" || this.props.id === null) {
    }
    return null;
  }

  getDataTemplate = (id, auth) => {
    const username = decode(auth);
    fetch(`${TEMPLATE_SHOW}/${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + auth
      }
    })
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          dataTemplate: data
        });
        // console.log(data);
      })
      .catch(err => {
        console.log(`Error => ${err.message}`);
      });
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  render() {
    const data = this.state.dataTemplate;
    return (
      <Modal isOpen={this.state.modal}>
        <ModalHeader> Eliminar plantilla {data.name} </ModalHeader>
        <Formik
          onSubmit={(values, { setSubmitting }) => {
            const auth = this.state.auth;
            const username = decode(auth);
            const id = this.state.id;
            setTimeout(() => {
              fetch(
                `${TEMPLATE_DELETE}${id}?code=${values.code}&username=${username.user_name}`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + auth
                  }
                }
              )
                .then(response => {
                  if (response.status === 500) {
                    this.setState({
                      alert500: true
                    });
                    setTimeout(() => {
                      this.setState({
                        alert500: false
                      });
                    }, 1000);
                    console.log(`Error => ${response}`);
                  } else if (response.status === 204) {
                    this.setState({
                      alert200: true
                    });
                    setTimeout(() => {
                      this.setState(
                        {
                          alert200: false,
                          modal: false
                        },
                        this.props.updateTable()
                      );
                    }, 1000);
                    console.log("Se elimino correctamente la plantilla");
                  } else if (response.status === 400) {
                    this.setState({
                      alert400: true
                    });
                    setTimeout(() => {
                      this.setState({
                        alert400: false
                      });
                    }, 1000);
                    console.log(
                      "Por favor verifique el codigo de la plantilla"
                    );
                  }
                })
                .catch(err => {
                  console.log(`Error => ${err.message}`);
                });
            }, 1000);
          }}
          validationSchema={Yup.object().shape({
            code: Yup.string()
              .trim()
              .required("codigo de la plantilla es requerido")
          })}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              setFieldTouched
            } = props;
            return (
              <React.Fragment>
                <Alert color="danger" isOpen={this.state.alert500}>
                  <i className="fa fa-exclamation-triangle" /> Error no se puede
                  eliminar, la plantilla existen registros con ella
                </Alert>
                <Alert color="danger" isOpen={this.state.alert400}>
                  <i className="fa fa-exclamation-triangle" /> Verificar el
                  codigo que ingreso para eliminar
                </Alert>
                <Alert color="success" isOpen={this.state.alert200}>
                  <p>Se borro de manera safisfactoria la plantilla</p>
                </Alert>
                <form className="form">
                  <ModalBody>
                    <p className="text-center">
                      {" "}
                      Confirmar el <code> Codigo </code> para la plantilla{" "}
                    </p>
                    <div className="form-group">
                      <input
                        name={"code"}
                        className="form-control col-sm-6 offset-sm-3 form-control-sm"
                        type="text"
                        placeholder="Codigo de la plantilla a eliminar"
                        style={{ textAlign: "center" }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.code}
                      />
                      <div style={{ color: "#D54B4B", textAlign: "center" }}>
                        {errors.code && touched.code ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name={"code"} />
                      </div>
                    </div>
                    <br />
                    <p className="text-center text-danger">
                      {" "}
                      La plantilla quedara eliminada de manera permanente.{" "}
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={e => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      {" "}
                      <i className="fa fa-trash" /> Eliminar{" "}
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({ modal: false });
                      }}
                    >
                      {" "}
                      <i className="fa fa-times" /> Cerrar{" "}
                    </button>
                  </ModalFooter>
                </form>
              </React.Fragment>
            );
          }}
        </Formik>
      </Modal>
    );
  }
}

ModalDeletePlantilla.propTypes = {
  modaldelete: PropTypes.bool.isRequired,
  authorization: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default ModalDeletePlantilla;
