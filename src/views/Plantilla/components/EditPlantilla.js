import React, { Fragment } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CustomInput,
  Label,
  FormGroup,
} from "reactstrap";
import PropTypes from "prop-types";
import dataDependencias from "./../../../data/json_dependencia.json";
import "./css/fixedTable.css";
import {
  PLANTILLA_EDIT,
  CONGLOMERADO_SELECTED,
  EMPRESA_SELECTED,
  SEDE_SELECTED,
} from "./../../../data/JSON-SERVER";
import { Formik, ErrorMessage, FormikProps, Form, Field } from "formik";
import * as Yup from "yup";

class EditPlantilla extends React.Component {
  state = {
    data: dataDependencias,
    term: "",
    nombre: "",
    descripcion: "",
    conglomerado: "",
    conglomerado_selected: [],
    empresa: "",
    empresa_selected: [],
    sede: "",
    sede_selected: [],
    recibida: "",
    despachada: "",
    interna: "",
  };

  handleSearchInput = (event) => {
    this.setState({ term: event.target.value });
  };

  searchDependecies = (term) => {
    return function (x) {
      return x.nombre.toLowerCase().includes(term);
    };
  };

  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    return;
  };

  componentDidMount() {
    this.getPlantillaInformation();
    this.getConglomeradoData();
    this.getEmpresaData();
    this.getSedeData();
  }

  getPlantillaInformation() {
    fetch(PLANTILLA_EDIT)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          nombre: data.nombre,
          descripcion: data.descripcion,
          conglomerado: data.conglomerado,
          empresa: data.empresa,
          sede: data.sede,
          recibida: data.recibida,
          despachada: data.despachad,
          interna: data.interna,
        });
        console.log(this.state);
      })
      .catch((error) => console.log("Error", error));
  }
  getConglomeradoData = () => {
    fetch(CONGLOMERADO_SELECTED)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          conglomerado_selected: data,
        });
      })
      .catch((error) => console.log(error));
  };
  getEmpresaData = () => {
    fetch(EMPRESA_SELECTED)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          empresa_selected: data,
        });
      })
      .catch((error) => console.log(error));
  };

  getSedeData = () => {
    fetch(SEDE_SELECTED)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          sede_selected: data,
        });
      })
      .catch((error) => console.log(error));
  };

  render() {
    const dataPreview = {
      nombre: this.state.nombre,
      descripcion: this.state.descripcion,
      conglomerado: this.state.conglomerado,
      empresa: this.state.empresa,
      sede: this.state.sede,
      recibida: this.state.recibida,
      despachada: this.state.despachad,
      interna: this.state.interna,
    };
    const auxSelectedConglomerado = this.state.conglomerado_selected.map(
      (aux, id) => {
        return (
          <option key={id} value={aux.id}>
            {aux.nombre}
          </option>
        );
      }
    );
    const auxSelectedEmpresa = this.state.empresa_selected.map((aux, id) => {
      return (
        <option key={id} value={aux.id}>
          {aux.nombre}
        </option>
      );
    });
    const auxSelectedSede = this.state.sede_selected.map((aux, id) => {
      return (
        <option key={id} value={aux.id}>
          {aux.nombre}
        </option>
      );
    });
    const term = this.state.term;
    const aux = this.state.data.data
      .filter(this.searchDependecies(term))
      .map((aux, id) => {
        return (
          <tr key={id}>
            <td>{id}</td>
            <td>{aux.nombre.toLowerCase()}</td>
            <td>
              <input type="checkbox" />
            </td>
          </tr>
        );
      });

    return (
      <Fragment>
        <Formik
          initialValues={dataPreview}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 500);
          }}
          validationSchema={Yup.object().shape({
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
            recibida: Yup.bool().test(
              "Activado",
              "",
              (value) => value === true
            ),
            despachada: Yup.bool().test(
              "Activado",
              "",
              (value) => value === true
            ),
            interna: Yup.bool().test("Activado", "", (value) => value === true),
          })}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
            } = props;
            return (
              <Fragment>
                <div className="animated fadeIn">
                  <Card>
                    <CardBody>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="card">
                            <div className="p-2 mb-2 bg-secondary text-black">
                              Editar plantilla
                            </div>
                            <div className="card-body">
                              <form className="form">
                                <div className="row">
                                  <div className="col-md-12">
                                    <FormGroup>
                                      <Label for="exampleCheckbox">
                                        Unidad de correspondencia{" "}
                                        <span className="text-danger">*</span>
                                      </Label>
                                      <div>
                                        <Field
                                          name="recibida"
                                          render={({ field, form }) => {
                                            return (
                                              <CustomInput
                                                type="checkbox"
                                                id="exampleCustomInline"
                                                label="Recibida"
                                                inline
                                                {...field}
                                                checked={field.value}
                                              />
                                            );
                                          }}
                                        />
                                        <Field
                                          name="despachada"
                                          render={({ field, form }) => {
                                            return (
                                              <CustomInput
                                                type="checkbox"
                                                id="exampleCustomInline2"
                                                label="Despachada"
                                                inline
                                                {...field}
                                                checked={field.value}
                                              />
                                            );
                                          }}
                                        />
                                        <Field
                                          name="interna"
                                          render={({ field, form }) => {
                                            return (
                                              <CustomInput
                                                type="checkbox"
                                                id="exampleCustomInline3"
                                                label="Interna"
                                                inline
                                                {...field}
                                                checked={field.value}
                                              />
                                            );
                                          }}
                                        />
                                      </div>
                                    </FormGroup>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="form-group">
                                      <label>
                                        Nombre{" "}
                                        <span className="text-danger">*</span>
                                      </label>
                                      <input
                                        name="nombre"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        type="text"
                                        className={`form-control form-control-sm ${
                                          errors.nombre &&
                                          touched.nombre &&
                                          "is-invalid"
                                        }`}
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
                                  <div className="col-md-4">
                                    <div className="form-group">
                                      <label>
                                        Descripción{" "}
                                        <span className="text-danger">*</span>
                                      </label>
                                      <textarea
                                        name="descripcion"
                                        value={values.descripcion}
                                        className="form-control form-control-sm"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                      <div style={{ color: "#D54B4B" }}>
                                        {errors.descripcion &&
                                        touched.descripcion ? (
                                          <i className="fa fa-exclamation-triangle" />
                                        ) : null}
                                        <ErrorMessage name="descripcion" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="form-group">
                                      <label>
                                        Conglomerado{" "}
                                        <span className="text-danger">*</span>
                                      </label>
                                      <select
                                        name="conglomerado"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        className={`form-control form-control-sm ${
                                          errors.conglomerado &&
                                          touched.conglomerado &&
                                          "is-invalid"
                                        }`}
                                        value={values.conglomerado}
                                      >
                                        {auxSelectedConglomerado}
                                      </select>
                                      <div style={{ color: "#D54B4B" }}>
                                        {errors.conglomerado &&
                                        touched.conglomerado ? (
                                          <i className="fa fa-exclamation-triangle" />
                                        ) : null}
                                        <ErrorMessage name="conglomerado" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>
                                        Empresa{" "}
                                        <span className="text-danger">*</span>
                                      </label>
                                      <select
                                        name="empresa"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        className={`form-control form-control-sm
                          ${errors.empresa && touched.empresa && "is-invalid"}`}
                                        value={values.empresa}
                                      >
                                        {auxSelectedEmpresa}
                                      </select>
                                      <div style={{ color: "#D54B4B" }}>
                                        {errors.empresa && touched.empresa ? (
                                          <i className="fa fa-exclamation-triangle" />
                                        ) : null}
                                        <ErrorMessage name="empresa" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>
                                        Sede{" "}
                                        <span className="text-danger">*</span>
                                      </label>
                                      <select
                                        name="sede"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        className={`form-control form-control-sm
                            ${errors.sede && touched.sede && "is-invalid"}`}
                                        value={values.sede}
                                      >
                                        {auxSelectedSede}
                                      </select>
                                      <div style={{ color: "#D54B4B" }}>
                                        {errors.sede && touched.sede ? (
                                          <i className="fa fa-exclamation-triangle" />
                                        ) : null}
                                        <ErrorMessage name="sede" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-12">
                                    <div className="card">
                                      <div className="card-header">
                                        <input
                                          type="text"
                                          className="form-control form-control-sm"
                                          placeholder="Buscar dependencia"
                                          onChange={(e) =>
                                            this.handleSearchInput(e)
                                          }
                                        />
                                      </div>
                                      <div className="">
                                        <div className="tableFixHead">
                                          <table className="table table-sm table-hover table-bordered ">
                                            <thead className="thead-light">
                                              <tr className="text-center">
                                                <th>id</th>
                                                <th>Dependécia</th>
                                                <th>Todos</th>
                                              </tr>
                                            </thead>
                                            <tbody className="text-center">
                                              {aux}
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                    <CardFooter>
                      <button
                        type="button"
                        className="btn btn-outline-success btn-sm float-right"
                        onClick={(e) => {
                          e.preventDefault();
                          handleSubmit();
                        }}
                      >
                        {" "}
                        <i className="fa fa-pencil" /> Editar Plantilla{" "}
                      </button>
                    </CardFooter>
                  </Card>
                </div>
              </Fragment>
            );
          }}
        </Formik>
      </Fragment>
    );
  }
}

EditPlantilla.propTypes = {};

export default EditPlantilla;
