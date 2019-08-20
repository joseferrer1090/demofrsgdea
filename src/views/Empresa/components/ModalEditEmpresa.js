import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CustomInput
} from "reactstrap";
import {
  EMPRESA_EDIT,
  CONGLOMERADO_SELECTED,
  CARGO_RESPONSABLE_SELECTED
} from "./../../../data/JSON-SERVER";
import { Formik, withFormik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import IMGEMPRESA from "./../../../assets/img/company.svg";

class ModalEditEmpresa extends React.Component {
  state = {
    modal: this.props.modaleditempresa,
    dataCompany: {},
    dataConglomerate: [],
    dataCharge: [],
    id: this.props.id
  };

  componentDidMount() {
    this.getConglomerate();
    this.getCharge();
  }

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
    this.getCompanyById(id);
  };

  getConglomerate = () => {
    fetch(`http://192.168.10.180:7000/api/sgdea/conglomerate/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + window.btoa("sgdea:123456")
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataConglomerate: data
        });
      })
      .catch(Error => console.log(Error));
  };

  getCompanyById = id => {
    fetch(`http://192.168.10.180:7000/api/sgdea/company/${id}/jferrer`, {
      method: "GET",
      headers: {
        Authorization: "Basic " + window.btoa("sgdea:123456"),
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataCompany: {
            code: data.code,
            nit: data.nit,
            name: data.name,
            description: data.description,
            status: data.status,
            conglomerate: data.conglomerate.id,
            charge: data.charge
          }
        });
      })
      .catch(Error => console.log("", Error));
  };

  getCharge = () => {
    fetch(`http://192.168.10.180:7000/api/sgdea/charge/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + window.btoa("sgdea:123456")
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataCharge: data
        });
      })
      .catch(Error => console.log("", Error));
  };

  render() {
    console.log(this.state.dataCharge);
    console.log(this.state.dataCompany);
    const companyById = this.state.dataCompany;
    const conglomerateList = this.state.dataConglomerate.map((aux, id) => {
      return (
        <option key={id} value={aux.id}>
          {aux.name}
        </option>
      );
    });

    const chargeList = this.state.dataCharge.map((aux, id) => {
      return (
        <option key={id} value={aux.id}>
          {aux.name}
        </option>
      );
    });

    const selectCharge = companyById.charge;
    let selection;
    if (selectCharge === "") {
      selection = <option value={" "}> Seleccione el cargo </option>;
    } else {
      selection = chargeList;
    }

    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader> Actualizar Empresa {companyById.name} </ModalHeader>
          <Formik
            enableReinitialize={true}
            initialValues={companyById}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, "", 2));
                setSubmitting(false);
              }, 1000);
            }}
            validationSchema={Yup.object().shape({
              conglomerate: Yup.string()
                .ensure()
                .required(" Por favor seleccione un conglomerado."),
              code: Yup.string().required(" Por favor introduzca un código."),
              name: Yup.string().required(" Por favor introduzca un nombre."),
              nit: Yup.string().required(" Por favor introduzca un NIT."),
              description: Yup.string().max(250, " Máximo 250 caracteres."),
              cargo_responsable: Yup.string()
                .ensure()
                .required(" Por favor seleccione un cargo responsable."),
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
                <form className="form">
                  <ModalBody>
                    <Row>
                      <Col sm="3">
                        <img src={IMGEMPRESA} className="img-thumbnail" />
                      </Col>
                      <Col sm="9">
                        <div className="">
                          {" "}
                          <h5
                            className=""
                            style={{ borderBottom: "1px solid black" }}
                          >
                            {" "}
                            Datos{" "}
                          </h5>{" "}
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <dl className="param">
                                Conglomerado{" "}
                                <span className="text-danger">*</span>{" "}
                                <dd>
                                  {" "}
                                  <select
                                    className={`form-control form-control-sm ${errors.conglomerate &&
                                      touched.conglomerate &&
                                      "is-invalid"}`}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name={"conglomerate"}
                                    value={values.conglomerate}
                                  >
                                    {conglomerateList}
                                  </select>
                                  <div style={{ color: "#D54B4B" }}>
                                    {errors.conglomerate &&
                                    touched.conglomerate ? (
                                      <i className="fa fa-exclamation-triangle" />
                                    ) : null}
                                    <ErrorMessage name="conglomerate" />
                                  </div>
                                  {/* <Select
                            onChange={
                              this.handleChangeSelectedOptionUpdateConglomerado
                            }
                            value={this.selectedOptionUpdateConglomerado}
                            options={dataConglomeradoExample}
                          /> */}
                                </dd>
                              </dl>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <dl className="param">
                                Código <span className="text-danger">*</span>{" "}
                                <dd>
                                  <input
                                    name={"code"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.code}
                                    type="text"
                                    className={`form-control form-control-sm ${errors.code &&
                                      touched.code &&
                                      "is-invalid"}`}
                                  />
                                  <div
                                    className=""
                                    style={{ color: "#D54B4B" }}
                                  >
                                    {errors.code && touched.code ? (
                                      <i class="fa fa-exclamation-triangle" />
                                    ) : null}
                                    <ErrorMessage name="code" />
                                  </div>
                                </dd>
                              </dl>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <dl className="param">
                                Nit <span className="text-danger">*</span>{" "}
                                <dd>
                                  {" "}
                                  <input
                                    type="text"
                                    name={"nit"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.nit}
                                    className={`form-control form-control-sm ${errors.nit &&
                                      touched.nit &&
                                      "is-invalid"}`}
                                  />{" "}
                                  <div
                                    className=""
                                    style={{ color: "#D54B4B" }}
                                  >
                                    {errors.nit && touched.nit ? (
                                      <i class="fa fa-exclamation-triangle" />
                                    ) : null}
                                    <ErrorMessage name="nit" />
                                  </div>
                                </dd>
                              </dl>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <dl className="param">
                                Nombre<span className="text-danger">*</span>{" "}
                                <dd>
                                  {" "}
                                  <input
                                    name={"name"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    type="text"
                                    className={`form-control form-control-sm ${errors.name &&
                                      touched.name &&
                                      "is-invalid"}`}
                                  />{" "}
                                  <div
                                    className=""
                                    style={{ color: "#D54B4B" }}
                                  >
                                    {errors.name && touched.name ? (
                                      <i class="fa fa-exclamation-triangle" />
                                    ) : null}
                                    <ErrorMessage name="name" />
                                  </div>
                                </dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col sm="12">
                        <Card>
                          <CardHeader> Mas informacion </CardHeader>
                          <CardBody>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label> Descripción </label>
                                  <input
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="text"
                                    className={`form-control form-control-sm ${errors.description &&
                                      touched.description &&
                                      "is-invalid"}`}
                                  />
                                  <ErrorMessage name="description" />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label> Cargo responsable </label>
                                  <select
                                    name={"charge"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.charge}
                                    className={`form-control form-control-sm ${errors.charge &&
                                      touched.charge &&
                                      "is-invalid"}`}
                                  >
                                    <option value={" "}>
                                      Seleccione cargo
                                    </option>
                                    {selection}
                                  </select>
                                  <div style={{ color: "#D54B4B" }}>
                                    {errors.charge && touched.charge ? (
                                      <i className="fa fa-exclamation-triangle" />
                                    ) : null}
                                    <ErrorMessage name="charge" />
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-12">
                                <div className="form-group">
                                  <label>
                                    {" "}
                                    Estado{" "}
                                    <span className="text-danger">*</span>{" "}
                                  </label>
                                  <div className="text-justify">
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
                                            label="Si esta opción se encuentra activada, representa
                                          que el conglomerado es visible en el sistema y se
                                          podrán realizar operaciones entre cada uno de los
                                          módulos correspondientes de la aplicación. En caso
                                          contrario el conglomerado no se elimina del
                                          sistema solo quedará inactivo e invisibles para
                                          cada uno de los módulos correspondiente del
                                          sistema."
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
                                    {/* <CustomInput
                                      type="checkbox"
                                      id="CheckEditEmpresa"
                                      label="Si esta opción se encuentra activada,
                          Representa que la empresa es visible en el
                          sistema y se podrán realizar operaciones entre
                          cada uno de los módulos correspondientes de la
                          aplicación. En caso contrario la empresa no se
                          elimina del sistema solo quedará inactiva e
                          invisibles para cada uno de los módulos
                          correspondiente del sistema."
                                    /> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      type="button"
                      className={"btn btn-outline-success btn-sm"}
                      onClick={() => {
                        alert("Hola");
                      }}
                    >
                      <i className="fa fa-pencil" /> Actualizar Empesa
                    </button>
                    <button
                      className={"btn btn-outline-secondary btn-sm"}
                      type="button"
                      onClick={() => {
                        this.setState({ modal: false });
                      }}
                    >
                      <i className="fa fa-times" /> Cerrar
                    </button>
                  </ModalFooter>
                </form>
              );
            }}
          </Formik>
        </Modal>
      </Fragment>
    );
  }
}

ModalEditEmpresa.propTypes = {
  modaleditempresa: PropTypes.bool.isRequired
};

export default ModalEditEmpresa;
