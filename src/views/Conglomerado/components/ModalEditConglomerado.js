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
import { Formik, ErrorMessage, FormikProps, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

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
    fetch(`http://localhost:3001/conglomerado/2
    `)
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
        <Modal className={"modal-lg"} isOpen={this.state.modal}>
          <ModalHeader> Actualizar conglomerado </ModalHeader>
          <Formik
            initialValues={dataPreview}
            validate={validation}
            onSubmit={this.handleSubmit}
            render={formProps => {
              return (
                <Fragment>
                  <Form className={"form"}>
                    <ModalBody>
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
                                <Field
                                  type="text"
                                  name="codigo"
                                  placeholder=""
                                  className={"form-control form-control-sm"}
                                />
                                <ErrorMessage name="codigo" />
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
                                <Field
                                  type="text"
                                  name="nombre"
                                  placeholder=""
                                  className={"form-control form-control-sm"}
                                />
                                <ErrorMessage name="nombre" />
                              </div>
                            </div>

                            <div className="col-md-12">
                              <div className="form-group">
                                <label> Descripción </label>
                                <Field
                                  type="text"
                                  name="descripcion"
                                  className="form-control form-control-sm"
                                />
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
                                      console.log("field", field);
                                      return (
                                        <input
                                          type="checkbox"
                                          checked={field.value}
                                          {...field}
                                        />
                                      );
                                    }}
                                  />
                                  <ErrorMessage name="estado" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <button
                        type="button"
                        onClick={() => {
                          this.setState({ modal: false });
                        }}
                      >
                        {" "}
                        Cerrar
                      </button>
                      <button type="submit" disabled={formProps.isSubmitting}>
                        Submit Form
                      </button>
                    </ModalFooter>
                  </Form>
                </Fragment>
              );
            }}
          />
        </Modal>
      </Fragment>
    );
  }
}

ModalEditConglomerado.propTypes = {
  modaleditstate: PropTypes.bool.isRequired
};

export default ModalEditConglomerado;

function CheckBox(props) {
  return (
    <Field
      {...props}
      render={({ field, form }) => {
        // console.log("field", field);
        return <input type="checkbox" checked={field.value} {...field} />;
      }}
    />
  );
}

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
