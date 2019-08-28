import React, { useState, useEffect, Fragment } from "react";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  CustomInput,
  Alert
} from "reactstrap";
import PropTypes from "prop-types";
import IMGCONGLOMERADO from "./../../../assets/img/puzzle.svg";
import { Formik, ErrorMessage, FormikProps, Form, Field } from "formik";
import * as Yup from "yup";
import { CONGLOMERATES } from "./../../../services/EndPoints";

class ModalEditConglomerado extends React.Component {
  state = {
    modal: this.props.modaleditstate,
    idConglomerado: this.props.id,
    dataResult: {},
    alertError: false,
    alertSuccess: false
  };
  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      idConglomerado: id
    });
    this.getConglomeradoByID(id);
  };

  getConglomeradoByID = id => {
    fetch(`http://192.168.10.180:7000/api/sgdea/conglomerate/${id}/jferrer`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + window.btoa("sgdea:123456")
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataResult: {
            conglomerate_name: data.name,
            code: data.code,
            description: data.description,
            status: data.status
          }
        });
      })
      .catch(error => console.log(error));
  };

  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    return;
  };

  onDismiss = () => {
    this.setState({
      alertError: false,
      alertSuccess: false
    });
  };

  render() {
    const dataResult = this.state.dataResult;
    const auxID = this.state.idConglomerado;
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            Actualizar&nbsp;{this.state.dataResult.conglomerate_name}
          </ModalHeader>
          <Formik
            enableReinitialize={true}
            initialValues={dataResult}
            onSubmit={(values, { setSubmitting }) => {
              const tipoEstado = data => {
                let tipo = null;
                if (data === true) {
                  return (tipo = 1);
                } else if (data === false) {
                  return (tipo = 0);
                }
                return null;
              };
              setTimeout(() => {
                fetch(CONGLOMERATES, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic " + window.btoa("sgdea:123456")
                  },
                  body: JSON.stringify({
                    id: this.state.idConglomerado,
                    code: values.code,
                    name: values.conglomerate_name,
                    description: values.description,
                    status: tipoEstado(values.status),
                    userName: "jferrer"
                  })
                })
                  .then(response =>{
                    console.log(response.status);
                    if (response.status === 200) {
                      this.setState({
                        alertSuccess: true
                      });
                      setTimeout(() => {
                        this.setState({
                          alertSuccess: false,
                          modal: false
                        });
                      }, 3000);
                    } else if (response.status === 400) {
                      this.setState({
                        alertError: true
                      });
                      setTimeout(() => {
                        this.setState({
                          alertError: false,
                        });
                      }, 3000);
                    }else if (response.status === 500) {
                      this.setState({
                        alertError: true
                      });
                      setTimeout(() => {
                        this.setState({
                          alertError: false,
                          modal: !this.state.modal
                        });
                      }, 3000);
                    }
                  })
                  .catch(error => console.log("", error));
                setSubmitting(false);
              }, 1000);
            }}
            validationSchema={Yup.object().shape({
              code: Yup.string().required(" Por favor introduzca un código."),
              conglomerate_name: Yup.string().required(
                " Por favor introduzca un nombre."
              ),
              description: Yup.string().nullable().max(250, " Máximo 250 caracteres."),
              status: Yup.bool().test("Activo", "", value => value === true)
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
                  <Alert
                      color="danger"
                      isOpen={this.state.alertError}
                      toggle={this.onDismiss}
                    >
                      Error al actualizar el conglomerado.
                    </Alert>
                    <Alert
                      color="success"
                      isOpen={this.state.alertSuccess}
                      toggle={this.onDismiss}
                    >
                      Se actualizo el conglomerado con éxito.
                    </Alert>
                    <form className="form">
                      <div className="row">
                        <div className="col-md-3">
                          <img
                            src={IMGCONGLOMERADO}
                            className="img-thumbnail"
                          />
                        </div>
                        <div className="col-md-9">
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
                                  Código <span className="text-danger">
                                    *
                                  </span>{" "}
                                </label>
                                <input
                                  type="text"
                                  name={"code"}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.code}
                                  className={`form-control form-control-sm ${errors.code &&
                                    touched.code &&
                                    "is-invalid"}`}
                                />
                                <div style={{ color: "#D54B4B" }}>
                                  {errors.code && touched.code ? (
                                    <i className="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name={"code"} />
                                </div>
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
                                  name="conglomerate_name"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.conglomerate_name}
                                  className={`form-control form-control-sm ${errors.conglomerate_name &&
                                    touched.conglomerate_name &&
                                    "is-invalid"}`}
                                />
                                {/* <Field
                                  type="text"
                                  name="nombre"
                                  placeholder=""
                                  className={"form-control form-control-sm"}
                                /> */}
                                <div style={{ color: "#D54B4B" }}>
                                  {errors.conglomerate_name &&
                                  touched.conglomerate_name ? (
                                    <i className="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name={"conglomerate_name"} />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label> Descripción </label>
                                <textarea
                                  name="description"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.description}
                                  className="form-control form-control-sm"
                                />
                                {/* <Field
                                  type="text"
                                  name="descripcion"
                                  className="form-control form-control-sm"
                                /> */}
                                <ErrorMessage name="description" />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  Estado <span className="text-danger">
                                    *
                                  </span>{" "}
                                </label>
                                <div className="text-justify ">
                                  <Field
                                    name="status"
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
                                            errors.status &&
                                            touched.status &&
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
                                  <ErrorMessage name="status" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
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
                      <i className="fa fa-pencil" /> Actualizar
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

ModalEditConglomerado.propTypes = {
  modaleditstate: PropTypes.bool.isRequired,
  id: PropTypes.string
};

export default ModalEditConglomerado;

// function CheckBox(props) {
//   return (
//     <Field
//       {...props}
//       render={({ field, form }) => {
//         // console.log("field", field);
//         return <input type="checkbox" checked={field.value} {...field} />;
//       }}
//     />
//   );
// }

{
  /* <form className={"form"} onSubmit={this.handleSubmit}>
<ModalBody>
  <p>Probando</p>
</ModalBody>
<ModalFooter>
  <button type={"submit"}> Actualizar </button>
  <button
    type="button"
    onClick={() => {
      this.toggle();
    }}
  >
    {" "}
    Cerrar
  </button>
</ModalFooter>
</form> */
}
