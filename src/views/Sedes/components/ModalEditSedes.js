import React, { Component, Fragment } from "react";
import {
  CustomInput,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Card,
  Col,
  Row,
  CardBody,
  CardTitle,
  CardHeader,
  Collapse
} from "reactstrap";
import PropTypes from "prop-types";
import IMGSEDE from "./../../../assets/img/teamwork.svg";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";

class ModalEditSedes extends React.Component {
  state = {
    modal: this.props.modaledit,
    secuencia: 1,
    conglomerado: "",
    empresa: "",
    codigo: "",
    nombre: "",
    descripcion: "",
    prefijo_radicacion: "",
    sec_radicacion: "",
    cargo_responsable: "",
    pais: "",
    departamento: "",
    ciudad: "",
    direccion: "",
    telefono: "",
    estado: "",
    selected_conglomerado: [],
    selected_empresa: [],
    selected_cargo_responsable: [],
    selected_pais: [],
    selected_departamento: [],
    selected_ciudad: []
  };

  componentDidMount() {
    this.getDataSedes();
    this.getDataConglomerado();
    this.getDataEmpresa();
    this.getDataCargoResponsable();
    this.getDataPais();
    this.getDataCiudad();
    this.getDataDepartamento();
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  toggleCollapse = () => {
    this.setState({ collapse: !this.state.collapse, collapse2: false });
  };

  getDataSedes = () => {
    fetch("http://localhost:3001/sedes/1")
      .then(response => response.json())
      .then(data => {
        this.setState({
          conglomerado: data.conglomerado,
          nombre: data.nombre,
          empresa: data.empresa,
          codigo: data.codigo,
          descripcion: data.descripcion,
          prefijo_radicacion: data.prefijo_radicacion,
          sec_radicacion: data.sec_radicacion,
          cargo_responsable: data.cargo_responsable,
          pais: data.pais,
          departamento: data.departamento,
          ciudad: data.ciudad,
          direccion: data.direccion,
          telefono: data.telefono,
          estado: data.estado
        });
        console.log(this.state);
      })
      .catch(error => console.log(error));
  };

  getDataConglomerado = () => {
    fetch("http://localhost:3001/conglomerado")
      .then(response => response.json())
      .then(data => {
        this.setState({
          selected_conglomerado: data
        });
      })
      .catch(error => console.log(error));
  };

  getDataEmpresa = () => {
    fetch("http://localhost:3001/empresa")
      .then(response => response.json())
      .then(data => {
        this.setState({
          selected_empresa: data
        });
      })
      .catch(error => console.log(error));
  };

  getDataCargoResponsable = () => {
    fetch("http://localhost:3001/cargo_responsable")
      .then(response => response.json())
      .then(data => {
        this.setState({
          selected_cargo_responsable: data
        });
      })
      .catch(error => console.log(error));
  };

  getDataPais = () => {
    fetch("http://localhost:3001/pais")
      .then(response => response.json())
      .then(data => {
        this.setState({
          selected_pais: data
        });
      })
      .catch(error => console.log(error));
  };

  getDataCiudad = () => {
    fetch("http://localhost:3001/ciudad")
      .then(response => response.json())
      .then(data => {
        this.setState({
          selected_ciudad: data
        });
      })
      .catch(error => console.log(error));
  };

  getDataDepartamento = () => {
    fetch("http://localhost:3001/departamento")
      .then(response => response.json())
      .then(data => {
        this.setState({
          selected_departamento: data
        });
      })
      .catch(error => console.log(error));
  };

  render() {
    const dataPreview = {
      conglomerado: this.state.conglomerado,
      empresa: this.state.empresa,
      codigo: this.state.codigo,
      nombre: this.state.nombre,
      descripcion: this.state.descripcion,
      prefijo_radicacion: this.state.prefijo_radicacion,
      sec_radicacion: this.state.sec_radicacion,
      cargo_responsable: this.state.cargo_responsable,
      pais: this.state.pais,
      departamento: this.state.departamento,
      ciudad: this.state.ciudad,
      direccion: this.state.direccion,
      telefono: this.state.telefono,
      estado: this.state.estado
    };

    const auxSelected = this.state.selected_conglomerado.map((aux, id) => {
      return (
        <option key={id} value={aux.id}>
          {aux.nombre}
        </option>
      );
    });

    const auxSelectedEmpresa = this.state.selected_empresa.map((aux, id) => {
      return (
        <option key={id} value={aux.id}>
          {aux.nombre}
        </option>
      );
    });

    const auxSelectedCargoResponsable = this.state.selected_cargo_responsable.map(
      (aux, id) => {
        return (
          <option key={id} value={aux.id}>
            {aux.nombre}
          </option>
        );
      }
    );

    const auxSelectedPais = this.state.selected_pais.map((aux, id) => {
      return (
        <option key={id} value={aux.id}>
          {aux.nombre}
        </option>
      );
    });

    const auxDepartamento = this.state.selected_departamento.map((aux, id) => {
      return (
        <option key={id} value={aux.id}>
          {aux.nombre}
        </option>
      );
    });

    const auxCiudadSelected = this.state.selected_ciudad.map((aux, id) => {
      return (
        <option key={id} value={aux.id}>
          {aux.nombre}
        </option>
      );
    });
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader> Actualizar sede </ModalHeader>
          <Formik
            initialValues={dataPreview}
            validationSchema={Yup.object().shape({
              conglomerado: Yup.string()
                .ensure()
                .required("necesario asignar conglomerado"),
              empresa: Yup.string()
                .ensure()
                .required("necesario asignar empresa"),
              codigo: Yup.string().required("necesario el codigo para la sede"),
              nombre: Yup.string().required("necesario para la sede"),
              descripcion: Yup.string(),
              prefijo_radicacion: Yup.string().required(
                "necesario asignar un prefijo en las sede"
              ),
              sec_radicacion: Yup.string().required(
                "necesario asignar secuencia de radicacion"
              ),
              cargo_responsable: Yup.string()
                .ensure()
                .required("necesario asigar cargo responsable"),
              pais: Yup.string(),
              departamento: Yup.string(),
              ciudad: Yup.string().required(
                "necesario asignar ciudad a la sede"
              ),
              direccion: Yup.string().required(
                "necesario asignar direccion a la sede"
              ),
              telefono: Yup.string().required(
                "necesario asignar telefono a la sede"
              ),
              estado: Yup.bool().test("Activo", "", value => value === true)
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, "", 1));
                setSubmitting(false);
              }, 1000);
            }}
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
                    <Row>
                      <Col sm="3">
                        <img src={IMGSEDE} className="img-thumbnail" />
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
                              <label>
                                {" "}
                                Conglomerado{" "}
                                <span className="text-danger">*</span>{" "}
                              </label>
                              <select
                                name="conglomerado"
                                className={`form-control form-control-sm ${errors.conglomerado &&
                                  touched.conglomerado &&
                                  "is-invalid"}`}
                                value={values.conglomerado}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                {" "}
                                <option value="">Seleccione...</option>{" "}
                                {auxSelected}
                              </select>
                              <ErrorMessage name="conglomerado" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {" "}
                                Empresa <span className="text-danger">
                                  *
                                </span>{" "}
                              </label>
                              <select
                                name={"empresa"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.empresa}
                                className={`form-control form-control-sm ${errors.empresa &&
                                  touched.empresa &&
                                  "is-invalid"}`}
                              >
                                {" "}
                                <option value="">Seleccione...</option>{" "}
                                {auxSelectedEmpresa}
                              </select>
                              <ErrorMessage name="empresa" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                Código <span className="text-danger">*</span>{" "}
                              </label>
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
                              <ErrorMessage name={"codigo"} />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {" "}
                                Nombre <span className="text-danger">
                                  *
                                </span>{" "}
                              </label>
                              <input
                                type="text"
                                name={"nombre"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.nombre}
                                className={`form-control form-control-sm ${errors.nombre &&
                                  touched.nombre &&
                                  "is-invalid"}`}
                              />
                              <ErrorMessage name={"nombre"} />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label> Descripción </label>
                              <textarea
                                name={"descripcion"}
                                value={values.descripcion}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`form-control form-control-sm ${errors.descripcion &&
                                  touched.descripcion &&
                                  "is-invalid"}`}
                              />
                              <ErrorMessage name={"descripcion"} />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {" "}
                                Prefijo de radicación{" "}
                                <span className="text-danger">*</span>{" "}
                              </label>
                              <input
                                type="text"
                                name="prefijo_radicacion"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.prefijo_radicacion}
                                className="form-control form-control-sm"
                                maxLength={"6"}
                                placeholder=" "
                                name={"prefijo_radicacion"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.prefijo_radicacion}
                              />
                              <ErrorMessage name={"prefijo_radicacion"} />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {" "}
                                Secuencia de radicación{" "}
                                <span className="text-danger">*</span>{" "}
                              </label>
                              <input
                                type="number"
                                name="sec_radicacion"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.sec_radicacion}
                                className="form-control form-control-sm"
                                min={0}
                              />
                              <ErrorMessage name="sec_radicacion" />
                            </div>
                          </div>
                        </div>
                      </Col>

                      <Col sm="12">
                        <Card>
                          <CardHeader>
                            {" "}
                            <a
                              onClick={() => {
                                this.toggleCollapse();
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              {" "}
                              Más información{" "}
                            </a>{" "}
                          </CardHeader>
                          <Collapse isOpen={this.state.collapse}>
                            <CardBody>
                              <form className="form">
                                <div className="row" />
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <label> Cargo responsable </label>
                                      <select
                                        name="cargo_responsable"
                                        className={`form-control form-control-sm ${errors.cargo_responsable &&
                                          touched.cargo_responsable &&
                                          "is-invalid"}`}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.cargo_responsable}
                                      >
                                        {auxSelectedCargoResponsable}
                                      </select>
                                      <ErrorMessage name="cargo_responsable" />
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="form-group">
                                      <label> País</label>
                                      <select
                                        name="pais"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="form-control form-control-sm"
                                        value={values.pais}
                                      >
                                        {" "}
                                        {auxSelectedPais}
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="form-group">
                                      <label> Departamento</label>
                                      <select
                                        name="departamento"
                                        value={values.departamento}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="form-control form-control-sm"
                                      >
                                        {auxDepartamento}
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="form-group">
                                      <label>
                                        {" "}
                                        Ciudad{" "}
                                        <span className="text-danger">
                                          *
                                        </span>{" "}
                                      </label>
                                      <select
                                        name="ciudad"
                                        value={values.ciudad}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="form-control form-control-sm"
                                      >
                                        {auxCiudadSelected}
                                      </select>
                                    </div>
                                  </div>

                                  <div className="col-md-8">
                                    <div className="form-group">
                                      <label>
                                        {" "}
                                        Dirección{" "}
                                        <span className="text-danger">
                                          *
                                        </span>{" "}
                                      </label>
                                      <input
                                        name={"direccion"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.direccion}
                                        type="text"
                                        className={`form-control form-control-sm ${errors.direccion &&
                                          touched.direccion &&
                                          "is-invalid"}`}
                                      />
                                      <ErrorMessage name="direccion" />
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="from-group">
                                      <label>
                                        {" "}
                                        Teléfono{" "}
                                        <span className="text-danger">
                                          *
                                        </span>{" "}
                                      </label>
                                      <input
                                        type="text"
                                        name="telefono"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.telefono}
                                        className={`form-control form-control-sm ${errors.telefono &&
                                          touched.telefono &&
                                          "is-invalid"}`}
                                      />
                                      <ErrorMessage name="telefono" />
                                    </div>
                                  </div>
                                </div>

                                <div className="row" />

                                <div className="form-group">
                                  <label>
                                    {" "}
                                    Estado{" "}
                                    <span className="text-danger">*</span>{" "}
                                  </label>
                                  <div className="text-justify">
                                    <Field
                                      name="estado"
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
                                              errors.estado &&
                                              touched.estado &&
                                              "invalid-feedback"
                                            }
                                          />
                                        );
                                      }}
                                    />
                                  </div>
                                </div>
                              </form>
                            </CardBody>
                          </Collapse>
                        </Card>
                      </Col>
                    </Row>
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
                      <i className="fa fa-pencil" /> Actualizar sede
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({ modal: false });
                      }}
                    >
                      {" "}
                      <i className="fa fa-times" /> Cerrar{" "}
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

ModalEditSedes.propTypes = {
  modaledit: PropTypes.bool.isRequired
};

export default ModalEditSedes;
