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
import {TYPETHIRDPARTYS} from './../../../services/EndPoints';
import { Formik, ErrorMessage, FormikProps, Form, Field } from "formik";
import * as Yup from "yup";

class ModalEditTipoTercero extends React.Component {
  state = {
      modal: this.props.modalupdate,
      idTipoTerceros: this.props.id,
      dataResult:{}
    };

  toggle = (id) => {
    this.setState({
      modal: !this.state.modal,
      idTipoTerceros: id
    });
    this.getTipoTercerosByID(id)
  };

  getTipoTercerosByID = id => {
    fetch(`http://192.168.10.180:7000/api/sgdea/typethirdparty/${id}/ccuartas`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + window.btoa("sgdea:123456")
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataResult: {
            typethirdparty_code: data.code,
            typethirdparty_name: data.name,
            typethirdparty_description: data.description,
            typethirdparty_status: data.status
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
          <ModalHeader>Actualizar tipo de tercero</ModalHeader>
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
                fetch(TYPETHIRDPARTYS, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic " + window.btoa("sgdea:123456")
                  },
                  body: JSON.stringify({
                    id: this.state.idTipoTerceros,
                    code: values.typethirdparty_code,
                    name: values.typethirdparty_name,
                    description: values.typethirdparty_description,
                    status: tipoEstado(values.typethirdparty_status),
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
              },500)
            }}
            validationSchema={Yup.object().shape({
              typethirdparty_code: Yup.string()
              .min(6, " Mínimo 6 caracteres.")
              .max(6, " Máximo 6 caracteres.")
              .required(" Por favor introduzca un código."),
              typethirdparty_name: Yup.string().required(" Por favor introduzca un nombre."),
              typethirdparty_description: Yup.string().required(" Por favor introduzca una descripción."),
              typethirdparty_status: Yup.bool()
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
                          name={"typethirdparty_code"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.typethirdparty_code}
                          type="text"
                          className={`form-control form-control-sm ${errors.typethirdparty_code &&
                            touched.typethirdparty_code &&
                            "is-invalid"}`}
                        />
                        <div style={{ color: '#D54B4B' }}>
                              {
                                errors.typethirdparty_code && touched.typethirdparty_code ?
                                <i className="fa fa-exclamation-triangle"/> :
                                null
                              }
                        <ErrorMessage name={"typethirdparty_code"} />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          Nombre <span className="text-danger">*</span>
                        </label>
                        <input
                          name={"typethirdparty_name"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.typethirdparty_name}
                          type="text"
                          className={`form-control form-control-sm ${errors.typethirdparty_name &&
                            touched.typethirdparty_name &&
                            "is-invalid"}`}
                        />
                        <div style={{ color: '#D54B4B' }}>
                              {
                                errors.typethirdparty_name && touched.typethirdparty_name ?
                                <i className="fa fa-exclamation-triangle"/> :
                                null
                              }
                        <ErrorMessage name={"typethirdparty_name"} />
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
                          name={"typethirdparty_description"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.typethirdparty_description}
                          className={`form-control form-control-sm ${errors.typethirdparty_description &&
                            touched.typethirdparty_description &&
                            "is-invalid"}`}
                        />
                        <div style={{ color: '#D54B4B' }}>
                              {
                                errors.typethirdparty_description && touched.typethirdparty_description ?
                                <i className="fa fa-exclamation-triangle"/> :
                                null
                              }
                        <ErrorMessage name={"typethirdparty_description"} />
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
                        name="typethirdparty_status"
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
                            errors.typethirdparty_status &&
                            touched.typethirdparty_status &&
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
