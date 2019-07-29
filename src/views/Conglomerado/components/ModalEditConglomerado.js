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
  CustomInput
} from "reactstrap";
import PropTypes from "prop-types";
import IMGCONGLOMERADO from "./../../../assets/img/puzzle.svg";
import {CONGLOMERADO_EDIT} from './../../../data/JSON-SERVER';
import { Formik, ErrorMessage, FormikProps, Form, Field } from "formik";
import * as Yup from "yup";

class ModalEditConglomerado extends React.Component {
  state = {
    modal: this.props.modaleditstate,
    codigo: "",
    nombre: "",
    descripcion: "",
    estado: ""
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    return;
  };

  componentDidMount() {
    this.getUserInformation();
  }

  getUserInformation() {
    // fetch(`http://localhost:3001/conglomerado/2`)
    fetch(CONGLOMERADO_EDIT)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          nombre: data.nombre,
          codigo: data.codigo,
          descripcion: data.descripcion,
          estado: data.estado
        });
        console.log(this.state);
      })
      .catch(error => console.log("Error", error));
  }

  render() {
    const validation = Yup.object().shape({
      codigo: Yup.string().required(),
      nombre: Yup.string().required(),
      descripcion: Yup.string().required(),
      estado: Yup.bool().test("Activo", "", value => value === true)
    });

    const dataPreview = {
      codigo: this.state.codigo,
      nombre: this.state.nombre,
      descripcion: this.state.descripcion,
      estado: this.state.estado
    };

    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>Actualizar conglomerado</ModalHeader>
          <Formik
            initialValues={dataPreview}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 500);
            }}
            validationSchema={Yup.object().shape({
              codigo: Yup.string().required(" Por favor introduzca un código."),
              nombre: Yup.string().required(" Por favor introduzca un nombre."),
              descripcion: Yup.string(),
              estado: Yup.bool().test("Activdado", "", value => value === true)
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
                                  name={"codigo"}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.codigo}
                                  className={`form-control form-control-sm ${errors.codigo &&
                                    touched.codigo &&
                                    "is-invalid"}`}
                                />
                                <div style={{ color: '#D54B4B' }}>
                                  {
                                    errors.codigo && touched.codigo ?
                                    <i className="fa fa-exclamation-triangle"/> :
                                    null
                                  }
                                  <ErrorMessage name={"codigo"} />
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
                                  name="nombre"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.nombre}
                                  className={`form-control form-control-sm ${errors.nombre &&
                                    touched.nombre &&
                                    "is-invalid"}`}
                                />
                                {/* <Field
                                  type="text"
                                  name="nombre"
                                  placeholder=""
                                  className={"form-control form-control-sm"}
                                /> */}
                                  <div style={{ color: '#D54B4B' }}>
                                  {
                                    errors.nombre && touched.nombre ?
                                    <i className="fa fa-exclamation-triangle"/> :
                                    null
                                  }
                                  <ErrorMessage name={"nombre"} />
                                  </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label> Descripción </label>
                                <textarea
                                  name="descripcion"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.descripcion}
                                  className="form-control form-control-sm"
                                />
                                {/* <Field
                                  type="text"
                                  name="descripcion"
                                  className="form-control form-control-sm"
                                /> */}
                                <ErrorMessage name="descripcion" />
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
                      <i className="fa fa-pencil" /> Actualizar conglomerado
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
  modaleditstate: PropTypes.bool.isRequired
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
