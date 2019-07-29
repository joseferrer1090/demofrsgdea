import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardBody,
  CustomInput
} from "reactstrap";
import IMGDEPENDENCIA from "./../../../assets/img/settings-work-tool.svg";
import {
DEPENDENCIA_EDIT,
CONGLOMERADO_SELECTED,
EMPRESA_SELECTED,
SEDE_SELECTED,
CARGO_RESPONSABLE_SELECTED
} from './../../../data/JSON-SERVER';
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";

class ModalEditDependencia extends React.Component {
  state = {
    modal: this.props.modalView,
    conglomerado: "",
    empresa: "",
    sede: "",
    codigo: "",
    nombre: "",
    descripcion: "",
    cargo_responsable: "",
    estado: "",
    selected_conglomerado: [],
    selected_empresa: [],
    selected_sede: [],
    selected_cargo_responsable: []
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  componentDidMount() {
    this.getDataDependencia();
    this.getDataConglomerado();
    this.getDataEmpresa();
    this.getDataSede();
    this.getDataCargoResponsable();
  }

  getDataDependencia = () => {
    fetch(DEPENDENCIA_EDIT)
      .then(response => response.json())
      .then(data => {
        this.setState({
          conglomerado: data.conglomerado,
          empresa: data.empresa,
          sede: data.sede,
          codigo: data.codigo,
          nombre: data.nombre,
          descripcion: data.descripcion,
          cargo_responsable: data.cargo_responsable,
          estado: data.estado
        });
        console.log(data);
      })
      .catch(error => console.log(error));
  };

  getDataConglomerado = () => {
    fetch(CONGLOMERADO_SELECTED)
      .then(response => response.json())
      .then(data => {
        this.setState({
          selected_conglomerado: data
        });
      })
      .catch(error => console.log(error));
  };

  getDataEmpresa = () => {
    fetch(EMPRESA_SELECTED)
      .then(response => response.json())
      .then(data => {
        this.setState({
          selected_empresa: data
        });
      })
      .catch(error => console.log(error));
  };

  getDataSede = () => {
    fetch(SEDE_SELECTED)
      .then(response => response.json())
      .then(data => {
        this.setState({
          selected_sede: data
        });
      })
      .catch(error => console.log(error));
  };

  getDataCargoResponsable = () => {
    fetch(CARGO_RESPONSABLE_SELECTED)
      .then(response => response.json())
      .then(data => {
        this.setState({
          selected_cargo_responsable: data
        });
      })
      .catch(error => console.log(error));
  };

  render() {
    const dataPreview = {
      conglomerado: this.state.conglomerado,
      empresa: this.state.empresa,
      sede: this.state.sede,
      codigo: this.state.codigo,
      nombre: this.state.nombre,
      descripcion: this.state.descripcion,
      cargo_responsable: this.state.cargo_responsable,
      estado: this.state.estado
    };

    const auxSelectedConglomegrado = this.state.selected_conglomerado.map(
      (aux, id) => {
        return (
          <option key={id} value={aux.id}>
            {aux.nombre}
          </option>
        );
      }
    );

    const auxSelectedEmpresa = this.state.selected_empresa.map((aux, id) => {
      return (
        <option key={id} value={aux.id}>
          {aux.nombre}
        </option>
      );
    });

    const auxSelectedSede = this.state.selected_sede.map((aux, id) => {
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

    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader> Actualizar dependencia </ModalHeader>
          <Formik
            initialValues={dataPreview}
            validationSchema={Yup.object().shape({
              conglomerado: Yup.string()
                .ensure()
                .required("necesario el conglomerado para la dependencia"),
              empresa: Yup.string()
                .ensure()
                .required("necesaria la empresa para la dependencia"),
              sede: Yup.string()
                .ensure()
                .required("necesaria la sede para la dependencia"),
              codigo: Yup.string().required(
                "codigo necesario para la dependencia"
              ),
              nombre: Yup.string().required(
                "nombre necesario para la dependencia"
              ),
              descripcion: Yup.string(),
              cargo_responsable: Yup.string()
                .ensure()
                .required("asignar cargo responsable para la dependencia"),
              estado: Yup.bool().test("Activado", "", value => value === true)
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, "", 2));
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
                        <img src={IMGDEPENDENCIA} className="img-thumbnail" />
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
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.conglomerado}
                                className="form-control form-control-sm"
                              >
                                {auxSelectedConglomegrado}
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
                              <select
                                name="empresa"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.empresa}
                                className="form-control form-control-sm"
                              >
                                {auxSelectedEmpresa}
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {" "}
                                Sede <span className="text-danger">*</span>{" "}
                              </label>
                              <select
                                name="sede"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.sede}
                                className="form-control form-control-sm"
                              >
                                {auxSelectedSede}
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {" "}
                                Código <span className="text-danger">
                                  *
                                </span>{" "}
                              </label>
                              <input
                                name={"codigo"}
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.codigo}
                                className="form-control form-control-sm"
                              />
                            </div>
                          </div>
                        </div>
                        <br />
                      </Col>
                      <Col sm="12">
                        <div className="row">
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
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {" "}
                                Cargo responsable{" "}
                                <span className="text-danger">*</span>{" "}
                              </label>
                              <select
                                name={"cargo_responsable"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.cargo_responsable}
                                className="form-control form-control-sm"
                              >
                                {auxSelectedCargoResponsable}
                              </select>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label> Descripción </label>
                              <textarea
                                name={"descripcion"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.descripcion}
                                className="form-control"
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>
                                Estado <span className="text-danger">*</span>
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
                                        id="dependenciaModalEdit"
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
                          </div>
                        </div>
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
                      <i className="fa fa-pencil" /> Actualizar dependencia
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

ModalEditDependencia.propTypes = {
  modalEdit: PropTypes.bool.isRequired
};

export default ModalEditDependencia;
