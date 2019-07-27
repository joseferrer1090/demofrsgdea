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
import IMGCITY from "./../../../assets/img/skyline.svg";
import { Formik, ErrorMessage, FormikProps, Form, Field } from "formik";
import * as Yup from "yup";

class ModalEditCiudad extends React.Component {
    state = {
      modal: this.props.modaledit,
      pais:"",
      pais_selected:[],
      departamento:"",
      departamento_selected:[],
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
    this.getCityInformation();
    this.getPaisData();
    this.getDepartamentoData();
  }

  getCityInformation() {
    fetch(`http://localhost:3001/ciudad/1`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          pais: data.pais,
          departamento: data.departamento,
          codigo: data.codigo,
          nombre: data.nombre,
          estado: data.estado
        });
        console.log(this.state);
      })
      .catch(error => console.log("Error", error));
  };
  getPaisData = () => {
    fetch("http://localhost:3001/ciudadPaisSelected")
      .then(response => response.json())
      .then(data => {
        this.setState({
          pais_selected: data
        });
      })
      .catch(error => console.log(error));
  };
  getDepartamentoData = () => {
    fetch("http://localhost:3001/ciudadDepartamentoSelected")
      .then(response => response.json())
      .then(data => {
        this.setState({
          departamento_selected: data
        });
      })
      .catch(error => console.log(error));
  };

  render() {

    const dataPreview = {
      pais: this.state.pais,
      departamento: this.state.departamento,
      codigo: this.state.codigo,
      nombre: this.state.nombre,
      estado: this.state.estado
    };
    const auxSelectedPais = this.state.pais_selected.map((aux, id) => {
      return (
        <option key={id} value={aux.id}>
          {aux.nombre}
        </option>
      );
    });
    const auxSelectedDepartamento = this.state.departamento_selected.map((aux, id) => {
      return (
        <option key={id} value={aux.id}>
          {aux.nombre}
        </option>
      );
    });
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader> Actualizar ciudad </ModalHeader>
          <Formik
            initialValues={dataPreview}
            onSubmit={(values, {setSubmitting}) =>{
              setTimeout(()=>{
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false)
              },500)
            }}
            validationSchema={Yup.object().shape({
              pais: Yup.string()
                .ensure()
                .required(" Por favor seleccione un país."),
              departamento: Yup.string()
                .ensure()
                .required(" Por favor seleccione un departamento."),
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
                <img src={IMGCITY} className="img-thumbnail" />
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
                        País <span className="text-danger">*</span>{" "}
                        <dd>
                          {" "}
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
                            {auxSelectedPais}
                            {" "}
                          </select>{" "}
                          <div style={{ color: '#D54B4B' }}>
                            {
                              errors.pais && touched.pais ?
                              <i className="fa fa-exclamation-triangle"/> :
                              null
                            }
                          <ErrorMessage name="pais"/>
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                     Departamento <span className="text-danger">*</span>{" "}
                      <dd>
                        {" "}
                        <select
                          name={"departamento"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.departamento}
                          className={`form-control form-control-sm ${errors.departamento &&
                            touched.departamento &&
                            "is-invalid"}`}
                          >
                          {" "}
                          {auxSelectedDepartamento}
                          {" "}
                        </select>{" "}
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.departamento && touched.departamento ?
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                        <ErrorMessage name="departamento" />
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        Código <span className="text-danger">*</span>{" "}
                        <dd>
                          {" "}
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
                          <ErrorMessage name="codigo"/>
                            </div>
                        </dd>
                      </dl>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                      Nombre <span className="text-danger">*</span>{" "}
                        <dd>
                          {" "}
                          <input
                            type="text"
                            name="nombre"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.nombre}
                            className={`form-control form-control-sm ${errors.nombre &&
                              touched.nombre &&
                              "is-invalid"}`}
                          />{" "}
                            <div style={{ color: '#D54B4B' }}>
                            {
                              errors.nombre && touched.nombre ?
                              <i className="fa fa-exclamation-triangle"/> :
                              null
                            }
                          <ErrorMessage name="nombre"/>
                            </div>
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
                      </dl>
                    </div>
                  </div>

                </div>
              </Col>
            </Row>
          </ModalBody>
            <ModalFooter>
              <button
                type="button"
                className="btn btn-outline-success btn-sm "
                onClick={e=>{
                  e.preventDefault();
                  handleSubmit();
                }}
                >
                {" "}
                <i className="fa fa-pencil" /> Actualizar ciudad{" "}
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

ModalEditCiudad.propTypes = {
  modaledit: PropTypes.bool.isRequired
};

export default ModalEditCiudad;
