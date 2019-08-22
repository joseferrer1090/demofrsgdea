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
import IMGPackage from "./../../../assets/img/package.svg";
import PropTypes from "prop-types";
import { Formik, ErrorMessage, FormikProps, Form, Field } from "formik";
import * as Yup from "yup";
import {TYPESHIPMENTARRIVAL} from './../../../services/EndPoints';

class ModalEditTipoLlegada extends React.Component {
  state = {
      modal: this.props.modaledit,
      idTipoLlegada: this.props.id,
      dataResult:{}
    };

  toggle = (id) => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      idTipoLlegada: id
    }));
    this.getTipoLlegadaByID(id);
  };

getTipoLlegadaByID = id => {
    fetch(`http://192.168.10.180:7000/api/sgdea/typeshipmentarrival/${id}/ccuartas`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + window.btoa("sgdea:123456")
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          dataResult: {
            typeshipmentarrival_code: data.code,
            typeshipmentarrival_name: data.name,
            typeshipmentarrival_description: data.description,
            typeshipmentarrival_status: data.status
          }
        });
      })
      .catch(error => console.log(error));
  };

  render() {
    const dataResult= this.state.dataResult;
    console.log(dataResult);
    return (
      <Fragment>
      <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>Actualizar tipo de envío / llegada</ModalHeader>
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
              fetch(TYPESHIPMENTARRIVAL, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Basic " + window.btoa("sgdea:123456")
                },
                body: JSON.stringify({
                  id: this.state.idTipoLlegada,
                  code: values.typeshipmentarrival_code,
                  name: values.typeshipmentarrival_name,
                  description: values.typeshipmentarrival_description,
                  status: tipoEstado(values.typeshipmentarrival_status),
                  userName: "ccuartas"
                })
              })
                .then(response =>
                  response.json().then(data => {
                    if (response.status === 200) {
                      console.log("Se actualizo de manera exitosa");
                    } else if (response.status !== 200) {
                      console.log("ver la consola");
                    }
                  })
                )
                .catch(error => console.log("", error));
              setSubmitting(false);
            },1000)
          }}
          validationSchema={Yup.object().shape({
            typeshipmentarrival_code: Yup.string()
              .required(" Por favor introduzca un código."),
            typeshipmentarrival_name: Yup.string()
              .required(" Por favor introduzca un nombre."),
            typeshipmentarrival_description: Yup.string()
              .required(" Por favor introduzca una descripción."),
            typeshipmentarrival_status: Yup.bool()
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
                  <img src={IMGPackage} />
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
                            name={"typeshipmentarrival_code"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.typeshipmentarrival_code}
                            type="text"
                            className={`form-control form-control-sm ${errors.typeshipmentarrival_code &&
                              touched.typeshipmentarrival_code &&
                              "is-invalid"}`}
                          />
                          <div style={{ color: '#D54B4B' }}>
                                {
                                  errors.typeshipmentarrival_code && touched.typeshipmentarrival_code ?
                                  <i className="fa fa-exclamation-triangle"/> :
                                  null
                                }
                          <ErrorMessage name={"typeshipmentarrival_code"} />
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
                            name={"typeshipmentarrival_name"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.typeshipmentarrival_name}
                            type="text"
                            className={`form-control form-control-sm ${errors.typeshipmentarrival_name &&
                              touched.typeshipmentarrival_name &&
                              "is-invalid"}`}
                          />
                          <div style={{ color: '#D54B4B' }}>
                                {
                                  errors.typeshipmentarrival_name && touched.typeshipmentarrival_name ?
                                  <i className="fa fa-exclamation-triangle"/> :
                                  null
                                }
                          <ErrorMessage name={"typeshipmentarrival_name"} />
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
                            name={"typeshipmentarrival_description"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.typeshipmentarrival_description}
                            className={`form-control form-control-sm ${errors.typeshipmentarrival_description &&
                              touched.typeshipmentarrival_description &&
                              "is-invalid"}`}
                          />
                          <div style={{ color: '#D54B4B' }}>
                                {
                                  errors.typeshipmentarrival_description && touched.typeshipmentarrival_description ?
                                  <i className="fa fa-exclamation-triangle"/> :
                                  null
                                }
                          <ErrorMessage name={"typeshipmentarrival_description"} />
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
                       name="typeshipmentarrival_status"
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
                              errors.typeshipmentarrival_status &&
                              touched.typeshipmentarrival_status &&
                              "invalid-feedback"
                            }
                          />
                         );
                       }}
                      />
                        <ErrorMessage name="typeshipmentarrival_status"/>
                      </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <div className="float-right">
                <button
                onClick={e=>{
                  e.preventDefault();
                  handleSubmit();
                }}
                className="btn btn-outline-success">
                  <i className="fa fa-pencil" /> Actualizar
                </button>
                &nbsp;
                <button
                  className="btn btn-secondary "
                  onClick={() => {
                    this.setState({ modal: false });
                  }}
                >
                  <i className="fa fa-times" /> Cerrar
                </button>
              </div>
            </ModalFooter>
              </Fragment>
            );}}

          </Formik>
        </Modal>
      </Fragment>
    );
  }
}

ModalEditTipoLlegada.propTypes = {
  modaledit: PropTypes.bool.isRequired
};

export default ModalEditTipoLlegada;
