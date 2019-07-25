import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Button,
  Row,
  Col,
  Collapse,
  Card,
  CardHeader,
  CardBody,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  CardTitle,
  CardText,
  NavLink,
  CustomInput
} from "reactstrap";
import classnames from "classnames";

import IMGPROFILE from "./../../../assets/img/profile.svg";
import { Formik, ErrorMessage, FormikProps, Form, Field } from "formik";
import * as Yup from "yup";


class ModalUpdateRemitente extends React.Component {
  state = {
      modal: this.props.modalupdate,
      activeTab: "1",
      tipo_tercero: "",
      elemento_comunicacion: "",
      identificacion: 1007647968,
      nombre: "Cristian Cuartas",
      email: "cristianhz1109@gmail.com",
      telefono_fijo: 6088257,
      telefono_celular: 313118257,
      direccion: "Calle 27a Sur # 22-05",
      pais: "",
      departamento: "",
      ciudad: "",
      referencia: "Referencia",
      descripcion: "Descripción",
      estado: true
    };


  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  toggleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    return;
  };

  componentDidMount() {
    this.getCityInformation()
  }

  getCityInformation() {
    fetch(`http://localhost:3001/terceros/1`)
      .then(response => response.json())
      .then(data => {

        console.log(data);
        this.setState({
          tipo_tercero: data.tipo_tercero,
          elemento_comunicacion: data.tipo_tercero,
          identificacion: data.identificacion,
          nombre: data.nombre,
          email: data.email,
          telefono_fijo: data.telefono_fijo,
          telefono_celular: data.telefono_celular,
          direccion: data.direccion,
          pais: data.pais,
          departamento: data.departamento,
          ciudad: data.ciudad,
          referencia: data.referencia,
          descripcion: data.descripcion,
          estado: data.estado
        });
        console.log(this.state);
      })
    }

  render() {
    const dataPreview = {
          tipo_tercero: this.state.tipo_tercero,
          elemento_comunicacion: this.state.elemento_comunicacion,
          identificacion: this.state.identificacion,
          nombre: this.state.nombre,
          email: this.state.email,
          telefono_fijo: this.state.telefono_fijo,
          telefono_celular: this.state.telefono_celular,
          direccion: this.state.direccion,
          pais: this.state.pais,
          departamento: this.state.departamento,
          ciudad: this.state.ciudad,
          referencia: this.state.referencia,
          descripcion: this.state.descripcion,
          estado: this.state.estado
    };

    return (
      <Fragment>
      <Modal className="modal-lg" isOpen={this.state.modal}>
      <ModalHeader> Actualizar tercero</ModalHeader>
      <Formik
        initialValues={dataPreview}
        onSubmit={(values, {setSubmitting}) =>{
          setTimeout(()=>{
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false)
          },500)
        }}
        validationSchema={Yup.object().shape({
          tipo_tercero: Yup.string()
          .ensure()
          .required(" Por favor seleccione el tipo de tercero."),
          elemento_comunicacion: Yup.string()
          .ensure()
          .required(" Por favor seleccione un elemento de comunicación."),
          pais: Yup.string()
          .ensure()
          .required(" Por favor seleccione un país."),
          departamento: Yup.string()
          .ensure()
          .required(" Por favor seleccione un departamento."),
          ciudad: Yup.string()
          .ensure()
          .required(" Por favor seleccione una ciudad."),
          identificacion: Yup.string()
          .max(20, "Máximo 20 caracteres")
          .required(" Por favor introduzca una identificación."),
          nombre: Yup.string()
          .max(45, "Máximo 45 caracteres.")
          .required(" Por favor introduzca un nombre."),
          email: Yup.string()
          .email(" Por favor introduzca un email valido.")
          .required(" Por favor introduzca un email."),
          telefono_fijo: Yup.string()
          .matches(
            /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
            " Número no valido."
          )
          .length(10, " Máximo 10 digitos")
          .required(" Por favor introduzca un teléfono fijo."),
          telefono_celular: Yup.string()
          .matches(
            /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
            " Número no valido."
          )
          .length(10, " Máximo 10 digitos")
          .required(" Por favor introduzca un teléfono celular."),
          direccion: Yup.string()
          .max(45, "Máximo 45 caracteres")
          .required("Por favor introduzca una dirección."),
          referencia: Yup.string()
          .notRequired()
          .max(50, "Máximo 50 caracteres."),
          observacion: Yup.string()
          .notRequired()
          .max(250, "Máximo 250 caracteres."),
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
              <img src={IMGPROFILE} className="img-thumbnail" />
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
                        <label>
                          {" "}
                          Tipo de tercero{" "}
                          <span className="text-danger">*</span>{" "}
                        </label>
                        <select
                            name={"tipo_tercero"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.tipo_tercero}
                            className={`form-control form-control-sm ${errors.tipo_tercero &&
                              touched.tipo_tercero &&
                              "is-invalid"}`}
                        >
                        <option>Selecione...</option>
                        <option value={"1"}>Tipo de tercero 1</option>
                        <option value={"2"}>Tipo de tercero 2</option>
                        <option value={"3"}>Tipo de tercero 3</option>
                        </select>
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.tipo_tercero && touched.tipo_tercero ?
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                        <ErrorMessage name="tipo_tercero"/>
                        </div>
                      </div>
                      </div>
                      <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          {" "}
                          Elemento de comunicación{" "}
                          <span className="text-danger">*</span>{" "}
                        </label>
                        <select
                          name={"elemento_comunicacion"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.elemento_comunicacion}
                          className={`form-control form-control-sm ${errors.elemento_comunicacion &&
                            touched.elemento_comunicacion &&
                            "is-invalid"}`}
                        >
                        <option>Selecione...</option>
                        <option value={"1"}> Elemento de comunicación 1</option>
                        <option value={"2"}> Elemento de comunicación 2</option>
                        <option value={"3"}> Elemento de comunicación 3</option>
                        </select>
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.elemento_comunicacion && touched.elemento_comunicacion ?
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                        <ErrorMessage name="elemento_comunicacion"/>
                        </div>
                      </div>
                      </div>
                <div className="col-md-6">
                  <div className="form-group ">
                    <label> Identificación <span className="text-danger">*</span>{" "} </label>
                    <input
                      type="text"
                      name={"identificacion"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.identificacion}
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
                      <ErrorMessage name="identificacion"/>
                      </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label> Nombre <span className="text-danger">*</span>{" "} </label>
                    <input
                      type="text"
                      name={"nombre"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.nombre}
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
                      <ErrorMessage name="nombre"/>
                      </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label> E-mail <span className="text-danger">*</span>{" "}  </label>
                    <input
                      type="text"
                      name={"email"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      className={`form-control form-control-sm ${errors.email &&
                        touched.email &&
                        "is-invalid"}`}
                      />
                      <div style={{ color: '#D54B4B' }}>
                        {
                          errors.email && touched.email ?
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                      <ErrorMessage name="email"/>
                      </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col sm="12">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "1"
                    })}
                    onClick={() => {
                      this.toggleTab("1");
                    }}
                  >
                    Otra información
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <Row>
                  <Col sm="6">
                  <div className="form-group">
                    <label> Teléfono fijo </label>
                    <input
                      type="text"
                      name={"telefono_fijo"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.telefono_fijo}
                      className={`form-control form-control-sm ${errors.telefono_fijo &&
                        touched.telefono_fijo &&
                        "is-invalid"}`}
                      />
                      <div style={{ color: '#D54B4B' }}>
                        {
                          errors.telefono_fijo && touched.telefono_fijo ?
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                      <ErrorMessage name="telefono_fijo"/>
                      </div>
                  </div>
                </Col>
                <Col sm="6">
                  <div className="form-group">
                    <label> Teléfono celular <span className="text-danger">*</span>{" "} </label>
                    <input
                      type="text"
                      name={"telefono_celular"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.telefono_celular}
                      className={`form-control form-control-sm ${errors.telefono_celular &&
                        touched.telefono_celular &&
                        "is-invalid"}`}
                      />
                      <div style={{ color: '#D54B4B' }}>
                        {
                          errors.telefono_celular && touched.telefono_celular ?
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                      <ErrorMessage name="telefono_celular"/>
                      </div>
                  </div>
                </Col>
                <Col sm="12">
                  <div className="form-group">
                    <label> Dirección <span className="text-danger">*</span>{" "} </label>
                    <input
                      type="text"
                      name={"direccion"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.direccion}
                      className={`form-control form-control-sm ${errors.direccion &&
                        touched.direccion &&
                        "is-invalid"}`}
                      />
                      <div style={{ color: '#D54B4B' }}>
                        {
                          errors.direccion && touched.direccion ?
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                      <ErrorMessage name="direccion"/>
                      </div>
                  </div>
                </Col>
                    <Col sm="4">
                      <div className="form-group">
                        <label> Pais <span className="text-danger">*</span>{" "} </label>
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
                          <option value={"1"}>País 1</option>
                          <option value={"2"}>País 2</option>
                          <option value={"3"}>País 3</option>{" "}
                        </select>
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.pais && touched.pais ?
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                      <ErrorMessage name="pais"/>
                      </div>
                      </div>
                    </Col>
                    <Col sm="4">
                      <div className="form-group">
                        <label> Departamento <span className="text-danger">*</span>{" "} </label>
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
                          <option> Seleccione... </option>
                          <option value={"1"}> Departamento 1</option>
                          <option value={"2"}> Departamento 2</option>
                          <option value={"3"}> Departamento 3</option>
                          {" "}
                        </select>
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.departamento && touched.departamento ?
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                      <ErrorMessage name="departamento"/>
                      </div>
                      </div>
                    </Col>
                    <Col sm="4">
                    <div className="form-group">
                      <label> Ciudad <span className="text-danger">*</span>{" "} </label>
                      <select
                      name={"ciudad"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.ciudad}
                      className={`form-control form-control-sm ${errors.ciudad &&
                        touched.ciudad &&
                        "is-invalid"}`}
                        >
                        <option>Seleccione...</option>
                        <option value={"1"}>Ciudad 1</option>
                        <option value={"2"}>Ciudad 2</option>
                        <option value={"3"}>Ciudad 3</option>
                      </select>
                      <div style={{ color: '#D54B4B' }}>
                        {
                          errors.ciudad && touched.ciudad ?
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                      <ErrorMessage name="ciudad"/>
                      </div>
                    </div>
                  </Col>
                    <Col sm="6">
                      <div className="form-group">
                        <label> Referencia </label>
                        <textarea
                          type="text"
                          name={"referencia"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.referencia}
                          className={`form-control form-control-sm ${errors.referencia &&
                            touched.referencia &&
                            "is-invalid"}`}
                            />
                            <div style={{ color: '#D54B4B' }}>
                            {
                              errors.referencia && touched.referencia ?
                              <i className="fa fa-exclamation-triangle"/> :
                              null
                            }
                          <ErrorMessage name="referencia"/>
                          </div>
                      </div>
                    </Col>
                    <Col sm="6">
                      <div className="form-group">
                        <label> Observacion </label>
                        <textarea
                          type="text"
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
                          <ErrorMessage name="descripcion"/>
                          </div>
                      </div>
                    </Col>
                    <Col sm="12">
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
                            id="CheckboxEditTerceros"
                            label="Si esta opción se encuentra activada, representa
                            que el remitente es visible en el sistema y se
                            podrán realizar operaciones entre cada uno de los
                            módulos correspondientes de la aplicación. En caso
                            contrario el remitente no se elimina del sistema
                            solo quedará inactivo e invisibles para cada uno
                            de los módulos correspondiente del sistema."
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
                          </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <button
          onClick={e=>{
            e.preventDefault();
            handleSubmit();
          }}
          className="btn btn-outline-success">
            {" "}
            <i className="fa fa-pencil" /> Actualizar{" "}
          </button>
          <Button
            className="btn btn-secodary"
            onClick={() => {
              this.setState({ modal: false });
            }}
          >
            {" "}
            <i className="fa fa-times" /> Cerrar{" "}
          </Button>
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

ModalUpdateRemitente.propTypes = {
  modalupdate: PropTypes.bool.isRequired
};

export default ModalUpdateRemitente;
