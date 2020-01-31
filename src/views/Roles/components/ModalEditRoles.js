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
  Alert
} from "reactstrap";
import IMGROLES from "./../../../assets/img/shield.svg";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";

class ModalEditRoles extends React.Component {
  state = {
    modal: this.props.modaledit,
    dataResult: {},
    id: this.props.id,
    userName: "jferrer",
    alertSuccess: false,
    alertError: false,
    alertError400: "",
    t: this.props.t,
    auth: this.props.authorization
  };

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
    this.getRoleByID(id);
  };

  getRoleByID = id => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/role/${id}?username=${this.state.userName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + window.btoa("sgdea:123456")
        }
      }
    )
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
                fetch(`http://192.168.10.180:7000/api/sgdea/role`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic " + window.btoa("sgdea:123456")
                  },
                  body: JSON.stringify({
                    id: this.state.id,
                    code: values.codigo,
                    name: values.nombre,
                    description: values.descripcion,
                    status: tipoEstado(values.estado),
                    userName: this.state.userName
                  })
                }).then(response => {
                  if (response.status === 200) {
                    console.log("Se realizo el put");
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
                    console.log("Se envio mal un dato");
                    this.setState({
                      alertError400: true
                    });
                    setTimeout(() => {
                      this.setState({
                        alertError400: false
                      });
                    }, 3000);
                  } else if (response.status === 500) {
                    console.log("Error en algo");
                    this.setState({
                      alertError: true
                    });
                    setTimeout(() => {
                      this.setState({
                        alertError: false,
                        modal: !this.state.modal
                      });
                    }, 3000);
                  }
                });
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
                    <Alert color="danger" isOpen={this.state.alertError}>
                      {t("app_roles_modal_actualizar_alert_error")}
                    </Alert>
                    <Alert color="success" isOpen={this.state.alertSuccess}>
                      {t("app_roles_modal_actualizar_alert_success")}
                    </Alert>
                    <Alert color="danger" isOpen={this.state.alertError400}>
                      {t("app_roles_modal_actualizar_alert_error400")}
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
                        this.setState({ modal: false });
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
