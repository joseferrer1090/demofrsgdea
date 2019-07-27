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
import { Formik, withFormik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import IMGEMPRESA from "./../../../assets/img/company.svg";
import Select from "react-select";

const dataConglomeradoExample = [
  { value: "1", label: "Conglomerado 1" },
  { value: "2", label: "Conglomerado 2" },
  { value: "3", label: "Conglomerado 3" }
];

class ModalEditEmpresa extends React.Component {
  state = {
    modal: this.props.modaleditempresa,
    selectedOptionUpdateConglomerado: null,
    conglomerado: "",
    conglomerado_selected: [],
    cargo_responsable_selected: [],
    codigo: "",
    nit: "",
    nombre: "",
    descripcion: "",
    cargo_responsable: "",
    estado: ""
  };

  componentDidMount() {
    this.getempresaData();
    this.getconglomeradoData();
    this.getcargoresponsableData();
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleChangeSelectedOptionUpdateConglomerado = selectedOptionUpdateConglomerado => {
    this.setState({ selectedOptionUpdateConglomerado });
    console.log(`Option selected:`, selectedOptionUpdateConglomerado);
  };

  getempresaData = () => {
    fetch("http://localhost:3001/empresa/1")
      .then(response => response.json())
      .then(data => {
        this.setState({
          conglomerado: data.conglomerado,
          codigo: data.codigo,
          nit: data.nit,
          nombre: data.nombre,
          descripcion: data.descripcion,
          cargo_responsable: data.cargo_responsable,
          estado: data.estado
        });
      })
      .catch(error => console.log(error));
  };

  getconglomeradoData = () => {
    fetch("http://localhost:3001/conglomerado")
      .then(response => response.json())
      .then(data => {
        this.setState({
          conglomerado_selected: data
        });
      })
      .catch(error => console.log(error));
  };

  getcargoresponsableData = () => {
    fetch("http://localhost:3001/cargoresponsable")
      .then(response => response.json())
      .then(data => {
        this.setState({
          cargo_responsable_selected: data
        });
      })
      .catch(error => console.log(error));
  };

  render() {
    const { selectedOptionUpdateConglomerado } = this.state;
    const dataPreview = {
      conglomerado: this.state.conglomerado,
      codigo: this.state.codigo,
      nit: this.state.nit,
      nombre: this.state.nombre,
      descripcion: this.state.descripcion,
      cargo_responsable: this.state.cargo_responsable,
      estado: this.state.estado
    };
    console.log(dataPreview);

    console.log(this.state.conglomerado_selected);
    const auxSelected = this.state.conglomerado_selected.map((aux, id) => {
      return (
        <option key={id} value={aux.id}>
          {aux.nombre}
        </option>
      );
    });
    console.log(auxSelected);

    const auxSelectedCargo = this.state.cargo_responsable_selected.map(
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
          <ModalHeader> Actualizar empresa </ModalHeader>
          <Formik
            initialValues={dataPreview}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, "", 2));
                setSubmitting(false);
              }, 1000);
            }}
            validationSchema={Yup.object().shape({
              conglomerado: Yup.string().ensure(),
              codigo: Yup.string().required("codigo requerido"),
              nit: Yup.string().required("NIT requerido para la modificacion"),
              nombre: Yup.string().required("Nombre requerido para la edicion"),
              descripcion: Yup.string(),
              estado: Yup.bool().test("Activo", "", value => value === true)
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
                                    className="form-control form-control-sm"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name={"conglomerado"}
                                    value={values.conglomerado}
                                  >
                                    {auxSelected}
                                  </select>
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
                                    name={"codigo"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.codigo}
                                    type="text"
                                    className={`form-control form-control-sm ${errors.codigo &&
                                      touched.codigo &&
                                      "is-invalid"}`}
                                  />
                                  <div
                                    className=""
                                    style={{ color: "#D54B4B" }}
                                  >
                                    {errors.codigo && touched.codigo ? (
                                      <i class="fa fa-exclamation-triangle" />
                                    ) : null}
                                    <ErrorMessage name="codigo" />
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
                                    name={"nombre"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.nombre}
                                    type="text"
                                    className={`form-control form-control-sm ${errors.nombre &&
                                      touched.nombre &&
                                      "is-invalid"}`}
                                  />{" "}
                                  <div
                                    className=""
                                    style={{ color: "#D54B4B" }}
                                  >
                                    {errors.nombre && touched.nombre ? (
                                      <i class="fa fa-exclamation-triangle" />
                                    ) : null}
                                    <ErrorMessage name="nombre" />
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
                                    name="descripcion"
                                    value={values.descripcion}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="text"
                                    className={`form-control form-control-sm ${errors.descripcion &&
                                      touched.descripcion &&
                                      "is-invalid"}`}
                                  />
                                  <ErrorMessage name="descripcion" />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label> Cargo responsable </label>
                                  <select
                                    name={"cargo_responsable"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.cargo_responsable}
                                    className="form-control form-control-sm"
                                  >
                                    {" "}
                                    {auxSelectedCargo}
                                  </select>
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
                                      name="estado"
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
                                              errors.estado &&
                                              touched.estado &&
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
                                    <ErrorMessage name="estado" />
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
                      onClick={e => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      <i className="fa fa-pencil" /> Actualizar empresa
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
                </Fragment>
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
