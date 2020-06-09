import React, { Component, Fragment, useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import {
  TYPEDOCUMENTARY_SHOW,
  TEMPLATE_ACTIVE,
} from "./../../../services/EndPoints";
import PropTypes from "prop-types";
import { decode } from "jsonwebtoken";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";

/**
 * Cosas por hacer
 * 1. Metodo para llenar el Select => ya esta parte esta !
 * 2. validar si hay alguna plantilla asociadad
 * 3. mostrar la plantilla asocidada  en el select
 * 4. realizar el put para la asignacion
 */

class ModalAssignedTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalassigned: this.props.modal,
      auth: this.props.authorization,
      t: this.props.t,
      id: this.props.id,
      dataTypeDocumentary: {},
      dataTypeDocumentaryTemplate: {},
    };
  }

  toggle = (id) => {
    this.setState({
      modalassigned: !this.state.modalassigned,
      id: id,
    });
    this.getDataTypeDocumentary(id);
  };

  getDataTypeDocumentary = (id) => {
    const auth = this.props.authorization;
    const username = decode(auth);
    fetch(`${TYPEDOCUMENTARY_SHOW}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + auth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataTypeDocumentary: data.typeDocumentary,
          dataTypeDocumentaryTemplate: data.typeDocumentary.template,
        });
      })
      .catch((err) => {
        console.log(`Error, ${err}`);
      });
  };

  render() {
    const { dataTypeDocumentary } = this.state;
    // console.log(this.state.dataTypeDocumentaryTemplate);
    const dataInit = {
      idTemplate: this.state.dataTypeDocumentaryTemplate
        ? this.state.dataTypeDocumentaryTemplate
        : "",
    };
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modalassigned}>
          <ModalHeader>
            <i className="fa fa-object-group" /> Asingar plantilla al tipo
            documental {dataTypeDocumentary.name}
          </ModalHeader>
          <Formik
            enableReinitialize={true}
            initialValues={{ idTemplate: dataInit }}
            validationSchema={Yup.object().shape({
              idTemplate: Yup.string()
                .ensure()
                .required(
                  "Se debe seleccionar una plantilla para el tipo documental"
                ),
            })}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                setFieldTouched,
                isSubmitting,
              } = props;
              return (
                <Fragment>
                  <ModalBody>
                    <div className="text-justify">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged.{" "}
                      <b>
                        (Informacion de advertencias para la asignacion de
                        plantilla)
                      </b>
                    </div>
                    <br />
                    <form className="form">
                      <div className="row">
                        <div className="col-md-8 offset-2">
                          <form className="form card card-body">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label>
                                    Plantilla Seleccionada{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <Field
                                    authorization={this.props.authorization}
                                    class={"form-control from-control-sm"}
                                    name="idTemplate"
                                    value={values.idTemplate}
                                    onChange={(e) => {
                                      setFieldValue(
                                        "idTemplate",
                                        e.target.value
                                      );
                                    }}
                                    onBlur={() => {
                                      setFieldTouched("idTemplate", true);
                                    }}
                                    component={SelectPlantilla}
                                  />
                                  <div style={{ color: "#D54B4B" }}>
                                    {errors.idTemplate && touched.idTemplate ? (
                                      <i className="fa fa-exclamation-triangle" />
                                    ) : null}
                                    <ErrorMessage name={"idTemplate"} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <div>
                      <button
                        type={"submit"}
                        className="btn btn-secondary btn-sm"
                        onClick={() => props.handleSubmit()}
                      >
                        <i className="fa fa-check" />
                        Asignar / Modificar plantilla seleccionada
                      </button>
                      &nbsp;
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => this.setState({ modalassigned: false })}
                      >
                        <i className="fa fa-times" /> Cerrar
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

ModalAssignedTemplate.propTypes = {
  authorization: PropTypes.string.isRequired,
  t: PropTypes.any,
};

export default ModalAssignedTemplate;

const SelectPlantilla = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${TEMPLATE_ACTIVE}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + props.authorization,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(`Error => ${err}`);
      });
  }, []);

  return (
    <div>
      <select
        name={props.name}
        className={props.class}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      >
        <option value="">-- Seleccione Plantilla --</option>
        {Object.keys(data) ? (
          data.map((aux, id) => {
            return <option value={aux.id}>{aux.name}</option>;
          })
        ) : (
          <option value={null}>No hay datos</option>
        )}
      </select>
    </div>
  );
};
