import React, { Fragment } from "react";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Row,
  Col,
  CustomInput
} from "reactstrap";
import PropTypes from "prop-types";
import ImgMensajero from "./../../../assets/img/courier.svg";
import {MENSAJERO_EDIT} from './../../../data/JSON-SERVER'
import { Formik, ErrorMessage, FormikProps, Form, Field } from "formik";
import * as Yup from "yup";

class ModalActualizarMensajero extends React.Component {
  state = {
      modal: this.props.modalupdate,
      identificacion: "",
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
    this.getMensajeroInformation()
  }

  getMensajeroInformation() {
    fetch(MENSAJERO_EDIT)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          identificacion: data.identificacion,
          nombre: data.nombre,
          descripcion: data.descripcion,
          estado: data.estado
        });
        console.log(this.state);
      })
      .catch(error => console.log("Error", error));
}

  render() {
    const dataPreview={
      identificacion: this.state.identificacion,
      nombre: this.state.nombre,
      descripcion: this.state.descripcion,
      estado: this.state.estado
    }
    return (
      <Fragment>
      <Modal className="modal-lg" isOpen={this.state.modal}>
      <ModalHeader>Actualizar mensajero</ModalHeader>
      <Formik
        initialValues={dataPreview}
        onSubmit={(values, {setSubmitting}) =>{
          setTimeout(()=>{
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false)
          },500)
        }}
        validationSchema={Yup.object().shape({
          identificacion: Yup.number()
            .required(" Por favor introduzca una identificación.")
            .integer(),
          nombre: Yup.string()
            .required(" Por favor introduzca un nombre."),
          descripcion: Yup.string(),
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
              <img src={ImgMensajero} />
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
                    <dl className="param">
                      Identificación <span className="text-danger">
                      *
                    </span>{" "}
                      <dd>
                      <input
                      name={"identificacion"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.identificacion}
                      type="text"
                      className={`form-control form-control-sm ${errors.identificacion &&
                        touched.identificacion &&
                        "is-invalid"}`}
                    />
                    <div style={{ color: '#D54B4B' }}>
                    {
                      errors.identificacion && touched.identificacion ?
                      <i className="fa fa-exclamation-triangle"/> :
                      null
                    }
                    <ErrorMessage name="identificacion" />
                    </div>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      Nombre <span className="text-danger">
                      *
                    </span>{" "}
                      <dd>
                        {" "}
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
                      <ErrorMessage name="nombre" />
                      </div>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <dl className="param">
                      Descripción
                      <dd>
                        {" "}
                        <textarea
                        name={"descripcion"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.descripcion}
                        className="form-control form-control-sm"
                      />
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <dl className="param">
                    <label>
                    {" "}
                    Estado <span className="text-danger">*</span>{" "}
                  </label>
                  <div className="text-justify">
                  <Field
                  name="estado"
                  render={({field, form })=>{
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
                    </dl>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={e=>{
              e.preventDefault();
              handleSubmit();
            }}
            type="button" className="btn btn-outline-success">
            <i className="fa fa-pencil" /> Actualizar
          </button>
          <button
            className="btn btn-secondary "
            onClick={() => {
              this.setState({ modal: false });
            }}
          >
            {" "}
            <i className="fa fa-times" /> Cerrar{" "}
          </button>
        </ModalFooter>
          </Fragment>
        );}}
      </Formik>
    </Modal>
      </Fragment>
    );
  }
}

ModalActualizarMensajero.propTypes = {
  modalupdate: PropTypes.bool.isRequired
};

export default ModalActualizarMensajero;
