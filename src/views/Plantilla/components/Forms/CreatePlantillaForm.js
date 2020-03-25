import React, { useState, useEffect, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  CustomInput,
  CardFooter
} from "reactstrap";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  METADATA_ACTIVE,
  METADATA_ALL,
  TEMPLATE_CREATE
} from "./../../../../services/EndPoints";
import AssignedMetadata from "./AssignedMetadata";
import { decode } from "jsonwebtoken";
import { resetMetadatoAction } from "./../../../../actions/templateMetadataActions";

const TableListMetadata = React.lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import("./TableMatadataList")), 1200);
  });
});

const CreatePlantillaForm = props => {
  const [metadata, setMetadata] = useState([]);
  const [auth, setAuth] = useState("");
  const arrayMetadata = useSelector(state => state.templateMetadata.metadata);
  const dispatch = useDispatch();
  const reset = () => {
    dispatch(resetMetadatoAction());
  };

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
      })
      .catch(err => {
        console.log(`Error => ${err.message}`);
      });
  };

  return (
    <div className="animated fadeIn">
      <Formik
        onSubmit={(values, { isSubmitting, resetForm }) => {
          const tipoEstato = data => {
            let tipo = null;
            if (data === true) {
              return (tipo = 1);
            } else if (data === false) {
              return (tipo = 0);
            }
            return null;
          };
          setTimeout(() => {
            const token = auth;
            const username = decode(token);
            fetch(`${TEMPLATE_CREATE}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " + auth
              },
              body: JSON.stringify({
                code: values.codigo,
                name: values.nombre,
                description: values.descripcion,
                status: tipoEstato(values.estado),
                userName: username.user_name,
                metadata: arrayMetadata
              })
            }).then(response =>
              response
                .json()
                .then(data => {
                  if (response.status === 201) {
                    console.log("Se creo la plantilla");
                  } else if (response.status === 400) {
                    console.log("Error se envio un dato mal");
                  } else if (response.status === 500) {
                    console.log("Error 500 verificar en el servidor");
                  }
                })
                .catch(err => {
                  console.log(`Error => ${err.message}`);
                })
            );
            // alert(JSON.stringify(values, null, 2));
          }, 1000);
          resetForm({
            nombre: "",
            codigo: "",
            descripcion: "",
            arrayMetadata: [],
            estado: null,
            metadata: reset()
          });
        }}
        validationSchema={Yup.object().shape({
          codigo: Yup.string()
            .trim()
            .required("Codigo requerido para el registro"),
          nombre: Yup.string()
            .trim()
            .required("Nombre requqerido para el registro"),
          descripcion: Yup.string().required(
            "Descripcion es necesaria para el registro"
          ),
          estado: Yup.bool().test("Activo", value => value === true)
        })}
        render={({
          values,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          dirty,
          isSubmitting,
          handleReset,
          errors
        }) => (
          <Card>
            <CardBody>
              <div className="row">
                <div className="col-md-6">
                  <Card>
                    <CardHeader>
                      <i className="fa fa-wpforms" /> datos de plantilla
                    </CardHeader>
                    <CardBody>
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
                        <TableListMetadata authorization={auth} />
                      </Suspense>
                    </CardBody>
                  </Card>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <AssignedMetadata data={arrayMetadata} />
                </div>
              </div>
            </CardBody>
            <CardFooter>
              <div className="pull-right">
                <button className="btn btn-secondary btn-sm">
                  <i className="fa fa-times" /> Cancelar
                </button>
                &nbsp;
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  {" "}
                  <i className="fa fa-save" /> Guardar plantilla{" "}
                </button>
              </div>
            </CardFooter>
          </Card>
        )}
      />
    </div>
  );
};

export default CreatePlantillaForm;
