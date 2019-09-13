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
  CustomInput,
  Alert
} from "reactstrap";
import classnames from "classnames";
import IMGPROFILE from "./../../../assets/img/profile.svg";
import { Formik, ErrorMessage, FormikProps, Form, Field } from "formik";
import * as Yup from "yup";
import { TYPETHIRDPARTYS, COUNTRIES, DEPARTMENTS, CITYS, THIRDPARTYS } from './../../../services/EndPoints';

class ModalUpdateRemitente extends React.Component {
  state = {
      modal: this.props.modalupdate,
      id: this.props.id,
      dataResult:{},
      alertSuccess: false,
      alertError:false,
      alertError400: false,
      activeTab:"1",
      optionsTipoTercero:[],
      optionsCountries:[],
      optionsDepartments:[],
      optionsCities:[],
      t:this.props.t
    };


  toggle = (id) => {
    this.setState({
      modal: !this.state.modal,
      id:id
    });
    this.getTerceroByID(id)
  };
  getTerceroByID = id => {
    fetch(`http://192.168.10.180:7000/api/sgdea/thirdparty/${id}/ccuartas`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          dataResult: {
            tercero_tipoTercero: data.typeThirdParty.id,
            tercero_elementoComunicacion: data.communicationElement,
            tercero_identificacion: data.identification,
            tercero_nombre: data.name,
            tercero_email: data.email,
            tercero_telFijo: data.landline,
            tercero_telCel: data.cellPhone,
            tercero_direccion: data.address,
            tercero_referencia: data.reference,
            tercero_observacion: data.observation,
            tercero_estado: data.status,
            tercero_pais:'',
            tercero_departamento:'',
            tercero_ciudad:''
          }
        });
      })
      .catch(error => console.log(error));
  };

  componentDidMount() {
    this.getDataTipoTercero();
    this.getDataCountries();
    this.getDataDepartments();
    this.getDataCities();
  }
  
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

  getDataTipoTercero = data => {
    fetch(TYPETHIRDPARTYS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          optionsTipoTercero: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };
  getDataCountries = data => {
    fetch(COUNTRIES, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          optionsCountries: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };
  getDataDepartments = data => {
    fetch(DEPARTMENTS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          optionsDepartments: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };
  getDataCities = data => {
    fetch(CITYS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          optionsCities: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };

  render() {
    const dataResult = this.state.dataResult;
    const mapOptionsTipoTercero = this.state.optionsTipoTercero.map((aux, idx) => {
      return (
        <option key={aux.id} value={aux.id}>
          {aux.name}
        </option>
      );
    });
    const mapOptionsCountries= this.state.optionsCountries.map((aux, idx) => {
      return (
        <option key={aux.id} value={aux.id}>
          {aux.name}
        </option>
      );
    });
    const mapOptionsDepartments = this.state.optionsDepartments.map((aux, idx) => {
      return (
        <option key={aux.id} value={aux.id}>
          {aux.name}
        </option>
      );
    });
    const mapOptionsCities = this.state.optionsCities.map((aux, idx) => {
      return (
        <option key={aux.id} value={aux.id}>
          {aux.name}
        </option>
      );
    });
    return (
      <Fragment>
      <Modal className="modal-lg" isOpen={this.state.modal}>
      <ModalHeader> {this.props.t("app_tercero_modal_actualizar_titulo")} {this.state.dataResult.tercero_nombre} </ModalHeader>
      <Formik
      enableReinitialize={true}
        initialValues={dataResult}
        onSubmit={(values, {setSubmitting}) =>{
          const tipoEstado = data => {
            let tipo = null;
            if (data === true) {
              return (tipo = 1);
            } else if (data === false) {
              return (tipo = 0);
            }
            return null;
          };
          setTimeout(()=>{
            fetch(THIRDPARTYS, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + window.btoa('sgdea:123456')
              },
              body: JSON.stringify({
                address: values.tercero_direccion,
                cellPhone: values.tercero_telCel,
                communicationElement: values.tercero_elementoComunicacion,
                cityId: values.tercero_ciudad,
                email: values.tercero_email,
                id: this.state.id,
                identification: values.tercero_identificacion,
                landline: values.tercero_telFijo,
                name: values.tercero_nombre,
                observation: values.tercero_observacion,
                reference: values.tercero_referencia,
                status: tipoEstado(values.tercero_estado),
                typeThirdPartyId: values.tercero_tipoTercero,
                userName: "ccuartas"
              })
            })
              .then(response => {
                if (response.status === 200) {
                  this.setState(
                    {
                      alertSuccess: true
                    },
                    // () => this.props.updateTable()
                  );
                  setTimeout(() => {
                    this.setState({
                      alertSuccess: false,
                      modal: false
                    });
                  }, 3000);
                } else if (response.status === 400) {
                  this.setState({
                    alertError400: true
                  });
                  setTimeout(() => {
                    this.setState({
                      alertError400: false
                    });
                  }, 3000);
                } else if (response.status === 500) {
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
              .catch(error => console.log('', error));
            setSubmitting(false);
          },500)
        }}
        validationSchema={Yup.object().shape({
          tercero_tipoTercero: Yup.string()
          .ensure()
          .required(" Por favor seleccione el tipo de tercero."),
          tercero_elementoComunicacion: Yup.string()
          .ensure()
          .required(" Por favor seleccione un elemento de comunicación."),
          tercero_pais: Yup.string()
          .ensure()
          .required(" Por favor seleccione un país."),
          tercero_departamento: Yup.string()
          .ensure()
          .required(" Por favor seleccione un departamento."),
          tercero_ciudad: Yup.string()
          .ensure()
          .required(" Por favor seleccione una ciudad."),
          tercero_identificacion: Yup.string()
          .matches(
            /^[0-9]+$/,
            '  El número de identificación no acepta puntos, letras, ni caracteres especiales.'
          )
          .required(' Por favor introduzca una identificación.'),
          tercero_nombre: Yup.string()
          .max(45, "Máximo 45 caracteres.")
          .required(" Por favor introduzca un nombre."),
          tercero_email: Yup.string()
          .email(" Por favor introduzca un email valido.")
          .required(" Por favor introduzca un email."),
          tercero_telFijo: Yup.string()
          .matches(
            /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
            " Número no valido."
          )          
          .required(" Por favor introduzca un teléfono fijo."),
          tercero_telCel: Yup.string()
          .matches(
            /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
            " Número no valido."
          )          
          .required(" Por favor introduzca un teléfono celular."),
          tercero_direccion: Yup.string()
          .max(45, "Máximo 45 caracteres")
          .required("Por favor introduzca una dirección."),
          tercero_referencia: Yup.string()   
          .nullable()     
          .max(50, 'Máximo 50 caracteres.'),
          tercero_observacion: Yup.string()     
          .nullable()
          .max(250, 'Máximo 250 caracteres.'),
          tercero_estado: Yup.bool()
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
          <Alert color="danger" isOpen={this.state.alertError}>
             Error al actualizar el tercero.
          </Alert>
          <Alert color="success" isOpen={this.state.alertSuccess}>
              Se actualizo el tercero con éxito.
           </Alert>
           <Alert color="danger" isOpen={this.state.alertError400}>
              Error, el tercero ya esta asignado.
            </Alert>
          <Row>
            <Col sm="3">
              <img src={IMGPROFILE} className="img-thumbnail" />
            </Col>
            <Col sm="9">
              <div className="">
                {" "}
                <h5 className="" style={{ borderBottom: "1px solid black" }}>
                  {" "}
                  {this.props.t("app_tercero_modal_actualizar_titulo_2")}{" "}
                </h5>{" "}
              </div>
              <div className="row">
              <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          {" "}
                          {this.props.t("app_tercero_modal_actualizar_tipoTercero")}{" "}
                          <span className="text-danger">*</span>{" "}
                        </label>
                        <select
                            name={"tercero_tipoTercero"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.tercero_tipoTercero}
                            className={`form-control form-control-sm ${errors.tercero_tipoTercero &&
                              touched.tercero_tipoTercero &&
                              "is-invalid"}`}
                        >
                          <option value={''} disabled>
                                  -- {this.props.t("app_tercero_modal_actualizar_select_tipoTercero")} --
                                </option>
                        {mapOptionsTipoTercero}
                        </select>
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.tercero_tipoTercero && touched.tercero_tipoTercero ?
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                        <ErrorMessage name="tercero_tipoTercero"/>
                        </div>
                      </div>
                      </div>
                      <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          {" "}
                          {this.props.t("app_tercero_modal_actualizar_ElementoComunicacion")}{" "}
                          <span className="text-danger">*</span>{" "}
                        </label>
                        <select
                          name={"tercero_elementoComunicacion"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.tercero_elementoComunicacion}
                          className={`form-control form-control-sm ${errors.tercero_elementoComunicacion &&
                            touched.tercero_elementoComunicacion &&
                            "is-invalid"}`}
                        >
                         <option disabled value={''}>
                            -- {this.props.t("app_tercero_modal_actualizar_select_ElementoComunicacion")} --
                          </option>
                          <option value={1}>Remitente</option>
                          <option value={2}>Destinatario </option>
                          <option value={3}>Mixto </option>
                        </select>
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.tercero_elementoComunicacion && touched.tercero_elementoComunicacion ?
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                        <ErrorMessage name="tercero_elementoComunicacion"/>
                        </div>
                      </div>
                      </div>
                <div className="col-md-6">
                  <div className="form-group ">
                    <label> {this.props.t("app_tercero_modal_actualizar_identificacion")} <span className="text-danger">*</span>{" "} </label>
                    <input
                      type="text"
                      name={"tercero_identificacion"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.tercero_identificacion}
                      className={`form-control form-control-sm ${errors.tercero_identificacion &&
                        touched.tercero_identificacion &&
                        "is-invalid"}`}
                      />
                      <div style={{ color: '#D54B4B' }}>
                        {
                          errors.tercero_identificacion && touched.tercero_identificacion ?
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                      <ErrorMessage name="tercero_identificacion"/>
                      </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label> {this.props.t("app_tercero_modal_actualizar_nombre")} <span className="text-danger">*</span>{" "} </label>
                    <input
                      type="text"
                      name={"tercero_nombre"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.tercero_nombre}
                      className={`form-control form-control-sm ${errors.tercero_nombre &&
                        touched.tercero_nombre &&
                        "is-invalid"}`}
                      />
                      <div style={{ color: '#D54B4B' }}>
                        {
                          errors.tercero_nombre && touched.tercero_nombre ?
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                      <ErrorMessage name="tercero_nombre"/>
                      </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label> {this.props.t("app_tercero_modal_actualizar_email")} <span className="text-danger">*</span>{" "}  </label>
                    <input
                      type="text"
                      name={"tercero_email"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.tercero_email}
                      className={`form-control form-control-sm ${errors.tercero_email &&
                        touched.tercero_email &&
                        "is-invalid"}`}
                      />
                      <div style={{ color: '#D54B4B' }}>
                        {
                          errors.tercero_email && touched.tercero_email ?
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                      <ErrorMessage name="tercero_email"/>
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
                    {this.props.t("app_tercero_modal_actualizar_collapse")}
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <Row>
                  <Col sm="6">
                  <div className="form-group">
                    <label> {this.props.t("app_tercero_modal_actualizar_telFijo")} </label>
                    <input
                      type="text"
                      name={"tercero_telFijo"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.tercero_telFijo}
                      className={`form-control form-control-sm ${errors.tercero_telFijo &&
                        touched.tercero_telFijo &&
                        "is-invalid"}`}
                      />
                      <div style={{ color: '#D54B4B' }}>
                        {
                          errors.tercero_telFijo && touched.tercero_telFijo ?
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                      <ErrorMessage name="tercero_telFijo"/>
                      </div>
                  </div>
                </Col>
                <Col sm="6">
                  <div className="form-group">
                    <label> {this.props.t("app_tercero_modal_actualizar_telCelular")} <span className="text-danger">*</span>{" "} </label>
                    <input
                      type="text"
                      name={"tercero_telCel"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.tercero_telCel}
                      className={`form-control form-control-sm ${errors.tercero_telCel &&
                        touched.tercero_telCel &&
                        "is-invalid"}`}
                      />
                      <div style={{ color: '#D54B4B' }}>
                        {
                          errors.tercero_telCel && touched.tercero_telCel ?
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                      <ErrorMessage name="tercero_telCel"/>
                      </div>
                  </div>
                </Col>
                <Col sm="12">
                  <div className="form-group">
                    <label> {this.props.t("app_tercero_modal_actualizar_direccion")} <span className="text-danger">*</span>{" "} </label>
                    <input
                      type="text"
                      name={"tercero_direccion"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.tercero_direccion}
                      className={`form-control form-control-sm ${errors.tercero_direccion &&
                        touched.tercero_direccion &&
                        "is-invalid"}`}
                      />
                      <div style={{ color: '#D54B4B' }}>
                        {
                          errors.tercero_direccion && touched.tercero_direccion ?
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                      <ErrorMessage name="tercero_direccion"/>
                      </div>
                  </div>
                </Col>
                    <Col sm="4">
                      <div className="form-group">
                        <label> {this.props.t("app_tercero_modal_actualizar_pais")} <span className="text-danger">*</span>{" "} </label>
                        <select
                          name={"tercero_pais"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.tercero_pais}
                          className={`form-control form-control-sm ${errors.tercero_pais &&
                            touched.tercero_pais &&
                            "is-invalid"}`}
                        >
                          <option disabled value={''}>
                            {' '}
                            -- {this.props.t("app_tercero_modal_actualizar_select_pais")} --
                          </option>
                          {mapOptionsCountries}
                        </select>
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.tercero_pais && touched.tercero_pais ?
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                      <ErrorMessage name="tercero_pais"/>
                      </div>
                      </div>
                    </Col>
                    <Col sm="4">
                      <div className="form-group">
                        <label> {this.props.t("app_tercero_modal_actualizar_departamento")} <span className="text-danger">*</span>{" "} </label>
                        <select
                           name={"tercero_departamento"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.tercero_departamento}
                          className={`form-control form-control-sm ${errors.tercero_departamento &&
                            touched.tercero_departamento &&
                            "is-invalid"}`}
                        >
                          {" "}
                          <option disabled value={''}>
                            {' '}
                            -- {this.props.t("app_tercero_modal_actualizar_select_departamento")} --
                          </option>
                          {mapOptionsDepartments}
                          {" "}
                        </select>
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.tercero_departamento && touched.tercero_departamento ?
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                      <ErrorMessage name="tercero_departamento"/>
                      </div>
                      </div>
                    </Col>
                    <Col sm="4">
                    <div className="form-group">
                      <label> {this.props.t("app_tercero_modal_actualizar_ciudad")} <span className="text-danger">*</span>{" "} </label>
                      <select
                      name={"tercero_ciudad"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.tercero_ciudad}
                      className={`form-control form-control-sm ${errors.tercero_ciudad &&
                        touched.tercero_ciudad &&
                        "is-invalid"}`}
                        >
                          <option disabled value={''}>
                            {' '}
                            -- {this.props.t("app_tercero_modal_actualizar_select_ciudad")} --
                          </option>
                          
                        {mapOptionsCities}
                      </select>
                      <div style={{ color: '#D54B4B' }}>
                        {
                          errors.tercero_ciudad && touched.tercero_ciudad ?
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                      <ErrorMessage name="tercero_ciudad"/>
                      </div>
                    </div>
                  </Col>
                    <Col sm="6">
                      <div className="form-group">
                        <label> {this.props.t("app_tercero_modal_actualizar_referencia")} </label>
                        <textarea
                          type="text"
                          name={"tercero_referencia"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.tercero_referencia}
                          className={`form-control form-control-sm ${errors.tercero_referencia &&
                            touched.tercero_referencia &&
                            "is-invalid"}`}
                            />
                            <div style={{ color: '#D54B4B' }}>
                            {
                              errors.tercero_referencia && touched.tercero_referencia ?
                              <i className="fa fa-exclamation-triangle"/> :
                              null
                            }
                          <ErrorMessage name="tercero_referencia"/>
                          </div>
                      </div>
                    </Col>
                    <Col sm="6">
                      <div className="form-group">
                        <label> {this.props.t("app_tercero_modal_actualizar_observacion")} </label>
                        <textarea
                          type="text"
                          name={"tercero_observacion"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.tercero_observacion}
                          className={`form-control form-control-sm ${errors.tercero_observacion &&
                            touched.tercero_observacion &&
                            "is-invalid"}`}
                            />
                            <div style={{ color: '#D54B4B' }}>
                            {
                              errors.tercero_observacion && touched.tercero_observacion ?
                              <i className="fa fa-exclamation-triangle"/> :
                              null
                            }
                          <ErrorMessage name="tercero_observacion"/>
                          </div>
                      </div>
                    </Col>
                    <Col sm="12">
                      <div className="form-group">
                        <label>
                          {" "}
                          {this.props.t("app_tercero_modal_actualizar_estado")} <span className="text-danger">*</span>{" "}
                        </label>
                        <div className="text-justify">
                        <Field
                        name="tercero_estado"
                        render={({field, form})=>{
                          return(
                            <CustomInput
                            type="checkbox"
                            id="CheckboxEditTerceros"
                            label={this.props.t("app_tercero_modal_actualizar_estado_descripcion")}
                            {...field}
                              checked={field.value}
                              className={
                                errors.tercero_estado &&
                                touched.tercero_estado &&
                                "invalid-feedback"
                              }
                          />
                          );
                        }}
                        />
                        <ErrorMessage name="tercero_estado"/>
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
          className="btn btn-outline-success btn-sm">
            {" "}
            <i className="fa fa-pencil" /> {this.props.t("app_tercero_modal_actualizar_boton_actualizar")}{" "}
          </button>
          <Button
            className="btn btn-secodary btn-sm"
            onClick={() => {
              this.setState({ modal: false });
            }}
          >
            {" "}
            <i className="fa fa-times" /> {this.props.t("app_tercero_modal_actualizar_boton_cerrar")}{" "}
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
