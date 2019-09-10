import React, { useState, useEffect, Fragment } from "react";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  CustomInput,
  Alert
} from "reactstrap";
import PropTypes from "prop-types";
import IMGCONGLOMERADO from "./../../../assets/img/puzzle.svg";
import { Formik, ErrorMessage, FormikProps, Form, Field } from "formik";
import * as Yup from "yup";
import {
  CONGLOMERATES,
  COUNTRIES,
  DEPARTMENTS,
  CITYS,
  CHARGES
} from "./../../../services/EndPoints";
import { Trans } from "react-i18next";
import moment from "moment";

class ModalEditConglomerado extends React.Component {
  state = {
    modal: this.props.modaleditstate,
    idConglomerado: this.props.id,
    dataResult: {},
    alertError: false,
    alertSuccess: false,
    t: this.props.t,
    optionsCountries: [0],
    optionsDepartment: [0],
    optionsCitys: [0],
    optionsCharges: [0]
  };

  componentDidMount() {
    this.getDataCountries();
    this.getDataDepartments();
    this.getDataCitys();
    this.getDataCharges();
  }

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      idConglomerado: id
    }, ()=>{this.props.updateTable()});
    this.getConglomeradoByID(id);
  };

  getConglomeradoByID = id => {
    fetch(`http://192.168.10.180:7000/api/sgdea/conglomerate/${id}/jferrer`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + window.btoa("sgdea:123456")
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          dataResult: {
            conglomerate_country: data.city.department.country.id,
            conglomerate_department: data.city.department.id,
            conglomerate_city: data.city.id,
            conglomerate_name: data.name,
            code: data.code,
            description: data.description,
            status: data.status,
            conglomerate_charge:
              data.charge !== null
                ? { conglomerate_charge: data.charge.id }
                : ""
          }
        });
      })
      .catch(error => console.log(error));
  };

  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    return;
  };

  onDismiss = () => {
    this.setState({
      alertError: false,
      alertSuccess: false
    });
  };
  getDataCountries = data => {
    fetch(COUNTRIES, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + window.btoa("sgdea:123456")
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          optionsCountries: data
        });
      })
      .catch(Error => console.log(" ", Error));
  };
  getDataDepartments = data => {
    fetch(DEPARTMENTS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + window.btoa("sgdea:123456")
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          optionsDepartment: data
        });
      })
      .catch(Error => console.log(" ", Error));
  };

  getDataCitys = data => {
    fetch(CITYS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + window.btoa("sgdea:123456")
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          optionsCitys: data
        });
      })
      .catch(Error => console.log(" ", Error));
  };
  getDataCharges = data => {
    fetch(CHARGES, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + window.btoa("sgdea:123456")
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          optionsCharges: data
        });
      })
      .catch(Error => console.log(" ", Error));
  };

  render() {
    const mapOptionsCountries = this.state.optionsCountries.map((aux, idx) => {
      return (
        <option key={aux.id} value={aux.id}>
          {aux.name}
        </option>
      );
    });

    const mapOptionsDepartments = this.state.optionsDepartment.map(
      (aux, idx) => {
        return <option value={aux.id}>{aux.name}</option>;
      }
    );

    const mapOptionsCitys = this.state.optionsCitys.map((aux, idx) => {
      return (
        <option key={aux.id} value={aux.id}>
          {aux.name}
        </option>
      );
    });

    const mapOptionsCharges = this.state.optionsCharges.map((aux, idx) => {
      return (
        <option key={aux.id} value={aux.id}>
          {aux.name}
        </option>
      );
    });
    const dataResult = this.state.dataResult;
    const auxID = this.state.idConglomerado;
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            <Trans>
              {this.props.t("app_conglomerado_modal_actualizar_titulo")}
            </Trans>
            &nbsp;{this.state.dataResult.conglomerate_name}
          </ModalHeader>
          <Formik
            enableReinitialize={true}
            initialValues={dataResult}
            onSubmit={(values, { setSubmitting }) => {
              const tipoEstado = data => {
                let tipo = null;
                if (data === true) {
                  return (tipo = 1);
                } else if (data === false) {
                  return (tipo = 0);
                }
                return null;
              };
              setTimeout(() => {
                fetch(CONGLOMERATES, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic " + window.btoa("sgdea:123456")
                  },
                  body: JSON.stringify({
                    id: this.state.idConglomerado,
                    code: values.code,
                    name: values.conglomerate_name,
                    description: values.description,
                    status: tipoEstado(values.status),
                    cityId: values.conglomerate_city,
                    chargeId: values.conglomerate_charge,
                    userName: "jferrer"
                  })
                })
                  .then(response => {
                    console.log(response.status);
                    if (response.status === 200) {
                      this.setState({
                        alertSuccess: true
                      });
                      setTimeout(() => {
                        this.setState({
                          alertSuccess: false,
                          modal: false
                        }, this.props.updateTable());
                      }, 3000);
                    } else if (response.status === 400) {
                      this.setState({
                        alertError: true
                      });
                      setTimeout(() => {
                        this.setState({
                          alertError: false
                        });
                      }, 3000);
                    } else if (response.status === 500) {
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
                  })
                  .catch(error => console.log("", error));
                setSubmitting(false);
              }, 1000);
            }}
            validationSchema={Yup.object().shape({
              code: Yup.string().required(" Por favor introduzca un código."),
              conglomerate_name: Yup.string().required(
                " Por favor introduzca un nombre."
              ),
              description: Yup.string()
                .nullable()
                .max(250, " Máximo 250 caracteres."),
              status: Yup.bool().test("Activo", "", value => value === true)
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
                    <Alert
                      color="danger"
                      isOpen={this.state.alertError}
                      toggle={this.onDismiss}
                    >
                      Error al actualizar el conglomerado.
                    </Alert>
                    <Alert
                      color="success"
                      isOpen={this.state.alertSuccess}
                      toggle={this.onDismiss}
                    >
                      Se actualizo el conglomerado con éxito.
                    </Alert>
                    <form className="form">
                      <div className="row">
                        <div className="col-md-3">
                          <img
                            src={IMGCONGLOMERADO}
                            className="img-thumbnail"
                          />
                        </div>
                        <div className="col-md-9">
                          <div className="">
                            {" "}
                            <h5
                              className=""
                              style={{ borderBottom: "1px solid black" }}
                            >
                              {" "}
                              <Trans>
                                {this.props.t(
                                  "app_conglomerado_modal_actualizar_titulo_2"
                                )}
                              </Trans>{" "}
                            </h5>{" "}
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  <Trans>
                                    {this.props.t(
                                      "app_conglomerado_modal_actualizar_codigo"
                                    )}
                                  </Trans>{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <input
                                  type="text"
                                  name={"code"}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.code}
                                  className={`form-control form-control-sm ${errors.code &&
                                    touched.code &&
                                    "is-invalid"}`}
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
                                  {" "}
                                  <Trans>
                                    {this.props.t(
                                      "app_conglomerado_modal_actualizar_nombre"
                                    )}
                                  </Trans>{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <input
                                  type="text"
                                  name="conglomerate_name"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.conglomerate_name}
                                  className={`form-control form-control-sm ${errors.conglomerate_name &&
                                    touched.conglomerate_name &&
                                    "is-invalid"}`}
                                />
                                {/* <Field
                                  type="text"
                                  name="nombre"
                                  placeholder=""
                                  className={"form-control form-control-sm"}
                                /> */}
                                <div style={{ color: "#D54B4B" }}>
                                  {errors.conglomerate_name &&
                                  touched.conglomerate_name ? (
                                    <i className="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name={"conglomerate_name"} />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <label>
                                  {this.props.t(
                                    "app_conglomerado_modal_actualizar_pais"
                                  )}
                                </label>
                                <select
                                  name={"conglomerate_country"}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.conglomerate_country}
                                  className={`form-control form-control-sm ${errors.conglomerate_country &&
                                    touched.conglomerate_country &&
                                    "is-invalid"}`}
                                >
                                  {" "}
                                  <option value={""} disabled>
                                    -- Seleccione --
                                  </option>
                                  {mapOptionsCountries}{" "}
                                </select>{" "}
                                <div style={{ color: "#D54B4B" }}>
                                  {errors.conglomerate_country &&
                                  touched.conglomerate_country ? (
                                    <i className="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="conglomerate_country" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  {this.props.t(
                                    "app_conglomerado_modal_actualizar_departamento"
                                  )}{" "}
                                </label>
                                <select
                                  name="conglomerate_department"
                                  value={values.conglomerate_department}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={`form-control form-control-sm ${errors.conglomerate_department &&
                                    touched.conglomerate_department &&
                                    "is-invalid"}`}
                                >
                                  <option value={""} disabled>
                                    -- Seleccione --
                                  </option>
                                  {mapOptionsDepartments}
                                </select>
                                <div style={{ color: "#D54B4B" }}>
                                  {errors.conglomerate_department &&
                                  touched.conglomerate_department ? (
                                    <i class="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="conglomerate_department" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  {this.props.t(
                                    "app_conglomerado_modal_actualizar_ciudad"
                                  )}{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <select
                                  name="conglomerate_city"
                                  value={values.conglomerate_city}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={`form-control form-control-sm ${errors.conglomerate_city &&
                                    touched.conglomerate_city &&
                                    "is-invalid"}`}
                                >
                                  <option value={""} disabled>
                                    -- Seleccione --
                                  </option>
                                  {mapOptionsCitys}
                                </select>
                                <div style={{ color: "#D54B4B" }}>
                                  {errors.conglomerate_city &&
                                  touched.conglomerate_city ? (
                                    <i class="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="conglomerate_city" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  {this.props.t(
                                    "app_conglomerado_modal_actualizar_cargo_responsable"
                                  )}{" "}
                                </label>
                                <select
                                  name="conglomerate_charge"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.conglomerate_charge}
                                  className="form-control form-control-sm"
                                >
                                  {" "}
                                  <option value={" "} >
                                    {" "}
                                    --
                                     {this.props.t(
                                      "app_conglomerado_form_select_cargo_responsable"
                                    )}{" "}
                                    --{" "}
                                  </option>
                                  
                                  {mapOptionsCharges}
                                </select>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>
                                  <Trans>
                                    {this.props.t(
                                      "app_conglomerado_modal_actualizar_descripcion"
                                    )}
                                  </Trans>
                                </label>
                                <textarea
                                  name="description"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.description}
                                  className="form-control form-control-sm"
                                />
                                {/* <Field
                                  type="text"
                                  name="descripcion"
                                  className="form-control form-control-sm"
                                /> */}
                                <ErrorMessage name="description" />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  <Trans>
                                    {this.props.t(
                                      "app_conglomerado_modal_actualizar_estado"
                                    )}
                                  </Trans>{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <div className="text-justify ">
                                  <Field
                                    name="status"
                                    type=""
                                    render={({ field, form }) => {
                                      //console.log("field", field);
                                      return (
                                        // <input
                                        //   type="checkbox"
                                        //   checked={field.value}
                                        //   {...field}
                                        // />
                                        <CustomInput
                                          type="checkbox"
                                          id="conglomeradoModalEdit"
                                          label={this.props.t(
                                            "app_conglomerado_modal_actualizar_estado_descripcion"
                                          )}
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
                                  {/* <Field
                                    name="estado"
                                    type=""
                                    render={({ field, form }) => {
                                      //console.log("field", field);
                                      return (
                                        <input
                                          type="checkbox"
                                          checked={field.value}
                                          {...field}
                                        />
                                      );
                                    }}
                                  /> */}
                                  <ErrorMessage name="status" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      type="button"
                      className={"btn btn-outline-success btn-sm"}
                      onClick={e => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      <i className="fa fa-pencil" />{" "}
                      {this.props.t(
                        "app_conglomerado_modal_actualizar_botom_actualizar"
                      )}
                    </button>
                    <button
                      className={"btn btn-outline-secondary btn-sm"}
                      type="button"
                      onClick={() => {
                        this.setState({ modal: false });
                      }}
                    >
                      <i className="fa fa-times" />{" "}
                      {this.props.t(
                        "app_conglomerado_modal_actualizar_botom_cerrar"
                      )}
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

ModalEditConglomerado.propTypes = {
  modaleditstate: PropTypes.bool.isRequired,
  id: PropTypes.string,
  t: PropTypes.any
};

export default ModalEditConglomerado;

// function CheckBox(props) {
//   return (
//     <Field
//       {...props}
//       render={({ field, form }) => {
//         // console.log("field", field);
//         return <input type="checkbox" checked={field.value} {...field} />;
//       }}
//     />
//   );
// }

{
  /* <form className={"form"} onSubmit={this.handleSubmit}>
<ModalBody>
  <p>Probando</p>
</ModalBody>
<ModalFooter>
  <button type={"submit"}> Actualizar </button>
  <button
    type="button"
    onClick={() => {
      this.toggle();
    }}
  >
    {" "}
    Cerrar
  </button>
</ModalFooter>
</form> */
}
