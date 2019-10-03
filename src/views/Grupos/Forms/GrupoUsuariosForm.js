import React, { Component } from "react";
import PropTypes from "prop-types";
import { Formik, withFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CustomInput
} from "reactstrap";
import Select from "react-select";
import AsyncSelect from "../../../../node_modules/react-select/lib/AsyncCreatable";
import { strict } from "assert";

const GrupoUsuariosForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    setFieldValue,
    setFieldTouched,
    handleBlur,
    handleSubmit,
    handleReset
  } = props;
  return (
    <Row>
      <Col sm="8" md={{ offset: 2 }}>
        <form>
          <Card>
            <CardHeader> Registro de grupo de usuarios </CardHeader>
            <CardBody>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      {" "}
                      Código <span className="text-danger">*</span>{" "}
                    </label>
                    <input
                      name="codigo"
                      onChange={e => {
                        setFieldValue("codigo", e.target.value.toUpperCase());
                      }}
                      onBlur={handleBlur}
                      type="text"
                      className={`form-control form-control-sm ${errors.codigo &&
                        touched.codigo &&
                        "is-invalid"}`}
                      value={values.codigo}
                    />
                    <div style={{ color: "#D54B4B" }}>
                      {errors.codigo && touched.codigo ? (
                        <i className="fa fa-exclamation-triangle" />
                      ) : null}
                      <ErrorMessage name="codigo" />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      {" "}
                      Nombre <span className="text-danger">*</span>
                    </label>
                    <input
                      name="nombre"
                      onChange={e => {
                        setFieldValue("nombre", e.target.value.toUpperCase());
                      }}
                      onBlur={handleBlur}
                      type="text"
                      className={`form-control form-control-sm ${errors.nombre &&
                        touched.nombre &&
                        "is-invalid"}`}
                      value={values.nombre}
                    />
                    <div style={{ color: "#D54B4B" }}>
                      {errors.nombre && touched.nombre ? (
                        <i className="fa fa-exclamation-triangle" />
                      ) : null}
                      <ErrorMessage name="nombre" />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label> Descripción</label>
                    <textarea
                      name="descripcion"
                      value={values.descripcion}
                      className="form-control form-control-sm"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div style={{ color: "#D54B4B" }}>
                      {errors.descripcion && touched.descripcion ? (
                        <i className="fa fa-exclamation-triangle" />
                      ) : null}
                      <ErrorMessage name="descripcion" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <Card>
                    <CardBody>
                      <h5 className=""> Búsqueda de usuarios </h5>
                      <hr />
                      <br />
                      <div className="row">
                        <div className="col-md-3">
                          <div className="form-group">
                            <label>
                              {" "}
                              Conglomerado{" "}
                              <span className="text-danger">*</span>{" "}
                            </label>
                            <SelectConglomerado
                              name="conglomerado"
                              onChange={e => {
                                setFieldValue("conglomerado", e.target.value);
                              }}
                              onBlur={() => {
                                setFieldTouched("conglomerado", true);
                              }}
                              value={values.conglomerado}
                              className={`form-control form-control-sm ${errors.conglomerado &&
                                touched.conglomerado &&
                                "is-invalid"}`}
                            />
                            <div style={{ color: "#D54B4B" }}>
                              {errors.conglomerado && touched.conglomerado ? (
                                <i className="fa fa-exclamation-triangle" />
                              ) : null}
                              <ErrorMessage name="conglomerado" />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label>
                              {" "}
                              Empresa <span className="text-danger">
                                *
                              </span>{" "}
                            </label>
                            <SelectEmpresa
                              idConglomerado={props.values.conglomerado}
                              name="empresa"
                              value={values.empresa}
                              onChange={e => {
                                setFieldValue("empresa", e.target.value);
                              }}
                              onBlur={() => {
                                setFieldTouched("empresa", true);
                              }}
                              className={`form-control form-control-sm ${errors.empresa &&
                                touched.empresa &&
                                "is-invalid"}`}
                            />
                            <div style={{ color: "#D54B4B" }}>
                              {errors.empresa && touched.empresa ? (
                                <i className="fa fa-exclamation-triangle" />
                              ) : null}
                              <ErrorMessage name="empresa" />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label>
                              {" "}
                              Sede <span className="text-danger">*</span>{" "}
                            </label>
                            <SelectSedes
                              company={props.values.empresa}
                              name="sede"
                              value={values.sede}
                              onChange={e => {
                                setFieldValue("sede", e.target.value);
                              }}
                              onBlur={() => {
                                setFieldTouched("sede", true);
                              }}
                              className={`form-control form-control-sm ${errors.sede &&
                                touched.sede &&
                                "is-invalid"}`}
                            />
                            <div style={{ color: "#D54B4B" }}>
                              {errors.sede && touched.sede ? (
                                <i className="fa fa-exclamation-triangle" />
                              ) : null}
                              <ErrorMessage name="sede" />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label>
                              {" "}
                              Dependencia <span className="text-danger">
                                *
                              </span>{" "}
                            </label>
                            <SelectDependencia
                              headquarter={props.values.sede}
                              name="dependencia"
                              value={values.dependencia}
                              onChange={e => {
                                setFieldValue("dependencia", e.target.value);
                              }}
                              onBlur={() => {
                                setFieldTouched("dependencia", true);
                              }}
                              className={`form-control form-control-sm ${errors.dependencia &&
                                touched.dependencia &&
                                "is-invalid"}`}
                            />
                            <div style={{ color: "#D54B4B" }}>
                              {errors.dependencia && touched.dependencia ? (
                                <i className="fa fa-exclamation-triangle" />
                              ) : null}
                              <ErrorMessage name="dependencia" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Usuarios disponibles</label>
                        <select
                          className="form-control form-control-sm"
                          multiple
                          disabled
                        >
                          <option>Usuarios disponibles de la consulta</option>
                        </select>
                      </div>

                      {/*dataOk ? (
                                <div className="form-group">
                                  <label>Usuarios disponibles</label>
                                  <select className="form-control form-control-sm"  multiple>
                                   {buscarOpciones}
                                  </select>
                                </div>
                            ) : null*/}
                    </CardBody>
                    <CardFooter>
                      <div className="float-right">
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          // onClick={() => {
                          //   this.setState({ dataOk: !this.state.dataOk });
                          // }}
                        >
                          {" "}
                          <i className="fa fa-search" /> Buscar
                        </button>{" "}
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>
                      {" "}
                      Seleccione usuario(s) asignados{" "}
                      <span className="text-danger">*</span>{" "}
                    </label>
                    <MySelect
                      idDependence={props.values.dependencia}
                      name={"roles"}
                      value={values.roles}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      error={errors.roles}
                      touched={touched.roles}
                    />
                    {touched ? (
                      <div style={{ color: "red" }}>
                        {" "}
                        <div style={{ color: "#D54B4B" }}>
                          {errors.roles && touched.roles ? (
                            <i className="fa fa-exclamation-triangle" />
                          ) : null}
                          <ErrorMessage name={"roles"} />
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <div className="">
                      <div className="form-group">
                        <label>
                          {" "}
                          Estado <span className="text-danger">*</span>{" "}
                        </label>
                        <div className="text-justify">
                          <CustomInput
                            name="estado"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.estado &&
                              touched.estado &&
                              "invalid-feedback"
                            }
                            value={values.estado}
                            type="checkbox"
                            id="ExampleCheckBoxInput"
                            label="Si esta opción se encuentra activada, representa
                                que el grupo es visible en el sistema y se
                                podrán realizar operaciones entre cada uno de
                                los módulos correspondientes de la aplicación.
                                En caso contrario el grupo no se elimina del
                                sistema solo quedará inactiva e invisibles para
                                cada uno de los módulos correspondiente del
                                sistema"
                          />
                          <ErrorMessage name="estado" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
            <CardFooter>
              <div className="pull-right">
                <button
                  type="submit"
                  className="btn btn-outline-secondary btn-sm"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                >
                  {isSubmitting ? (
                    <i className=" fa fa-spinner fa-spin" />
                  ) : (
                    <div>
                      <i className="fa fa-save" /> Guardar
                    </div>
                  )}
                </button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Col>
    </Row>
  );
};

export default withFormik({
  mapPropsToValues: props => ({
    codigo: props.grupoUsuarios.codigo,
    nombre: props.grupoUsuarios.nombre,
    descripcion: props.grupoUsuarios.descripcion,
    conglomerado: props.grupoUsuarios.conglomerado,
    empresa: props.grupoUsuarios.empresa,
    sede: props.grupoUsuarios.sede,
    dependencia: props.grupoUsuarios.dependencia,
    estado: props.grupoUsuarios.estado,
    roles: props.grupoUsuarios.roles
  }),
  validationSchema: Yup.object().shape({
    codigo: Yup.string()
      .min(6, " Mínimo 6 caracteres.")
      .max(6, " Máximo 6 caracteres.")
      .required(" Por favor introduzca un código."),
    nombre: Yup.string()
      .required(" Por favor introduzca un nombre.")
      .max(100),
    descripcion: Yup.string().max(
      250,
      " Máximo 250 para la descripción del conglomerado"
    ),
    conglomerado: Yup.string()
      .ensure()
      .required(" Por favor seleccione un conglomerado."),
    empresa: Yup.string()
      .ensure()
      .required(" Por favor seleccione una empresa."),
    sede: Yup.string()
      .ensure()
      .required(" Por favor seleccione una sede."),
    dependencia: Yup.string()
      .ensure()
      .required(" Por favor seleccione una dependencia."),
    estado: Yup.bool()
      .test(
        "Activo",
        "Es necesario activar el grupo de usuarios.",
        value => value === true
      )
      .required(" Se debe aceptar la activacion de la empresa."),
    roles: Yup.array()
      .of(
        Yup.object().shape({
          label: Yup.string().required(),
          value: Yup.string().required()
        })
      )
      .required(" Por favor seleccione al menos un rol.")
  }),
  handleSubmit: (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      resetForm();
    }, 1000);
  }
})(GrupoUsuariosForm);

// -------------------------------------------------------------------- //
class SelectConglomerado extends React.Component {
  state = {
    dataConglomerado: []
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch(`http://192.168.10.180:7000/api/sgdea/conglomerate/active`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + window.btoa("sgdea:123456")
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataConglomerado: data
        });
      });
  };

  render() {
    return (
      <div>
        <select
          name={this.props.name}
          onChange={this.props.onChange}
          // onChange={e => setFieldValue("conglomerado", e)}
          value={this.props.value}
          // onBlur={this.handleBlur}
          className={this.props.className}
        >
          <option value={""}>-- Seleccione --</option>
          {this.state.dataConglomerado.map((aux, id) => {
            return (
              <option key={id} value={aux.id}>
                {aux.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

// --------------------------------------------------------------------------- //

class SelectEmpresa extends React.Component {
  state = {
    dataEmpresa: [],
    id: this.props.idConglomerado
  };

  static getDerivedStateFromProps(props, state) {
    if (props.idConglomerado !== state.id) {
      return {
        id: props.idConglomerado
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.idConglomerado !== prevProps.idConglomerado) {
      this.getDataCompany();
    }
  }

  componentDidMount() {
    this.getDataCompany();
  }

  getDataCompany = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/company/conglomerate/${this.state.id}`,
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
          dataEmpresa: data
        });
      })
      .catch(err => console.log("Error", err));
  };

  render() {
    return (
      <div>
        <select
          name={this.props.name}
          value={this.props.value}
          className={this.props.className}
          onChange={this.props.onChange}
        >
          <option value={""}> -- Seleccione -- </option>
          {this.state.dataEmpresa.map((aux, id) => {
            return (
              <option key={id} value={aux.id}>
                {aux.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

// -------------------------------------------------------------------------- //

class SelectSedes extends React.Component {
  state = {
    dataHeadquarter: [],
    id: this.props.company
  };

  static getDerivedStateFromProps(props, state) {
    if (props.company !== state.id) {
      return {
        company: props.company
      };
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.company !== prevProps.company) {
      // metodo del fetch()
      this.getDataHeadquarter();
    }
  }

  componentDidMount() {
    this.getDataHeadquarter();
  }

  getDataHeadquarter = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/headquarter/company/${this.props.company}`,
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
          dataHeadquarter: data
        });
      })
      .catch(err => console.log("Error", err));
  };
  render() {
    return (
      <div>
        <select
          name={this.props.name}
          value={this.props.value}
          className={this.props.className}
          onChange={this.props.onChange}
        >
          <option value={""}>-- Seleccione -- </option>
          {this.state.dataHeadquarter.map((aux, id) => {
            return (
              <option key={id} value={aux.id}>
                {aux.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

// ------------------------------------------------------------------------------------------ //

class SelectDependencia extends React.Component {
  state = {
    dataDependence: [],
    id: this.props.headquarter
  };
  static getDerivedStateFromProps(props, state) {
    if (props.headquarter !== state.id) {
      return {
        headquarter: props.headquarter
      };
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.headquarter !== prevProps.headquarter) {
      // metodo del fetch()
      this.getDataDependence();
    }
  }

  componentDidMount() {
    this.getDataDependence();
  }

  getDataDependence = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/dependence/headquarter/${this.props.headquarter}`,
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
          dataDependence: data
        });
      })
      .catch(err => console.log("Error", err));
  };
  render() {
    return (
      <div>
        <select
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.onChange}
          className={this.props.className}
        >
          <option value={""}>-- Seleccione --</option>
          {this.state.dataDependence.map((aux, id) => {
            return (
              <option key={id} value={aux.id}>
                {aux.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

class MySelect extends React.Component {
  state = {
    dataUsersDependencia: [],
    id: this.props.idDependence
  };

  static getDerivedStateFromProps(props, state) {
    if (props.idDependence !== state.id) {
      return {
        id: props.idDependence
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.idDependence !== prevProps.idDependence) {
    }
  }

  getDataUserDependenceList = () => {
    fetch(`http://192.168.10.180:7000/api/user/dependence/${this.state.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + window.btoa("sgdea:123456")
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataUsersDependencia: data
        });
      })
      .catch(err => console.log("Error", err));
  };

  // Lista de usuarios por la dependencia //

  handleChange = value => {
    this.props.onChange("roles", value);
  };

  handleBlur = () => {
    this.props.onBlur("roles", true);
  };

  render() {
    console.log(this.state.dataUsersDependencia);
    return (
      <div style={{ margin: "0" }}>
        <Select
          isDisabled={true}
          name={this.props.name}
          isMulti
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
          placeholder={"-- seleccione rol --"}
        />
        {/* {!!this.props.error && this.props.touched && (
          <div
            style={{ color: "red", marginTop: ".5rem" }}
            className="invalid-feedback"
          >
            {this.props.error}
          </div>
        )} */}
      </div>
    );
  }
}
