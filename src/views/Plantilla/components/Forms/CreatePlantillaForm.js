import React,{useState} from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CustomInput,
  Label,
  FormGroup
} from "reactstrap";
import dataDependencias from "./../../../../data/json_dependencia.json";
import "./../css/fixedTable.css";
import { Formik, withFormik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";

// const [data, setData]= useState(dataDependencias);

const CreatePlantillaForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    setFieldValue,
    handleBlur,
    handleSubmit,
    handleReset
  } = props;

  const [term, setTerm]= useState("");
  const handleSearchInput = event => {
    setTerm(event.target.value);
  };

  const searchDependecies = term => {
    return function(x) {
      return x.nombre.toLowerCase().includes(term);
    };
  };

  const aux= dataDependencias.data
  .filter(searchDependecies(term))
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
  return(
    <div className="animated fadeIn">
        <Card>
          <CardBody>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="p-2 mb-2 bg-secondary text-black">
                    Datos de registro
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
                                  render={({field, form})=>{
                                    return(
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
                                render={({field, form})=>{
                                  return(
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
                              render={({field, form})=>{
                                return(
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
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>
                              Nombre <span className="text-danger">*</span>
                            </label>
                            <input
                              name="nombre"
                              onChange={e => {setFieldValue("nombre", e.target.value.toUpperCase())}}
                              onBlur={handleBlur}
                              type="text"
                              className={`form-control form-control-sm ${errors.nombre &&
                                touched.nombre &&
                                "is-invalid"}`}
                              value={values.nombre}
                            />
                            <div style={{ color: '#D54B4B' }}>
                              {
                                errors.nombre && touched.nombre ?
                                <i className="fa fa-exclamation-triangle"/> :
                                null
                              }
                          <ErrorMessage name="nombre" />
                          </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>
                              Descripción <span className="text-danger">*</span>
                            </label>
                            <textarea
                            name="descripcion"
                            value={values.descripcion}
                            className="form-control form-control-sm"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <div style={{ color: '#D54B4B' }}>
                            {
                              errors.descripcion && touched.descripcion ?
                              <i className="fa fa-exclamation-triangle"/> :
                              null
                            }
                          <ErrorMessage name="descripcion" />
                          </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                          <label>
                          {" "}
                          Conglomerado{" "}
                          <span className="text-danger">*</span>{" "}
                        </label>
                        <select
                            name="conglomerado"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            className={`form-control form-control-sm ${errors.conglomerado &&
                              touched.conglomerado &&
                              "is-invalid"}`}
                            value={values.conglomerado}
                          >
                          <option  disabled value={""}>--Seleccione--</option>
                          <option value={"1"}>Conglomerado 1</option>
                          <option value={"2"}>Conglomerado 2</option>
                          <option value={"3"}>Conglomerado 3</option>
                        </select>
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.conglomerado && touched.conglomerado ?
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                        <ErrorMessage name="conglomerado" />
                        </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>
                              Empresa <span className="text-danger">*</span>
                            </label>
                            <select
                              name="empresa"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              className={`form-control form-control-sm
                              ${errors.empresa &&
                                touched.empresa &&
                                "is-invalid"}`}
                              value={values.empresa}
                            >
                            <option disabled value={""}>--Seleccione--</option>
                            <option value={"1"}>Empresa 1</option>
                            <option value={"2"}>Empresa 2</option>
                            <option value={"3"}>Empresa 3</option>
                          </select>
                          <div style={{ color: '#D54B4B' }}>
                          {
                            errors.empresa && touched.empresa ?
                            <i className="fa fa-exclamation-triangle"/> :
                            null
                          }
                          <ErrorMessage name="empresa"/>
                          </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>
                              Sede <span className="text-danger">*</span>
                            </label>
                            <select
                              name="sede"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              className={`form-control form-control-sm
                              ${errors.sede &&
                                touched.sede &&
                                "is-invalid"}`}
                              value={values.sede}
                            >
                            <option  disabled value={""}>--Seleccione--</option>
                            <option value={"1"}>Sede 1</option>
                            <option value={"2"}>Sede 2</option>
                            <option value={"3"}>Sede 3</option>
                          </select>
                          <div style={{ color: '#D54B4B' }}>
                          {
                            errors.sede && touched.sede ?
                            <i className="fa fa-exclamation-triangle"/> :
                            null
                          }
                          <ErrorMessage name="sede"/>
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
                                onChange={e => handleSearchInput(e)}
                              />
                            </div>
                            <div className="">
                              <div className="tableFixHead">
                                <table className="table table-sm table-hover table-bordered ">
                                  <thead className="thead-light">
                                    <tr className="text-center">
                                      <th>id</th>
                                      <th>Dependencia</th>
                                      <th>Todos</th>
                                    </tr>
                                  </thead>
                                  <tbody className="text-center">{aux}</tbody>
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
                      <i className="fa fa-save" /> Registrar
                    </div>
                  )}
                </button>
              </div>
          </CardFooter>
        </Card>
      </div>
  );
}

export default withFormik({
  mapPropsToValues: props => ({
    nombre: props.plantilla.nombre,
    descripcion: props.plantilla.descripcion,
    conglomerado: props.plantilla.conglomerado,
    empresa: props.plantilla.empresa,
    sede: props.plantilla.sede,
    recibida: props.plantilla.recibida,
    despachada:props.plantilla.despachada,
    interna:props.plantilla.interna
  }),
  validationSchema: Yup.object().shape({
    nombre: Yup.string()
      .required(" Por favor introduzca un nombre.")
      .max(100),
    descripcion: Yup.string()
      .max(250, " Máximo 250 para la descripción del conglomerado"),
    conglomerado: Yup.string()
      .ensure()
      .required(" Por favor seleccione un conglomerado."),
    empresa: Yup.string()
      .ensure()
      .required(" Por favor seleccione una empresa."),
    sede: Yup.string()
      .ensure()
      .required(" Por favor seleccione una sede."),
    recibida: Yup.bool()
      .test(
        "Activado",
        "",
        value=> value === true
      ),
    despachada: Yup.bool()
      .test(
        "Activado",
        "",
        value=> value === true
      ),
    interna: Yup.bool()
      .test(
        "Activado",
        "",
        value=> value === true
      ),
  }),
  handleSubmit: (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      resetForm();
    }, 1000);
  }
})(CreatePlantillaForm);
