import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Table,
  CustomInput
} from "reactstrap";
import IMGCARGO from "./../../../assets/img/employee.svg";
import {
  CARGO_EDIT
} from "./../../../data/JSON-SERVER";
import { Formik, ErrorMessage, FormikProps, Form, Field } from "formik";
import * as Yup from "yup";

class ModalEditCargo extends React.Component {
  state = {
      modal: this.props.modaledit,
      id: this.props.id, 
      dataCharge: {}, 
      dataConglomerate: [], 
      dataCompany: [], 
      dataHeadquarter: [], 
      dataDependence: []
    };

   

  toggle = (id) => {
    this.setState({
      modal: !this.state.modal, 
      id: id
    });
    this.getDataChargeById(id);
    this.getConglomerate();
    this.getCompany();
    this.getHeadquarter();
    this.getDependence();
  };

  getDataChargeById = (id) => {
    fetch(`http://192.168.10.180:7000/api/sgdea/charge/${id}/jferrer`, {
      method:"GET", 
      headers:{
        "Content-Type": "application/json",
        Authorization: "Basic " + window.btoa("sgdea:123456")
      }
    }).then(response => response.json()).then(data => {
      this.setState({
        dataCharge: data
      })
    }).catch(Error, console.log("Error", Error))
  }

  getConglomerate = () => {
    fetch(`http://192.168.10.180:7000/api/sgdea/conglomerate`, {
      method: "GET", 
      headers: {
        Authorization: "Basic " + window.btoa("sgdea:123456"), 
        "Content-Type": "application/json"
      }
    }).then(response => response.json()).then(
      data => {
        this.setState({
          dataConglomerate: data
        })
      }
    ).catch(Error, console.log("Error", Error));
  }

  getCompany = () => {
    fetch(`http://192.168.10.180:7000/api/sgdea/company`, {
      method: "GET", 
      headers: {
        Authorization: "Basic " + window.btoa("sgdea:123456"),
        "Content-Type":"application/json"
      }
    }).then(response => response.json()).then(data => {
      this.setState({
        dataCompany: data
      })
    }).catch("Error", console.log("Error", Error))
  }

  getHeadquarter = () => {
    fetch(`http://192.168.10.180:7000/api/sgdea/headquarter`, {
      method: "GET",
      headers: {
        Authorization: "Basic " + window.btoa("sgdea:123456"),
        "Content-Type": "application/json"
      }
    }).then(response => response.json()).then(data => {
      this.setState({
        dataHeadquarter: data
      })
    }).catch(Error, console.log("Error", Error));
  }

  getDependence = () => {
    fetch(`http://192.168.10.180:7000/api/sgdea/dependence`, {
      method: "GET", 
      headers: {
        Authorization: "Basic " + window.btoa("sgdea:123456"),
        "Content-Type": "application/json"
      }
    }).then(response => response.json()).then(data => {
      this.setState({
        dataDependence: data
      })
    }).catch(Error,  console.log("Error", Error));
  }

  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    return;
  };

  render() {
     console.log(this.state.id);
    const data = this.state.dataCharge;
    const dataPreview = {
      code: data.code, 
      name: data.name, 
      description: data.description, 
      status: data.status, 
    }
    console.log(this.state.dataCompany);
    console.log(this.state.dataConglomerate);
    console.log(this.state.dataHeadquarter);
    console.log(this.state.dataDependence);
    return (
      <Fragment>
      <Modal className="modal-lg" isOpen={this.state.modal}>
        <ModalHeader> Actualizar cargo </ModalHeader>
        <Formik
          enableReinitialize={true}
          initialValues={dataPreview}
          onSubmit={(values, {setSubmitting}) =>{
            setTimeout(()=>{
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false)
            },500)
          }}
          validationSchema={Yup.object().shape({
            code: Yup.string().required(" Por favor introduzca un código."),
            name: Yup.string().required(" Por favor introduzca un nombre."),
            description: Yup.string()
                .max(250, " Máximo 250 caracteres."),
            conglomerado: Yup.string()
                .ensure()
                .required(" Por favor seleccione un conglomerado."),
            empresa: Yup.string()
                .ensure()
                .required(" Por favor seleccione una empresa."),
            sede: Yup.string()
                .ensure()
                .required(" Por favor seleccione una sede."),
            dependencia: Yup.string()
                .ensure()
                .required(" Por favor seleccione una dependencia."),
            status: Yup.bool()
              .test(
                "Activado",
                "",
                value=> value === true
              ),
              conglomerado_responsable: Yup.bool()
              .test(
                "Activado",
                "",
                value=> value === true
              ),
              empresa_responsable: Yup.bool()
              .test(
                "Activado",
                "",
                value=> value === true
              ),
              sede_responsable: Yup.bool()
              .test(
                "Activado",
                "",
                value=> value === true
              ),
              dependencia_responsable: Yup.bool()
              .test(
                "Activado",
                "",
                value=> value === true
              )
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
                <img src={IMGCARGO} className="img-thumbnail" />
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
                         Código <span className="text-danger">*</span>{" "}
                        <dd>
                          {" "}
                          <input
                          name={"code"}
                          type="text"
                          placeholder=""
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.code}
                          className={`form-control form-control-sm ${errors.code &&
                            touched.code &&
                            "is-invalid"}`}
                        />
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.code && touched.code ?
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                        <ErrorMessage name={"code"} />
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
                        <input
                        name={"name"}
                        type="text"
                        placeholder=""
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        className={`form-control form-control-sm ${errors.name &&
                          touched.name &&
                          "is-invalid"}`}
                      />
                      <div style={{ color: '#D54B4B' }}>
                      {
                        errors.name && touched.name ?
                        <i className="fa fa-exclamation-triangle"/> :
                        null
                      }
                      <ErrorMessage name={"name"} />
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
                          name={"description"}
                          className="form-control form-control-sm"
                          placeholder=""
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.description}
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
                      name="status"
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
                              errors.status &&
                              touched.status &&
                              "invalid-feedback"
                            }
                          />
                        );
                      }}
                    />
                      <ErrorMessage name="status"/>
                      </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm="12">
                <Table size="sm" striped hover>
                  <thead>
                    <tr >
                      <th className="text-center"> Asignar responsabilidades</th>
                      <th></th>
                      <th className="text-center"> Responsable </th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    <tr>
                      <td>Conglomerado</td>
                      <td>
                        <select
                        name={"conglomerado"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.conglomerado}
                        className={`form-control form-control-sm ${errors.conglomerado &&
                          touched.conglomerado &&
                          "is-invalid"}`}
                          >
                          {" "}
                          <option>Seleccione</option>
                          <option value={"1"}> Conglomerado 1 </option>
                          <option value={"2"}> Conglomerado 2 </option>
                          <option value={"3"}> Conglomerado 3 </option>
                          {" "}
                        </select>{" "}
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.conglomerado && touched.conglomerado ?
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                        <ErrorMessage name="conglomerado" />
                        </div>
                      </td>
                      <td>
                      <Field
                        name="conglomerado_responsable"
                        render={({field, form})=>{
                          return(
                            <CustomInput
                              {...field}
                              checked={field.value}
                              className={
                                errors.conglomerado_responsable &&
                                touched.conglomerado_responsable &&
                                "invalid-feedback"
                              }
                              type="checkbox"
                              id="ExampleCheckbox" />
                          );
                        }}
                      />
                        <ErrorMessage name="conglomerado_responsable"/>
                      </td>
                    </tr>
                    <tr>
                      <td>Empresa</td>
                      <td>
                        <select
                        name={"empresa"}
                        value={values.empresa}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`form-control form-control-sm ${errors.empresa &&
                          touched.empresa &&
                          "is-invalid"}`}
                        >
                          {" "}
                          <option>Seleccione</option>
                          <option value={"1"}> Empresa 1</option>
                          <option value={"2"}> Empresa 1</option>
                          <option value={"3"}> Empresa 1</option>
                          {" "}
                        </select>{" "}
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.empresa && touched.empresa ?
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                        <ErrorMessage name={"empresa"} />
                        </div>
                      </td>
                      <td>
                      <Field
                      name="empresa_responsable"
                      render={({field, form})=>{
                        return(
                          <CustomInput
                          {...field}
                          checked={field.value}
                          className={
                            errors.empresa_responsable &&
                            touched.empresa_responsable &&
                            "invalid-feedback"
                          }
                          type="checkbox" id="ExampleCheckbox2" />
                        );
                      }}
                      />
                        <ErrorMessage name="empresa_responsable"/>
                      </td>
                    </tr>
                    <tr>
                      <td>Sede</td>
                      <td>
                        <select
                        name={"sede"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.sede}
                        className={`form-control form-control-sm ${errors.sede &&
                          touched.sede &&
                          "is-invalid"}`}
                        >
                          {" "}
                          <option>Seleccione</option>
                          <option value={"1"}> Sede 1</option>
                          <option value={"2"}> Sede 2</option>
                          <option value={"3"}> Sede 3</option>
                          {" "}
                        </select>{" "}
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.sede && touched.sede ?
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                        <ErrorMessage name={"sede"} />
                        </div>
                      </td>
                      <td>
                      <Field
                      name="sede_responsable"
                      render={({field, form})=>{
                        return(
                          <CustomInput
                          {...field}
                          checked={field.value}
                          className={
                            errors.sede_responsable &&
                            touched.sede_responsable &&
                            "invalid-feedback"
                          }
                            type="checkbox" id="ExampleCheckbox3" />
                        );
                      }}
                      />
                        <ErrorMessage name="sede_responsable"/>
                      </td>
                    </tr>
                    <tr>
                      <td>Dependencia</td>
                      <td>
                        <select
                        name={"dependencia"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.dependencia}
                        className={`form-control form-control-sm ${errors.dependencia &&
                          touched.dependencia &&
                          "is-invalid"}`}
                        >
                          {" "}
                          <option>Seleccione</option>
                          <option value={"1"}> Dependencia 1</option>
                          <option value={"2"}> Dependencia 2</option>
                          <option value={"3"}> Dependencia 3</option>
                          {" "}
                        </select>{" "}
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.dependencia && touched.dependencia ?
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                        <ErrorMessage name={"dependencia"} />
                        </div>
                      </td>
                      <td>
                      <Field
                      name="dependencia_responsable"
                      render={({field, form})=>{
                        return(
                          <CustomInput
                           {...field}
                           checked={field.value}
                           className={
                             errors.dependencia_responsable &&
                             touched.dependencia_responsable &&
                             "invalid-feedback"
                           }
                           type="checkbox"
                           id="ExampleCheckbox4" />
                        );

                      }}
                      />
                        <ErrorMessage name="dependencia_responsable"/>
                      </td>
                    </tr>
                  </tbody>
                </Table>
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
            <button
              className="btn btn-secondary"
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

ModalEditCargo.propTypes = {
  modaledit: PropTypes.bool.isRequired
};

export default ModalEditCargo;
