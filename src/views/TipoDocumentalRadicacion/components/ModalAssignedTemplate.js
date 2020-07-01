import React, { Component, Fragment, useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, Alert } from "reactstrap";
import {
  TYPEDOCUMENTARY_SHOW,
  TEMPLATE_ACTIVE,
  TYPEDOCUMENTARY_UPDATE_CHANGE_TEMPLATE,
} from "./../../../services/EndPoints";
import PropTypes from "prop-types";
import { decode } from "jsonwebtoken";
import { Formik, ErrorMessage, Field } from "formik";
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
      dataTypeDocumentaryTemplate: {},
      alert200: false,
      alert500: false,
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
    const dataInitial = this.state.dataTypeDocumentaryTemplate;
    const { t } = this.props;
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modalassigned}>
          <ModalHeader>
            <i className="fa fa-object-group" />{" "}
            {t("app_documentalRadicacion_asignar_plantilla_titulo")}{" "}
            {dataTypeDocumentary.name}
          </ModalHeader>
          <Formik
            enableReinitialize="true"
            initialValues={{
              idTemplate: dataInitial !== null ? dataInitial.id : "",
            }}
            validationSchema={Yup.object().shape({
              idTemplate: Yup.string()
                .ensure()
                .required(
                  "Por favor seleccione una plantilla para el tipo documental de radicación"
                ),
            })}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                const auth = this.props.authorization;
                const username = decode(auth);
                fetch(`${TYPEDOCUMENTARY_UPDATE_CHANGE_TEMPLATE}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + this.props.authorization,
                  },
                  body: JSON.stringify({
                    typeDocumentaryId: this.state.id,
                    templateId: values.idTemplate,
                    userName: username.user_name,
                  }),
                })
                  .then((response) => {
                    if (response.ok) {
                      this.setState({
                        alert200: true,
                      });
                      setTimeout(() => {
                        this.setState(
                          {
                            alert200: false,
                            modal: false,
                          },
                          () => this.props.updateTable()
                        );
                      }, 1300);
                    } else if (response.status === 500) {
                      this.setState({
                        alert500: true,
                      });
                      setTimeout(() => {
                        this.setState({
                          alert500: false,
                        });
                      }, 1300);
                    }
                  })
                  .catch((err) => {
                    console.log(`Error => ${err}`);
                  });
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
                    <Alert color={"danger"} isOpen={this.state.alert500}>
                      <i className="fa fa-exclamation-triangle" />{" "}
                      {t(
                        "app_documentalRadicacion_asignar_plantilla_alert_500"
                      )}
                    </Alert>
                    <Alert color={"success"} isOpen={this.state.alert200}>
                      <i className="fa fa-check-circle-o" />{" "}
                      {t(
                        "app_documentalRadicacion_asignar_plantilla_alert_200"
                      )}
                    </Alert>
                    <div className="text-justify">
                      {t("app_documentalRadicacion_asignar_plantilla_info")}
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
                                    {t(
                                      "app_documentalRadicacion_asignar_plantilla_label_plantilla"
                                    )}{" "}
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
                                    t={this.props.t}
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
                        {t(
                          "app_documentalRadicacion_asignar_plantilla_btn_asignar"
                        )}
                      </button>
                      &nbsp;
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => this.setState({ modalassigned: false })}
                      >
                        <i className="fa fa-times" />{" "}
                        {t(
                          "app_documentalRadicacion_asignar_plantilla_btn_cerrar"
                        )}
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
  const { t } = props;
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
        <option value="">
          -- {t("app_documentalRadicacion_asignar_plantilla_select_plantilla")}{" "}
          --
        </option>
        {Object.keys(data) ? (
          data.map((aux, id) => {
            return <option value={aux.id}>{aux.name}</option>;
          })
        ) : (
          <option value={null}>
            {t("app_documentalRadicacion_asignar_plantilla_select_no_data")}
          </option>
        )}
      </select>
    </div>
  );
};
