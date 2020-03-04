import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  CustomInput,
  Alert,
  Spinner
} from "reactstrap";
import IMGROLES from "./../../../assets/img/shield.svg";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { ROLES_SHOW, ROLES_UPDATE } from "./../../../services/EndPoints";
import { decode } from "jsonwebtoken";

class ModalEditRoles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaledit,
      dataResult: {},
      id: this.props.id,
      alertSuccess: false,
      alertError500: false,
      alertError400: false,
      t: this.props.t,
      auth: this.props.authorization,
      spinner: true
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
        auth: this.props.authorization
      });
    }
  }

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id,
      spinner: true
    });

    this.getRoleByID(id);
    setTimeout(() => {
      this.setState({
        spinner: false
      });
    }, 1500);
  };

  getRoleByID = id => {
    const token = this.state.auth;
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
          dataResult: data
        });
      });
  };

  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    return;
  };

  render() {
    const dataPreview = {
      codigo: this.state.dataResult.code,
      nombre: this.state.dataResult.name,
      descripcion: this.state.dataResult.description,
      estado: this.state.dataResult.status
    };
    const { t } = this.props;
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {" "}
            {t("app_roles_modal_editar_titulo")} {dataPreview.nombre}
          </ModalHeader>
          <Formik
            enableReinitialize={true}
            initialValues={dataPreview}
            onSubmit={(values, { setSubmitting }) => {
              const tipoEstado = data => {
                let tipo;
                if (data === true || data === 1) {
                  return (tipo = 1);
                } else if (data === false || data === 0) {
                  return (tipo = 0);
                }
                return 0;
              };
              setTimeout(() => {
                const token = this.state.auth;
                const username = decode(token);
                fetch(`${ROLES_UPDATE}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                  },
                  body: JSON.stringify({
                    id: this.state.id,
                    code: values.codigo,
                    name: values.nombre,
                    description: values.descripcion,
                    status: tipoEstado(values.estado),
                    userName: username.user_name
                  })
                })
                  .then(response => {
                    if (response.status === 200) {
                      this.setState(
                        {
                          alertSuccess: true
                        },
                        () => this.props.updateTable()
                      );
                      setTimeout(() => {
                        this.setState({
                          alertSuccess: false,
                          modal: false
                        });
                      }, 3000);
                    } else if (response.status === 400) {
                      this.setState({
                        alertError400: true
                      });
                      setTimeout(() => {
                        this.setState({
                          alertError400: false
                        });
                      }, 3000);
                    } else if (response.status === 500) {
                      this.setState({
                        alertError500: true
                      });
                      setTimeout(() => {
                        this.setState({
                          alertError500: false,
                          modal: !this.state.modal
                        });
                      }, 3000);
                    }
                  })
                  .catch(err => console.log("error"));
                setSubmitting(false);
              }, 500);
            }}
            validationSchema={Yup.object().shape({
              codigo: Yup.string().required(" Por favor introduzca un código."),
              nombre: Yup.string().required(" Por favor introduzca un nombre."),
              descripcion: Yup.string().required(
                " Por favor introduzca una descripción."
              ),
              estado: Yup.bool().test("Activado", "", value => value === true)
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
                    >
                      {t("app_roles_modal_actualizar_alert_error_500")}
                    </Alert>
                    <Alert
                      className={"text-center"}
                      color="success"
                      isOpen={this.state.alertSuccess}
                    >
                      {t("app_roles_modal_actualizar_alert_success")}
                    </Alert>
                    <Alert
                      className={"text-center"}
                      color="danger"
                      isOpen={this.state.alertError400}
                    >
                      {t("app_roles_modal_actualizar_alert_error_400")}
                    </Alert>
                    <Row>
                      <Col sm="3">
                        <img src={IMGROLES} className="img-thumbnail" />
                      </Col>
                      <Col sm="9">
                        <div className="">
                          {" "}
                          <h5
                            className=""
                            style={{ borderBottom: "1px solid black" }}
                          >
                            {" "}
                            {t("app_roles_modal_editar_titulo_2")}{" "}
                          </h5>{" "}
                        </div>
                        {this.state.spinner !== false ? (
                          <center>
                            <br />
                            <Spinner
                              style={{ width: "3rem", height: "3rem" }}
                              type="grow"
                              color="primary"
                            />
                          </center>
                        ) : (
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <dl className="param">
                                  {t("app_roles_modal_editar_codigo")}{" "}
                                  <span className="text-danger">*</span>{" "}
                                  <dd>
                                    {" "}
                                    <input
                                      name={"codigo"}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.codigo}
                                      type="text"
                                      className={`form-control form-control-sm ${errors.codigo &&
                                        touched.codigo &&
                                        "is-invalid"}`}
                                    />
                                    <div style={{ color: "#D54B4B" }}>
                                      {errors.codigo && touched.codigo ? (
                                        <i className="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name={"codigo"} />
                                    </div>
                                  </dd>
                                </dl>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <dl className="param">
                                  {t("app_roles_modal_editar_nombre")}{" "}
                                  <span className="text-danger">*</span>{" "}
                                  <dd>
                                    {" "}
                                    <input
                                      name={"nombre"}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.nombre}
                                      type="text"
                                      className={`form-control form-control-sm ${errors.nombre &&
                                        touched.nombre &&
                                        "is-invalid"}`}
                                    />
                                    <div style={{ color: "#D54B4B" }}>
                                      {errors.nombre && touched.nombre ? (
                                        <i className="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name={"nombre"} />
                                    </div>
                                  </dd>
                                </dl>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <dl className="param">
                                  {t("app_roles_modal_editar_descripcion")}
                                  <dd>
                                    {" "}
                                    <textarea
                                      name={"descripcion"}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.descripcion}
                                      className={`form-control form-control-sm ${errors.descripcion &&
                                        touched.descripcion &&
                                        "is-invalid"}`}
                                    />
                                    <div style={{ color: "#D54B4B" }}>
                                      {errors.descripcion &&
                                      touched.descripcion ? (
                                        <i className="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name={"descripcion"} />
                                    </div>
                                  </dd>
                                </dl>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <dl className="param">
                                  <label>
                                    {" "}
                                    {t("app_roles_modal_editar_estado")}{" "}
                                    <span className="text-danger">*</span>{" "}
                                  </label>
                                  <div className="text-justify">
                                    <Field
                                      name="estado"
                                      render={({ field, form }) => {
                                        return (
                                          <CustomInput
                                            type="checkbox"
                                            id="CheckBoxEditRoles"
                                            label={t(
                                              "app_roles_modal_editar_estado_descripcion"
                                            )}
                                            {...field}
                                            checked={field.value}
                                            className={
                                              errors.estado &&
                                              touched.estado &&
                                              "invalid-feedback"
                                            }
                                          />
                                        );
                                      }}
                                    />
                                    <ErrorMessage name="estado" />
                                  </div>
                                </dl>
                              </div>
                            </div>
                          </div>
                        )}
                      </Col>
                    </Row>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      onClick={e => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                      className="btn btn-outline-success btn-sm"
                    >
                      {" "}
                      <i className="fa fa-pencil" />{" "}
                      {t("app_roles_modal_editar_boton_actualizar")}{" "}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({
                          modal: false,
                          alertError400: false,
                          alertError500: false,
                          alertSuccess: false
                        });
                      }}
                    >
                      {" "}
                      <i className="fa fa-times" />{" "}
                      {t("app_roles_modal_editar_boton_cerrar")}{" "}
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

ModalEditRoles.propTypes = {
  modaledit: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  t: PropTypes.any
};

export default ModalEditRoles;
