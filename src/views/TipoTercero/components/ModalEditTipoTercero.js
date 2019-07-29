import React, { Fragment } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  CustomInput
} from "reactstrap";
import PropTypes from "prop-types";
import IMGTERCERO from "./../../../assets/img/supply.svg";
import {TIPO_TERCEROS_EDIT} from './../../../data/JSON-SERVER';
import { Formik, ErrorMessage, FormikProps, Form, Field } from "formik";
import * as Yup from "yup";

class ModalEditTipoTercero extends React.Component {
  state = {
      modal: this.props.modalupdate,
      codigo: "",
      nombre: "",
      descripcion: "",
      estado: ""
    };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    return;
  };

  componentDidMount() {
    this.getTipoTercerosInformation()
  }

  getTipoTercerosInformation() {
    fetch(TIPO_TERCEROS_EDIT)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          codigo: data.codigo,
          nombre: data.nombre,
          descripcion: data.descripcion,
          estado: data.estado
        });
        console.log(this.state);
      })
      .catch(error => console.log("Error", error));
}
  render() {
    const dataPreview = {
      codigo: this.state.codigo,
      nombre: this.state.nombre,
      descripcion: this.state.descripcion,
      estado: this.state.estado
    };
    return (
      <Fragment>
      <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>Actualizar tipo de tercero</ModalHeader>
          <Formik
            initialValues={dataPreview}
            onSubmit={(values, {setSubmitting}) =>{
              setTimeout(()=>{
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false)
              },500)
            }}
            validationSchema={Yup.object().shape({
              codigo: Yup.string()
              .min(6, " Mínimo 6 caracteres.")
              .max(6, " Máximo 6 caracteres.")
              .required(" Por favor introduzca un código."),
              nombre: Yup.string().required(" Por favor introduzca un nombre."),
              descripcion: Yup.string().required(" Por favor introduzca una descripción."),
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
                <Col sm={3}>
                  <img src={IMGTERCERO} className={"img-thumbnail"} />
                </Col>
                <Col sm={9}>
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
                        <label>
                          Código <span className="text-danger">*</span>
                        </label>{" "}
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
                          Nombre <span className="text-danger">*</span>
                        </label>
                        <input
                          name={"nombre"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.nombre}
                          type="text"
                          className={`form-control form-control-sm ${errors.nombre &&
                            touched.nombre &&
                            "is-invalid"}`}
                        />
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
                        <label>
                          {" "}
                          Descripción <span className="text-danger">*</span>{" "}
                        </label>
                        <textarea
                          name={"descripcion"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.descripcion}
                          className={`form-control form-control-sm ${errors.descripcion &&
                            touched.descripcion &&
                            "is-invalid"}`}
                        />
                        <div style={{ color: '#D54B4B' }}>
                              {
                                errors.descripcion && touched.descripcion ?
                                <i className="fa fa-exclamation-triangle"/> :
                                null
                              }
                        <ErrorMessage name={"descripcion"} />
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
                            id="CheckBoxEditRoles"
                            label=" Si esta opción se encuentra activada, representa
                          que el rol es visible en el sistema y se podrán
                          realizar operaciones entre cada uno de los módulos
                          correspondientes de la aplicación. En caso
                          contrario el rol no se elimina del sistema solo
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
                onClick={e=>{
                  e.preventDefault();
                  handleSubmit();
                }}
                className="btn btn-outline-success btn-sm">
                {" "}
                <i className="fa fa-pencil" /> Actualizar{" "}
              </button>
              <button
                type="button"
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

ModalEditTipoTercero.propTypes = {
  modalupdate: PropTypes.bool.isRequired
};

export default ModalEditTipoTercero;
