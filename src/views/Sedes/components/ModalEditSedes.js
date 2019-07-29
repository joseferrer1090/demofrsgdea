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
    estado: ""
  };

  componentDidMount() {
    // this.getDataSedes();
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
        console.log(data);
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
                              <select className="form-control form-control-sm">
                                {" "}
                                <option>Seleccione...</option>{" "}
                              </select>
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
                              <select className="form-control form-control-sm">
                                {" "}
                                <option>Seleccione...</option>{" "}
                              </select>
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
                                className="form-control form-control-sm"
                                maxLength={"6"}
                                placeholder=" "
                                name={"prefijo_radicacion"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.prefijo_radicacion}
                              />
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
                                className="form-control form-control-sm"
                                defaultValue={this.state.secuencia}
                                min={0}
                              />
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
                                      <select className="form-control form-control-sm">
                                        {" "}
                                        <option>Seleccione...</option>{" "}
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="form-group">
                                      <label> País</label>
                                      <select className="form-control form-control-sm">
                                        {" "}
                                        <option>Seleccione...</option>{" "}
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="form-group">
                                      <label> Departamento</label>
                                      <select className="form-control form-control-sm">
                                        {" "}
                                        <option>Seleccione...</option>{" "}
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
                                      <select className="form-control form-control-sm">
                                        {" "}
                                        <option> Seleccione... </option>{" "}
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
                                        type="text"
                                        className="form-control form-control-sm"
                                      />
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
                                        className="form-control form-control-sm"
                                      />
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
                                    <CustomInput
                                      type="checkbox"
                                      id="CheckboxEditSedes"
                                      label="Si esta opción se encuentra activada, Representa que
             la sede es visible en el sistema y se podrán
             realizar operaciones entre cada uno de los módulos
             correspondientes de la aplicación. En caso contrario
             la sede no se elimina del sistema solo quedará
             inactiva e invisibles para cada uno de los módulos
             correspondiente del sistema."
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
                      className="btn btn-outline-success btn-sm"
                    >
                      {" "}
                      <i className="fa fa-pencil" /> Actualizar{" "}
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
