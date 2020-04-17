import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
  ROLES_SHOW,
  ROLES_PERMISSION_BY_ROL,
} from "./../../../services/EndPoints";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  UncontrolledAlert,
  Alert,
} from "reactstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import SelectModulo from "./SelectModuloModalEdit";
import MySelectEntidades from "./SelectEntidadModalEdit";
import PermisosAsignados from "./AsignarPermisosModalEdit";
import { decode } from "jsonwebtoken";

class ModalEditPermissionRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      modal: this.props.modaleditpermission,
      dataPermisosId: [],
      dataRolById: {},
      modulos: [],
      entidades: [],
      t: this.props.t,
      auth: this.props.authorization,
      alertSuccess: false,
      alertError400: false,
      alertError500: false,
      spinnerPermisos: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization,
      });
    }
  }

  toggle = (id) => {
    this.setState({
      modal: !this.state.modal,
      id: id,
    });
    this.getDataPermissionById(id);
    this.getDataRoleById(id);
  };

  getDataRoleById = (id) => {
    const token = this.state.auth;
    const username = decode(token);
    fetch(`${ROLES_SHOW}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataRolById: data,
        });
      })
      .catch((err) => console.log("Err", err));
  };

  getDataPermissionById = (id) => {
    const token = this.state.auth;
    const username = decode(token);
    fetch(`${ROLES_PERMISSION_BY_ROL}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Cotent-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataPermisosId: data,
        });
      })
      .catch((err) => console.log("Error", err));
  };

  render() {
    const { t } = this.props;
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {t("app_roles_modal_editar_permisos_titulo")}{" "}
            {this.state.dataRolById.name}
          </ModalHeader>
          <Formik
            enableReinitialize={true}
            initialValues={{
              permisos: this.state.dataPermisosId.map((aux, id) => {
                return { label: aux.name, value: aux.id };
              }),
              nombre: this.state.dataRolById.name,
              codigo: this.state.dataRolById.code,
            }}
            onSubmit={(values, { setSubmitting }) => {
              this.setState({
                spinnerPermisos: true,
              });
              setTimeout(() => {
                const token = this.state.auth;
                const username = decode(token);
                fetch(`${ROLES_PERMISSION_BY_ROL}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                  },
                  body: JSON.stringify({
                    id: this.state.id,
                    permissions: values.permisos,
                    userName: username.user_name,
                  }),
                })
                  .then((response) => {
                    if (response.status === 200) {
                      this.setState({
                        alertSuccess: true,
                        spinnerPermisos: false,
                      });
                      setTimeout(() => {
                        this.setState({
                          alertSuccess: false,
                          modal: false,
                        });
                      }, 3000);
                    } else if (response.status === 400) {
                      this.setState({
                        alertError400: true,
                        spinnerPermisos: false,
                      });
                      setTimeout(() => {
                        this.setState({
                          alertError400: false,
                        });
                      }, 3000);
                    } else if (response.status === 500) {
                      this.setState({
                        alertError500: true,
                        spinnerPermisos: false,
                      });
                      setTimeout(() => {
                        this.setState({
                          alertError500: false,
                          modal: !this.state.modal,
                        });
                      }, 3000);
                    }
                  })
                  .catch((error) => console.log("", error));
                setSubmitting(false);
              }, 1000);
            }}
            validationSchema={Yup.object().shape({
              permisos: Yup.array().of(
                Yup.object().shape({
                  label: Yup.string().required(),
                  value: Yup.string().required(),
                })
              ),
            })}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                handleSubmit,
                setFieldTouched,
                setFieldValue,
              } = props;
              return (
                <Fragment>
                  <ModalBody>
                    <form>
                      <Alert
                        className={"text-center"}
                        color="danger"
                        isOpen={this.state.alertError500}
                      >
                        {t("app_roles_modal_editar_permisos_alert_error_500")}
                      </Alert>
                      <Alert
                        className={"text-center"}
                        color="danger"
                        isOpen={this.state.alertError400}
                      >
                        {t("app_roles_modal_editar_permisos_alert_error_400")}
                      </Alert>
                      <Alert
                        className={"text-center"}
                        color="success"
                        isOpen={this.state.alertSuccess}
                      >
                        {t("app_roles_modal_editar_permisos_alert_success")}
                      </Alert>
                      <Row>
                        <Col sm="12">
                          <UncontrolledAlert color="warning">
                            <div className="text-center">
                              <i className="fa fa-exclamation-triangle" />{" "}
                              {t("app_roles_modal_editar_permisos_alert")}{" "}
                            </div>
                          </UncontrolledAlert>
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col sm="12">
                          <Row>
                            <Col sm="12">
                              <div className="card card-body">
                                <div className="row">
                                  <Col sm="6">
                                    <div className="form-group">
                                      <dt>
                                        {t(
                                          "app_roles_modal_editar_permisos_codigo"
                                        )}
                                      </dt>

                                      <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        disabled
                                        name="codigo"
                                        value={values.codigo}
                                      />
                                    </div>
                                  </Col>
                                  <Col sm="6">
                                    <div className="form-group">
                                      <dt>
                                        {t(
                                          "app_roles_modal_editar_permisos_nombre"
                                        )}
                                      </dt>

                                      <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        disabled
                                        name="nombre"
                                        value={values.nombre}
                                      />
                                    </div>
                                  </Col>
                                </div>
                              </div>
                            </Col>
                            <Col sm="6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  {t(
                                    "app_roles_modal_editar_permisos_modulo"
                                  )}{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <SelectModulo
                                  authorization={this.state.auth}
                                  t={this.props.t}
                                  name="modulos"
                                  value={values.modulos}
                                  onChange={(e) => {
                                    setFieldValue("modulos", e.target.value);
                                  }}
                                  onBlur={() => {
                                    setFieldTouched("modulos", true);
                                  }}
                                  className={`form-control form-control-sm ${
                                    errors.modulos &&
                                    touched.modulos &&
                                    "is-invalid"
                                  }`}
                                />
                              </div>
                            </Col>
                            <Col sm="6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  {t(
                                    "app_roles_modal_editar_permisos_entidades"
                                  )}{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <MySelectEntidades
                                  authorization={this.props.authorization}
                                  t={this.props.t}
                                  modulo={props.values.modulos}
                                  name={"entidad"}
                                  value={values.entidad}
                                  onChange={(e) => {
                                    setFieldValue("entidad", e.target.value);
                                  }}
                                  onBlur={() => {
                                    setFieldTouched("entidad", true);
                                  }}
                                  className={`form-control form-control-sm ${
                                    errors.entidad &&
                                    touched.entidad &&
                                    "is-invalid"
                                  }`}
                                />
                              </div>
                            </Col>
                            {/*  Aqui va la funcionalidad    */}
                            <Col sm="12">
                              <div className="form-group">
                                <label>
                                  {t(
                                    "app_roles_modal_editar_permisos_asignar_permisos"
                                  )}{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <PermisosAsignados
                                  authorization={this.props.authorization}
                                  t={this.props.t}
                                  entidad={props.values.entidad}
                                  name={"permisos"}
                                  value={values.permisos}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                />
                              </div>
                            </Col>
                            {/*  Fin   */}
                          </Row>
                        </Col>
                      </Row>
                      <Row />
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                      className="btn btn-outline-warning btn-sm"
                      disabled={this.state.spinnerPermisos}
                    >
                      {this.state.spinnerPermisos ? (
                        <i className=" fa fa-spinner fa-refresh" />
                      ) : (
                        <div>
                          {" "}
                          <i className="fa fa-lock" />{" "}
                          {t(
                            "app_roles_modal_editar_permisos_boton_editar_permisos"
                          )}{" "}
                        </div>
                      )}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({
                          modal: false,
                          alertSuccess: false,
                          alertError500: false,
                          alertError400: false,
                        });
                      }}
                    >
                      {" "}
                      <i className="fa fa-times" />{" "}
                      {t("app_roles_modal_editar_permisos_boton_cerrar")}{" "}
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

ModalEditPermissionRoles.propTypes = {
  id: PropTypes.string.isRequired,
  modal: PropTypes.bool.isRequired,
  t: PropTypes.any,
};

export default ModalEditPermissionRoles;
