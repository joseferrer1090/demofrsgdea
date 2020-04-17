import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CustomInput,
  Alert
} from "reactstrap";
import { TEMPLATE_SHOW, TEMPLATE_UPDATE } from "./../../../services/EndPoints";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { decode } from "jsonwebtoken";
import IMGPLANTILLA from "./../../../assets/img/puzzle-pieces.svg";

class ModalEditPlantilla extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaledit,
      auth: this.props.authorization,
      id: this.props.id,
      dataTemplate: {},
      alert400: false,
      alert200: false,
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
        auth: this.props.authorization,
        id: this.props.id
      });
      this.getDataTemplate(this.state.id, this.state.auth);
    } else if (this.props.authorization === "" || this.props.id === null) {
    }
    return;
  }

  getDataTemplate = (id, auth) => {
    const username = decode(auth);
    fetch(`${TEMPLATE_SHOW}/${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/jsom",
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
    this.setState({
      modal: !this.state.modal
    });
  };
  render() {
    const dataResult = this.state.dataTemplate;
    return (
      <Modal className={"modal-lg"} isOpen={this.state.modal}>
        <ModalHeader>Probando apenas</ModalHeader>
        <Formik
          enableReinitialize={true}
          initialValues={dataResult}
          onSubmit={(values, { setSubmitting }) => {
            const tipoEstado = data => {
              let tipo;
              if (data === 1 || data === true) {
                return (tipo = 1);
              } else if (data === 0 || data === false) {
                return (tipo = 0);
              }
              return 0;
            };
            setTimeout(() => {
              const auth = this.state.auth;
              const username = decode(auth);
              fetch(`${TEMPLATE_UPDATE}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  authorization: "Bearer " + auth
                },
                body: JSON.stringify({
                  id: this.state.id,
                  code: values.code,
                  name: values.name,
                  description: values.description,
                  status: tipoEstado(values.status),
                  userName: username.user_name
                })
              })
                .then(resp => {
                  if (resp.status === 200) {
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
                    }, 3000);
                    // console.log("Se Actualizo el registro");
                  } else if (resp.status === 400) {
                    this.setState({
                      alert400: true
                    });
                    setTimeout(() => {
                      this.setState({
                        alert400: false
                      });
                    }, 3000);
                    // console.log("Validar los datos de envios", resp);
                  } else if (resp.status === 500) {
                    this.setState({
                      alert500: true
                    });
                    setTimeout(() => {
                      this.setState({
                        alert500: false
                      });
                    }, 3000);
                    // console.log("Error al actualizar los datos en el servidor");
                  }
                })
                .catch(err => {
                  console.log(`Error => ${err.message}`);
                });
            }, 500);
          }}
          validationSchema={Yup.object().shape({
            code: Yup.string()
              .trim()
              .required("Codigo requerido para la actualizarcion"),
            name: Yup.string()
              .trim()
              .required("Nombre requerido para la actualizacion "),
            description: Yup.string().required(
              "Descripcion necesaria para la actualizacion"
            ),
            status: Yup.bool().test("Activo", "", value => value === true)
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
                <ModalBody>
                  <Alert color={"danger"} isOpen={this.state.alert500}>
                    <i className="fa fa-exclamation-triangle" />{" "}
                    <p>Error, no se puede actualizar la plantilla</p>
                  </Alert>
                  <Alert color={"danger"} isOpen={this.state.alert400}>
                    <i className="fa fa-exclamation-triangle" />{" "}
                    <p>
                      Error, no se puede actualizar la plantilla Verificar los
                      datos
                    </p>
                  </Alert>
                  <Alert color={"success"} isOpen={this.state.alert200}>
                    <p>Se actualizo la plantilla de manera exitosa</p>
                  </Alert>
                  <div className="row">
                    <div className="col-md-3">
                      <img src={IMGPLANTILLA} className="img-thumbnail" />
                    </div>
                    <div className="col-md-9">
                      <div className="">
                        {" "}
                        <h5
                          className=""
                          style={{ borderBottom: "1px solid black" }}
                        >
                          {" "}
                          Datos plantilla{" "}
                        </h5>{" "}
                      </div>
                      <form className="form">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                Codigo <span className="text-danger">*</span>
                              </label>
                              <input
                                name="code"
                                type="text"
                                className="form-control form-control-sm"
                                onChange={handleChange}
                                value={values.code}
                              />
                              <div style={{ color: "#D54B4B" }}>
                                {errors.code && touched.code ? (
                                  <i className="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name={"code"} />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                Nombre <span className="text-danger">*</span>
                              </label>
                              <input
                                name="name"
                                type="text"
                                className="form-control form-control-sm"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                              />
                              <div style={{ color: "#D54B4B" }}>
                                {errors.name && touched.name ? (
                                  <i className="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name={"name"} />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>
                                Descripcion{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <textarea
                                name="description"
                                className="form-control form-control-sm"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                              ></textarea>
                              <div style={{ color: "#D54B4B" }}>
                                {errors.description && touched.description ? (
                                  <i className="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name={"description"} />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>
                                Estado <span className="text-danger">*</span>
                              </label>
                              <div className="text-justify">
                                <Field
                                  name="status"
                                  type=""
                                  render={({ field, form }) => {
                                    return (
                                      <CustomInput
                                        name="status"
                                        type="checkbox"
                                        id="editPlantilla"
                                        label={
                                          "Si esta opción se encuentra activada, representa que la Plantilla es visible en el sistema y se podrán realizar operaciones entre cada uno de los módulos correspondientes de la aplicación. En caso contrario la Plantilla no se elimina del sistema solo quedará inactivo y no visible para cada uno de los módulos correspondientes del sistema."
                                        }
                                        {...field}
                                        checked={field.value}
                                        className={
                                          errors.status &&
                                          touched.status &&
                                          "invalid-feedback"
                                        }
                                      />
                                    );
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <div className="pull-right">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={e => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      <i className="fa fa-pencil" /> Editar plantilla
                    </button>
                    &nbsp;
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({ modal: false });
                      }}
                    >
                      {" "}
                      <i className="fa fa-times" /> Cancelar{" "}
                    </button>
                  </div>
                </ModalFooter>
              </React.Fragment>
            );
          }}
        </Formik>
      </Modal>
    );
  }
}

ModalEditPlantilla.propTypes = {
  authorization: PropTypes.string.isRequired
};

export default ModalEditPlantilla;
