import React, { useState, useEffect, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  CustomInput,
  CardFooter,
} from "reactstrap";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  METADATA_ACTIVE,
  METADATA_ALL,
  TEMPLATE_CREATE,
} from "./../../../../services/EndPoints";
import AssignedMetadata from "./AssignedMetadata";
import { decode } from "jsonwebtoken";
import { resetMetadatoAction } from "./../../../../actions/templateMetadataActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";
import { withTranslation } from "react-i18next";

const TableListMetadata = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./TableMatadataList")), 1200);
  });
});

const CreatePlantillaForm = (props) => {
  const { t } = props;
  const [spinner, setSpinner] = useState(false);
  const [metadata, setMetadata] = useState([]);
  const [auth, setAuth] = useState("");
  const arrayMetadata = useSelector((state) => state.templateMetadata.metadata);
  const dispatch = useDispatch();
  const reset = () => {
    dispatch(resetMetadatoAction());
  };

  useEffect(() => {
    console.log(props);
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
        Authorization: "Bearer " + props.authorization,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setMetadata(data);
      })
      .catch((err) => {
        console.log(`Error => ${err.message}`);
      });
  };

  return (
    <div className="animated fadeIn">
      <ToastContainer />
      <Formik
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSpinner(true);
          const tipoEstato = (data) => {
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
                authorization: "Bearer " + auth,
              },
              body: JSON.stringify({
                code: values.codigo,
                name: values.nombre,
                description: values.descripcion,
                status: tipoEstato(values.estado),
                userName: username.user_name,
                metadata: arrayMetadata,
              }),
            }).then((response) =>
              response
                .json()
                .then((data) => {
                  if (response.status === 201) {
                    toast.success(t("app_plantilla_form_registrar_alert_200"), {
                      position: toast.POSITION.TOP_RIGHT,
                      className: css({
                        marginTop: "60px",
                      }),
                    });
                    setSpinner(false);
                  } else if (response.status === 400) {
                    toast.error(
                      t("app_plantilla_form_registrar_alert_toast_400"),
                      {
                        position: toast.POSITION.TOP_RIGHT,
                        className: css({
                          marginTop: "60px",
                        }),
                      }
                    );
                    setSpinner(false);
                  } else if (response.status === 500) {
                    toast.error(
                      t("app_plantilla_form_registrar_alert_toast_500"),
                      {
                        position: toast.POSITION.TOP_RIGHT,
                        className: css({
                          marginTop: "60px",
                        }),
                      }
                    );
                    setSpinner(false);
                  }
                })
                .catch((err) => {
                  toast.error(`Error ${err.message}`, {
                    position: toast.POSITION.TOP_RIGHT,
                    className: css({
                      marginTop: "60px",
                    }),
                  });
                  setSpinner(false);
                })
            );
            setSubmitting(false);
            resetForm({
              nombre: "",
              codigo: "",
              descripcion: "",
              arrayMetadata: [],
              estado: null,
              metadata: reset(),
            });
            // alert(JSON.stringify(values, null, 2));
          }, 1000);
        }}
        validationSchema={Yup.object().shape({
          codigo: Yup.string()
            .trim()
            .required(" Por favor introduzca un código."),
          nombre: Yup.string()
            .trim()
            .required(" Por favor introduzca un nombre."),
          descripcion: Yup.string().required(
            " Por favor introduzca una descripción."
          ),
          estado: Yup.bool()
            .test(
              "Activo",
              "Es necesario activar la plantilla",
              (value) => value === true
            )
            .required(" Es necesario activar la plantilla"),
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
          errors,
        }) => (
          <Card>
            <CardBody>
              <div className="row">
                <div className="col-md-6">
                  <Card>
                    <CardHeader>
                      <i className="fa fa-wpforms" />{" "}
                      {t(
                        "app_plantilla_form_registrar_title_card_datos_plantilla"
                      )}
                    </CardHeader>
                    <CardBody>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>
                              {" "}
                              {t("app_plantilla_form_registrar_codigo")}{" "}
                              <span className="text-danger">*</span>{" "}
                            </label>
                            <input
                              name="codigo"
                              value={values.codigo}
                              type="text"
                              className={`form-control form-control-sm ${
                                errors.codigo && touched.codigo && "is-invalid"
                              }`}
                              onChange={(e) => {
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
                              {t("app_plantilla_form_registrar_nombre")}{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              value={values.nombre}
                              name="nombre"
                              type="text"
                              className={`form-control form-control-sm ${
                                errors.nombre && touched.nombre && "is-invalid"
                              }`}
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
                              {t("app_plantilla_form_registrar_descripcion")}{" "}
                              <span className="text-danger">*</span>{" "}
                            </label>
                            <textarea
                              value={values.descripcion}
                              name="descripcion"
                              className={`form-control form-control-sm ${
                                errors.descripcion &&
                                touched.descripcion &&
                                "is-invalid"
                              }`}
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
                              {t("app_plantilla_form_registrar_estado")}{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <div className="text-justify">
                              <CustomInput
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.estado}
                                name="estado"
                                type="checkbox"
                                id="ExampleInputCheckbox"
                                label={t(
                                  "app_plantilla_form_registrar_estado_descripcion"
                                )}
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
                      <i className="fa fa-table" />{" "}
                      {t("app_plantilla_form_registrar_title_card_metadatos")}
                    </CardHeader>
                    <CardBody>
                      <Suspense
                        fallback={
                          <div className="text-center">
                            <i className="fa fa-cog fa-spin fa-2x fa-fw" />
                            <p className="text-center">
                              {t(
                                "app_plantilla_form_registrar_title_card_metadatos_suspense"
                              )}
                              ...
                            </p>
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
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    handleSubmit();
                  }}
                  disabled={spinner}
                >
                  {" "}
                  {spinner ? (
                    <i className=" fa fa-spinner fa-refresh" />
                  ) : (
                    <div>
                      {" "}
                      <i className="fa fa-save" />{" "}
                      {t("app_plantilla_form_registrar_btn_guardar")}
                    </div>
                  )}
                </button>
              </div>
            </CardFooter>
          </Card>
        )}
      />
    </div>
  );
};

export default withTranslation("translations")(CreatePlantillaForm);
