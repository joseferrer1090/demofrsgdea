import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CustomInput, 
  Table
} from "reactstrap";
import { Formik, withFormik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import IMGCARGO from "./../../../assets/img/employee.svg";

class ModalEditCargo extends React.Component {
  state = {
    modal: this.props.modaledit,
    id: this.props.id,
    dataCharge: {},
    dataConglomerate: [],
    dataCompany: [],
    dataHeadquarter: [],
    dataDependence: [], 
    userName: "jferrer"
  };


  componentDidMount(){
    this.getCompany();
    this.getConglomerate();
    this.getDependence();
    this.getHeadquarter();
  }

  toggle = (id) => {
    this.setState({
      modal: !this.state.modal, 
      id: id
    });
    this.getDataChargeById(id);
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

  render() {
    const datainit = this.state.dataCharge;
    const conglomerateList = this.state.dataConglomerate.map((aux, id) => {
      return(
        <option key={id} value={aux.id}>{aux.name}</option>
      )
    });
    const companyList = this.state.dataCompany.map((aux, id) => {
      return(
        <option key={id} value={aux.id}>{aux.name}</option>
      )
    });
    const headquarterList = this.state.dataHeadquarter.map((aux, id) => {
      return(
        <option key={id} value={aux.id}>{aux.name}</option>
      )
    });
    const dependenceList = this.state.dataDependence.map((aux, id) => {
      return(
        <option key={id} value={aux.id}  >{aux.name}</option>
      )
    })
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader> Actualizar Empresa </ModalHeader>
          <Formik
            enableReinitialize={true}
            initialValues={datainit}
            onSubmit={(values, { isSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, "", 2));
              }, 3000);
            }}
            
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
                        name={"conglomerate"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.conglomerate}
                        className={`form-control form-control-sm ${errors.conglomerado &&
                          touched.conglomerado &&
                          "is-invalid"}`}
                          >
                          {" "}
                          {conglomerateList}
                          {" "}
                        </select>{" "}
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.conglomerado && touched.conglomerate ?
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                        <ErrorMessage name="conglomerate" />
                        </div>
                      </td>
                      <td>
                      <Field
                        name="conglomerate_status"
                        render={({field, form})=>{
                          return(
                            <CustomInput
                              {...field}
                              checked={field.value}
                              className={
                                errors.conglomerate_status &&
                                touched.conglomerate_status &&
                                "invalid-feedback"
                              }
                              type="checkbox"
                              id="ExampleCheckbox" />
                          );
                        }}
                      />
                        <ErrorMessage name="conglomerate_status"/>
                      </td>
                    </tr>
                    <tr>
                      <td>Empresa</td>
                      <td>
                        <select
                        name={"company"}
                        value={values.company}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`form-control form-control-sm ${errors.company &&
                          touched.company &&
                          "is-invalid"}`}
                        >
                          {" "}
                         {companyList}
                          {" "}
                        </select>{" "}
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.company && touched.company ?
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                        <ErrorMessage name={"company"} />
                        </div>
                      </td>
                      <td>
                      <Field
                      name="company_status"
                      render={({field, form})=>{
                        return(
                          <CustomInput
                          {...field}
                          checked={field.value}
                          className={
                            errors.company_status &&
                            touched.company_status &&
                            "invalid-feedback"
                          }
                          type="checkbox" id="ExampleCheckbox2" />
                        );
                      }}
                      />
                        <ErrorMessage name="company_status"/>
                      </td>
                    </tr>
                    <tr>
                      <td>Sede</td>
                      <td>
                        <select
                        name={"headquarter"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.headquarter}
                        className={`form-control form-control-sm ${errors.headquarter &&
                          touched.headquarter &&
                          "is-invalid"}`}
                        >
                          {" "}
                         {headquarterList}
                          {" "}
                        </select>{" "}
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.headquarter && touched.headquarter ?
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                        <ErrorMessage name={"headquarter"} />
                        </div>
                      </td>
                      <td>
                      <Field
                      name="headquarter_status"
                      render={({field, form})=>{
                        return(
                          <CustomInput
                          {...field}
                          checked={field.value}
                          className={
                            errors.headquarter_status &&
                            touched.headquarter_status &&
                            "invalid-feedback"
                          }
                            type="checkbox" id="ExampleCheckbox3" />
                        );
                      }}
                      />
                        <ErrorMessage name="headquarter_status"/>
                      </td>
                    </tr>
                    <tr>
                      <td>Dependencia</td>
                      <td>
                        <select
                        name={"dependence"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.dependence}
                        className={`form-control form-control-sm ${errors.dependence &&
                          touched.dependence &&
                          "is-invalid"}`}
                        >
                          {" "}
                          {dependenceList}
                          {" "}
                        </select>{" "}
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.dependence && touched.dependence ?
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                        <ErrorMessage name={"dependence"} />
                        </div>
                      </td>
                      <td>
                      <Field
                      name="dependence_status"
                      render={({field, form})=>{
                        return(
                          <CustomInput
                           {...field}
                           checked={field.value}
                           className={
                             errors.dependence_status &&
                             touched.dependence_status &&
                             "invalid-feedback"
                           }
                           type="checkbox"
                           id="ExampleCheckbox4" />
                        );

                      }}
                      />
                        <ErrorMessage name="dependence_status"/>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
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
                      <i className="fa fa-pencil" /> Actualizar Empesa
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

export default ModalEditCargo;
