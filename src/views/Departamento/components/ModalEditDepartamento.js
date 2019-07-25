import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Row,
  Col,
  CustomInput
} from "reactstrap";
import IMGDEPARTAMENTO from "./../../../assets/img/map-marker.svg";
import { Formik, ErrorMessage, FormikProps, Form, Field } from "formik";
import * as Yup from "yup";

class ModalEditDepartamento extends React.Component {
  state = {
      modal: this.props.modaledit,
      pais:"",
      codigo:"",
      nombre:"",
      estado:""
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
    this.getDeptoInformation()
  }

  getDeptoInformation() {
    fetch(`http://localhost:3001/departamento/1`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          pais: data.pais,
          codigo: data.codigo,
          nombre: data.nombre,
          estado: data.estado
        });
        console.log(this.state);
      })
      .catch(error => console.log("Error", error));
  }

  render() {
    const dataPreview = {
      pais: this.state.pais,
      codigo: this.state.codigo,
      nombre: this.state.nombre,
      estado: this.state.estado
    };

    return (
      <Fragment>
      <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader> Actualizar departamento </ModalHeader>
          <Formik
          initialValues={dataPreview}
          onSubmit={(values, {setSubmitting}) => {
            setTimeout(()=>{
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false)
            },500)
          }}
          validationSchema={Yup.object().shape({
            pais: Yup.string()
              .ensure()
              .required(" Por favor seleccione un país."),
            codigo: Yup.string()
              .required(" Por favor introduzca un código."),
            nombre: Yup.string()
              .required( " Por favor introduzca un nombre."),
            estado: Yup.bool()
              .test(
                "Activado",
                "",
                value=> value === true
              ),
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
            return(
              <Fragment>
              <ModalBody>
              <Row>
                <Col sm="3">
                  <img src={IMGDEPARTAMENTO} className="img-thumbnail" />
                </Col>
                <Col sm="9">
                  <div className="">
                    {" "}
                    <h5 className="" style={{ borderBottom: "1px solid black" }}>
                      {" "}
                      Datos{" "}
                    </h5>{" "}
                  </div>
                  <div className="row">
                  <div className="col-md-6">
                      <div className="form-group">
                        <label> País <span className="text-danger">*</span>{" "} </label>
                        <select
                            name={"pais"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.pais}
                            className={`form-control form-control-sm ${errors.pais &&
                              touched.pais &&
                              "is-invalid"}`}
                        >
                          {" "}
                          <option> Seleccione... </option>
                          <option value={"1"}> País 1</option>
                          <option value={"2"}> País 2</option>
                          <option value={"3"}> País 3</option>{" "}
                        </select>
                          <div style={{ color: '#D54B4B' }}>
                            {
                              errors.pais && touched.pais ?
                              <i class="fa fa-exclamation-triangle"/> :
                              null
                            }
                            <ErrorMessage name="pais"/>
                          </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label> Código <span className="text-danger">*</span>{" "} </label>
                        <input
                            name="codigo"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            className={`form-control form-control-sm ${errors.codigo &&
                              touched.codigo &&
                              "is-invalid"}`}
                            placeholder=""
                            value={values.codigo}
                            />
                            <div style={{ color: '#D54B4B' }}>
                                  {
                                    errors.codigo && touched.codigo ?
                                    <i class="fa fa-exclamation-triangle"/> :
                                    null
                                  }
                          <ErrorMessage name="codigo"/>
                          </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label> Nombre <span className="text-danger">*</span>{" "} </label>
                        <input
                          name="nombre"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="text"
                          className={`form-control form-control-sm ${errors.nombre &&
                            touched.nombre &&
                            "is-invalid"}`}
                          value={values.nombre}
                          placeholder=""
                          />
                          <div style={{ color: '#D54B4B' }}>
                          {
                            errors.nombre && touched.nombre ?
                            <i class="fa fa-exclamation-triangle"/> :
                            null
                          }
                          <ErrorMessage name="nombre"/>
                          </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                      <label>
                      {" "}
                      Estado <span className="text-danger">*</span>{" "}
                    </label>
                    <div className="text-justify">
                    <Field
                      name="estado"
                      render={({field, form})=>{
                        return(
                          <CustomInput
                              type="checkbox"
                              id="CheckboxEditCiudad"
                              label=" Si esta opción se encuentra activada, representa que
                              el departamento es visible en el sistema y se podrán
                              realizar operaciones entre cada uno de los módulos
                              correspondientes de la aplicación. En caso contrario
                              el departamento no se elimina del sistema solo
                              quedará inactivo e invisibles para cada uno de los
                              módulos correspondiente del sistema."
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
                      <ErrorMessage name="estado"/>
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
                className="btn btn-outline-success btn-sm"
                onClick={e=>{
                  e.preventDefault();
                  handleSubmit();
                }}
                >
                {" "}
                <i className="fa fa-pencil" /> Actualizar departamento{" "}
              </button>
              <button
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

ModalEditDepartamento.propTypes = {
  modaledit: PropTypes.bool.isRequired
};

export default ModalEditDepartamento;
