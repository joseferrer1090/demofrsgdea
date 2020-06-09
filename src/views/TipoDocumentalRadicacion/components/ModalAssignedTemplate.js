import React, { Component, Fragment } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import {
  TYPEDOCUMENTARY_SHOW,
  TEMPLATE_ACTIVE,
} from "./../../../services/EndPoints";
import PropTypes from "prop-types";
import { decode } from "jsonwebtoken";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

class ModalAssignedTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalassigned: this.props.modal,
      auth: this.props.authorization,
      t: this.props.t,
      id: this.props.id,
      dataTypeDocumentary: {},
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
        });
      })
      .catch((err) => {
        console.log(`Error, ${err}`);
      });
  };

  render() {
    const { dataTypeDocumentary } = this.state;
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modalassigned}>
          <ModalHeader>
            <i className="fa fa-object-group" /> Asingar plantilla al tipo
            documental {dataTypeDocumentary.name}
          </ModalHeader>
          <Formik
            initialValues={{ idTemplate: "" }}
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
                                  <select
                                    name="idTemplate"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={values.idTemplate}
                                    className={`form-control form-control-sm ${
                                      errors.idTemplate &&
                                      touched.idTemplate &&
                                      "is-invalid"
                                    }`}
                                  >
                                    <option value="">--Seleccione--</option>
                                    <option value="template1">
                                      Plantilla 1
                                    </option>
                                    <option value="template2">
                                      Plantilla 2
                                    </option>
                                    <option value="template3">
                                      Plnatilla 3
                                    </option>
                                  </select>
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
