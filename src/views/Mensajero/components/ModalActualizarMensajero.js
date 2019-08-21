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
import { Formik, ErrorMessage, FormikProps, Form, Field } from "formik";
import * as Yup from "yup";
import {MESSENGERS} from './../../../services/EndPoints'

class ModalActualizarMensajero extends React.Component {
  state = {
      modal: this.props.modalupdate,
      idMensajero: this.props.id,
      dataResult:{}
    };

  toggle = (id) => {
    this.setState({
      modal: !this.state.modal,
      idMensajero: id
    });
    this.getMessengerByID(id);
  };

getMessengerByID = id => {
    fetch(`http://192.168.10.180:7000/api/sgdea/messenger/${id}/ccuartas`, {
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
            messenger_identification: data.identification,
            messenger_name: data.name,
            messenger_description: data.description,
            messenger_status: data.status
          }
        });
      })
      .catch(error => console.log(error));
  };

  // handleSubmit = (values, { props = this.props, setSubmitting }) => {
  //   alert(JSON.stringify(values, null, 2));
  //   setSubmitting(false);
  //   return;
  // };


  render() {
    const dataResult= this.state.dataResult;
    console.log(dataResult);
    return (
      <Fragment>
      <Modal className="modal-lg" isOpen={this.state.modal}>
      <ModalHeader>Actualizar mensajero</ModalHeader>
      <Formik
        enableReinitialize={true}
        initialValues={dataResult}
        validationSchema={Yup.object().shape({
          messenger_identification: Yup.number()
            .required(" Por favor introduzca una identificación.")
            .integer(),
          messenger_name: Yup.string()
            .required(" Por favor introduzca un nombre.")
            .max(100),
          messenger_description: Yup.string().max(250),
          messenger_status: Yup.bool()
            .test(
              "Activado",
              "",
              value=> value === true
            ),
        })}
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
            fetch(MESSENGERS, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + window.btoa("sgdea:123456")
              },
              body: JSON.stringify({
                id: this.state.idMensajero,
                identification: values.messenger_identification,
                name: values.messenger_name,
                description: values.messenger_description,
                status: tipoEstado(values.messenger_status),
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
                      name={"messenger_identification"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.messenger_identification}
                      type="text"
                      className={`form-control form-control-sm ${errors.messenger_identification &&
                        touched.messenger_identification &&
                        "is-invalid"}`}
                    />
                    <div style={{ color: '#D54B4B' }}>
                    {
                      errors.messenger_identification && touched.messenger_identification ?
                      <i className="fa fa-exclamation-triangle"/> :
                      null
                    }
                    <ErrorMessage name="messenger_identification" />
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
                        name={"messenger_name"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.messenger_name}
                        type="text"
                        className={`form-control form-control-sm ${errors.messenger_name &&
                          touched.messenger_name &&
                          "is-invalid"}`}
                      />
                      <div style={{ color: '#D54B4B' }}>
                      {
                        errors.messenger_name && touched.messenger_name ?
                        <i className="fa fa-exclamation-triangle"/> :
                        null
                      }
                      <ErrorMessage name="messenger_name" />
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
                        name={"messenger_description"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.messenger_description}
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
                  name="messenger_status"
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
                          errors.messenger_status &&
                          touched.messenger_status &&
                          "invalid-feedback"
                        }
                      />
                    );
                  }}
                  />
                    <ErrorMessage name="messenger_status"/>
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
  modalupdate: PropTypes.bool.isRequired,
  id:PropTypes.string,
};

export default ModalActualizarMensajero;
