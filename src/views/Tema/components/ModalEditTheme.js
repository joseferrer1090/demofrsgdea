import React, { Fragment } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Card,
  CustomInput
} from "reactstrap";
import PropTypes from "prop-types";
import { Formik, ErrorMessage, FormikProps, Form, Field } from "formik";
import * as Yup from "yup";

class ModalEditTheme extends React.Component {
    state = {
      modal: this.props.modaledit,
      codigo: "",
      nombre: "",
      descripcion: "",
      estado: "",
      aplicarTema: ""
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
    this.getTemaInformation();
  }

  getTemaInformation() {
    fetch(`http://localhost:3001/tema/1`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          codigo: data.codigo,
          nombre: data.nombre,
          descripcion: data.descripcion,
          estado: data.estado,
          aplicarTema: data.aplicarTema
        });
        console.log(this.state);
      })
      .catch(error => console.log("Error", error));
  };

  render() {

    const dataPreview = {
      codigo: this.state.codigo,
      nombre: this.state.nombre,
      descripcion: this.state.descripcion,
      estado: this.state.estado,
      aplicarTema: this.state.aplicarTema
    };


    return (
      <Fragment>
      <Modal className="modal-lg" isOpen={this.state.modal}>
        <ModalHeader>Editar tema</ModalHeader>
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
          nombre: Yup.string()
            .required(" Por favor introduzca un nombre.")
            .max(100),
          aplicarTema: Yup.bool()
            .test(
              "Activado",
              "",
              value=> value === true
            ),
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
            <Col sm="4">
              <div className="form-group">
                <label> Código </label>
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
                    <i className="fa fa-exclamation-triangle"/> :
                    null
                  }
              <ErrorMessage name="codigo"/>
              </div>
              </div>
            </Col>
            <Col sm="4">
              <div className="form-group">
                <label>Nombre</label>
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
                    <i className="fa fa-exclamation-triangle"/> :
                    null
                  }
              <ErrorMessage name="nombre"/>
              </div>
              </div>
            </Col>
            <Col sm="4">
              <div className="form-group">
                <label>Descripción</label>
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.descripcion}
                  name="descripcion"
                  type="text"
                  className="form-control form-control-sm" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <Card body>
                <h5 className="card-title"> Colores en el header </h5>
                <p>Esto son los posibles datos</p>
              </Card>
            </Col>
            <Col sm="6">
              <Card body>
                <h5 className="card-title"> Colores en el footer </h5>
                <p>Esto son los posibles datos</p>
              </Card>
            </Col>
            <Col sm="12">
              <Card body>
                <h5 className="card-title"> Colores en otro componentes</h5>
                <p>Estos son los posibles datos</p>
              </Card>
            </Col>
            <Col sm="12">
              <div className="form-group">
              <Field
              name="aplicarTema"
              render={({field, form})=>{
                return(
                  <CustomInput
                  type="checkbox"
                  id="ExampleInputCheckbox5"
                  label="Aplicar para todo los usuarios"
                  {...field}
                    checked={field.value}
                    className={
                      errors.aplicarTema &&
                      touched.aplicarTema &&
                      "invalid-feedback"
                    }
                />
                );
              }}
              />

              </div>
            </Col>
            <Col sm="12">
              <div className="form-group">
              <Field
              name="estado"
              render={({field, form}) =>{
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
                )
              }}

            />
            <ErrorMessage name="estado" />
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <div>
            <button
            onClick={e=>{
              e.preventDefault();
              handleSubmit();
            }}
            className="btn btn-success btn-sm">
              {" "}
              <i className="fa fa-pencil" /> Actualizar{" "}
            </button>
            &nbsp;
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              {" "}
              <i className="fa fa-times" /> Cerrar{" "}
            </button>
          </div>
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

ModalEditTheme.propTypes = {
  modaledit: PropTypes.bool.isRequired
};

export default ModalEditTheme;
