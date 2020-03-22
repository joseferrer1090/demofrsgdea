import React, { useState, useEffect, Suspense } from "react";
import { Card, CardHeader, CardBody, CustomInput } from "reactstrap";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  METADATA_ACTIVE,
  METADATA_ALL
} from "./../../../../services/EndPoints";

const TableListMetadata = React.lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import("./TableMatadataList")), 1000);
  });
});

const CreatePlantillaForm = props => {
  const [metadata, setMetadata] = useState([]);
  const [auth, setAuth] = useState("");

  useEffect(() => {
    setAuth(props.authorization);
    if (props.authorization !== "" || props.authorization !== auth) {
      getData();
    }
  }, [props.authorization]);

  const getData = () => {
    fetch(`${METADATA_ALL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.authorization
      }
    })
      .then(resp => resp.json())
      .then(data => {
        setMetadata(data);
        //console.log(data);
      })
      .catch(err => {
        console.log(`Error => ${err.message}`);
      });
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <Card>
          <CardHeader>
            <i className="fa fa-wpforms" /> datos de plantilla
          </CardHeader>
          <CardBody>
            <Formik
              validationSchema={Yup.object().shape({
                codigo: Yup.string()
                  .trim()
                  .required("Codigo requerido para el registro"),
                nombre: Yup.string()
                  .trim()
                  .required(`Nombre requerido para la plantilla`),
                descripcion: Yup.string().required(
                  "Asignar descripcion para la plantilla"
                ),
                estado: Yup.bool().test("Activo", value => value === true)
              })}
              render={({
                values,
                touched,
                errors,
                dirty,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset,
                setFieldValue
              }) => (
                <form className="form">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          {" "}
                          Codigo <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          name="codigo"
                          value={values.codigo}
                          type="text"
                          className={`form-control form-control-sm ${errors.codigo &&
                            touched.codigo &&
                            "is-invalid"}`}
                          onChange={e => {
                            setFieldValue(
                              "codigo",
                              e.target.value.toUpperCase()
                            );
                          }}
                          onBlur={handleBlur}
                        />
                        <div className="" style={{ color: "#D54B4B" }}>
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
                          Nombre <span className="text-danger">*</span>
                        </label>
                        <input
                          value={values.nombre}
                          name="nombre"
                          type="text"
                          className={`form-control form-control-sm ${errors.nombre &&
                            touched.nombre &&
                            "is-invalid"}`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <div className="" style={{ color: "#D54B4B" }}>
                          {errors.nombre && touched.nombre ? (
                            <i className="fa fa-exclamation-triangle" />
                          ) : null}
                          <ErrorMessage name="nombre" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>
                          Descripcion <span className="text-danger">*</span>{" "}
                        </label>
                        <textarea
                          value={values.descripcion}
                          name="descripcion"
                          className={`form-control form-control-sm ${errors.descripcion &&
                            touched.descripcion &&
                            "is-invalid"}`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        ></textarea>
                        <div className="" style={{ color: "#D54B4B" }}>
                          {errors.descripcion && touched.descripcion ? (
                            <i className="fa fa-exclamation-triangle" />
                          ) : null}
                          <ErrorMessage name="descripcion" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>
                          Estado <span className="text-danger">*</span>
                        </label>
                        <div className="text-justify">
                          <CustomInput
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.estado}
                            name="estado"
                            type="checkbox"
                            id="ExampleInputCheckbox"
                            label={
                              "Si esta opción se encuentra activada, representa que la Plantilla es visible en el sistema y se podrán realizar operaciones entre cada uno de los módulos correspondientes de la aplicación. En caso contrario la Plantilla no se elimina del sistema solo quedará inactivo y no visible para cada uno de los módulos correspondientes del sistema."
                            }
                            className={
                              errors.estado &&
                              touched.estado &&
                              "invalid-feedback"
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            />
          </CardBody>
        </Card>
      </div>
      <div className="col-md-6">
        <Card>
          <CardHeader>
            <i className="fa fa-table" /> Metadatos
          </CardHeader>
          <CardBody>
            <Suspense
              fallback={
                <div className="text-center">
                  <i className="fa fa-cog fa-spin fa-2x fa-fw" />
                  <p className="text-center">Loading...</p>
                </div>
              }
            >
              <TableListMetadata data={metadata} />
            </Suspense>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default CreatePlantillaForm;
