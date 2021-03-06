import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from "reactstrap";
import { Formik, ErrorMessage, Field } from "formik";
import {
  PARAMETERS_FIND_BY_ID,
  PARAMTERS_UPDATE,
  PARAMETERS_INPUTS,
} from "./../../../services/EndPoints";
import * as Yup from "yup";
import { decode } from "jsonwebtoken";
import InpuDynamics from "./InputDynamics";

// const DataForm = {
//   name: {
//     type: "input",
//     elementConfig: {
//       name: "name",
//       type: "text",
//       placeholder: "Nombre Parametro"
//     },
//     value: "Nombre del parametro desde el API",
//     validity: {
//       required: true
//     },
//     valid: false,
//     touched: false,
//     disabled: true
//   },
//   description: {
//     type: "textarea",
//     elementConfig: {
//       name: "description",
//       type: "textarea",
//       placeholder: ""
//     },
//     value: "la descripcion del parametro general",
//     validity: {
//       required: true
//     },
//     valid: false,
//     touched: false,
//     disabled: true
//   },
//   valueParameter: {
//     type: "input",
//     elementConfig: {
//       name: "value",
//       type: "text",
//       placeholder: "value"
//     },
//     value: "Valor desde el api que se va a modificar",
//     validity: {
//       required: true
//     },
//     valid: false,
//     touched: false,
//     disabled: false
//   },
//   selectValue: {
//     type: "select",
//     elementConfig: {
//       name: "exampleSelect",
//       options: [
//         { value: "reactjs", displayname: "React js" },
//         { value: "spring", displayname: "Java Spring" }
//       ]
//     },
//     value: "",
//     valid: true
//   },
//   selectRadio: {
//     type: "radiobutton",
//     elementConfig: {
//       name: "exampleRadio",
//       options: [
//         { name: "parameter", value: "value1" },
//         { name: "parameter", value: "value2" }
//       ]
//     },
//     value: "",
//     valid: true
//   },
//   selectCheckbox: {
//     type: "checkbox",
//     elementConfig: {
//       name: "exampleCheckBox",
//       options: [
//         { name: "vehile1", value: "Car", id: "1" },
//         { name: "vehicle2", value: "Bike", id: "2" }
//       ]
//     },
//     value: "",
//     valid: true
//   },
//   passwordParameter: {
//     type: "password",
//     elementConfig: {
//       name: "passwordParameter",
//       type: "password"
//     },
//     value: "EstaEsLaContraseña",
//     valid: true
//   }
// };

class ModalEditParameter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalEditParameter,
      idParameter: this.props.id,
      dataResult: {},
      data: {},
      auth: this.props.authorization,
      alertSuccess: false,
      alertError: false,
      alertError500: false,
      valor: null,
      t: this.props.t,
      spinnerActualizar: false,
    };
  }

  toggle = (id) => {
    this.setState({
      id: id,
      modal: !this.state.modal,
    });
    //console.log(this.state.dataResult);
    this.getDataParametar(id);
  };

  getDataParametar = (id) => {
    fetch(`${PARAMETERS_INPUTS}${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.authorization,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          data: data,
          dataResult: data.dataForm,
        });
      })
      .catch((err) => console.log(`err => ${err}`));
  };
  _handleChange = (e) => {
    this.setState({
      valor: e.currentTarget.value,
    });
  };

  render() {
    const aux = [];
    for (const key in this.state.dataResult) {
      aux.push({
        id: key,
        inputInfo: this.state.dataResult[key],
      });
    }
    console.log(aux);
    // console.log(
    //   aux.map(element => console.log(`${element.inputInfo.elementConfig.name}`))
    // );
    const { t } = this.state;
    return (
      <Modal className="" isOpen={this.state.modal} onClick={() => this.toogle}>
        <ModalHeader>
          {t("app_parametros_generales_modal_accion_title")}{" "}
          {this.state.data.parameter}
        </ModalHeader>
        <Formik
          enableReinitialize={true}
          initialValues={{
            parameter: this.state.data.parameter,
            description: this.state.data.description,
            value: this.state.valor,
          }}
          validationSchema={Yup.object().shape({})}
          onSubmit={(values, { setSubmitting, props }) => {
            this.setState({
              spinnerActualizar: true,
            });
            setTimeout(() => {
              const token = this.state.auth;
              const user = decode(token);
              fetch(`${PARAMTERS_UPDATE}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + this.state.auth,
                },
                body: JSON.stringify({
                  parameter: values.parameter,
                  value: values.value,
                  username: user.user_name,
                }),
              })
                .then((response) => {
                  if (response.ok) {
                    this.setState({
                      alertSuccess: true,
                      spinnerActualizar: false,
                    });
                    setTimeout(() => {
                      this.setState(
                        {
                          alertSuccess: false,
                          modal: false,
                        },
                        this.props.updateTable()
                      );
                    }, 3000);
                  } else if (response.status === 400) {
                    this.setState({
                      alertError: true,
                      spinnerActualizar: false,
                    });
                    setTimeout(() => {
                      this.setState({
                        alertError: false,
                      });
                    }, 3000);
                  } else if (response.status === 500) {
                    this.setState({
                      alertError500: true,
                      spinnerActualizar: false,
                    });
                    setTimeout(() => {
                      this.setState({
                        alertError500: false,
                      });
                    }, 3000);
                  }
                  console.log(response.json());
                })
                .catch((error) => {
                  console.log(`${error}`);
                  this.setState({
                    spinnerActualizar: false,
                  });
                });
              console.log(values);
              //alert(JSON.stringify({ values }, null, 2));
              //console.log(JSON.stringify({ values }, null, 2));
              setSubmitting(false);
            }, 10);
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
              handleReset,
              setFieldValue,
              setFieldTouched,
            } = props;
            return (
              <React.Fragment>
                <ModalBody>
                  <form className="form">
                    <Alert
                      color={"success"}
                      isOpen={this.state.alertSuccess}
                      toggle={() => {
                        this.setState({ alertSuccess: false });
                      }}
                    >
                      {t("app_parametros_generales_modal_accion_alert_200")}
                    </Alert>
                    <Alert
                      color={"danger"}
                      isOpen={this.state.alertError}
                      toggle={() => {
                        this.setState({ alertError: false });
                      }}
                    >
                      <i className="fa fa-exclamation-triangle" />{" "}
                      {t("app_parametros_generales_modal_accion_alert_400")}
                    </Alert>
                    <Alert
                      color={"danger"}
                      isOpen={this.state.alertError500}
                      toggle={() => {
                        this.setState({ alertError500: false });
                      }}
                    >
                      <i className="fa fa-exclamation-triangle" />{" "}
                      {t("app_parametros_generales_modal_accion_alert_500")}
                    </Alert>
                    <div className="table-responseive">
                      <table className="table table-striped table-condensed ">
                        <tbody>
                          <tr>
                            <td>
                              {t(
                                "app_parametros_generales_modal_accion_parametro"
                              )}{" "}
                            </td>
                            <td>
                              <input
                                className="form-control form-control-sm"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.parameter}
                                disabled
                              />{" "}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              {t(
                                "app_parametros_generales_modal_accion_descripcion"
                              )}
                            </td>
                            <td>
                              <textarea
                                rows={3}
                                className="form-control form-control-sm"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                                disabled
                              ></textarea>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              {t(
                                "app_parametros_generales_modal_accion_valor_parametro"
                              )}
                            </td>
                            <td>
                              {aux.map((element, id) => (
                                <Field name={`${element.id}`}>
                                  {({}) => (
                                    <InpuDynamics
                                      key={id}
                                      formType={element.inputInfo.type}
                                      onChange={(e) => {
                                        setFieldValue(
                                          "value",
                                          e.currentTarget.value
                                        );
                                      }}
                                      name={
                                        element.inputInfo.elementConfig.name
                                      }
                                      options={
                                        element.inputInfo.elementConfig.options
                                      }
                                      defaultValue={element.inputInfo.value}
                                      //value={element.inputInfo.value}
                                    />
                                  )}
                                </Field>
                              ))}
                            </td>
                          </tr>
                        </tbody>
                        {/* <tbody>
                          {aux.map((element, id) => (
                            <tr>
                              <td> {element.id} </td>
                              <td>
                                <Field name={`${element.id}`}>
                                  {({}) => (
                                    <InpuDynamics
                                      key={element.id}
                                      formType={element.inputInfo.type}
                                      onChange={handleChange}
                                      name={
                                        element.inputInfo.elementConfig.name
                                      }
                                      defaultValue={element.inputInfo.value}
                                      disable={
                                        element.inputInfo.disabled
                                          ? true
                                          : false
                                      }
                                      elementConfig={
                                        element.inputInfo.elementConfig
                                      }
                                    />
                                  )}
                                </Field>
                              </td>
                            </tr>
                          ))}
                        </tbody> */}
                      </table>
                    </div>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <button
                    type={"button"}
                    className="btn btn-secondary btn-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                    disabled={this.state.spinnerActualizar}
                  >
                    {this.state.spinnerActualizar ? (
                      <i className=" fa fa-spinner fa-refresh" />
                    ) : (
                      <div>
                        {" "}
                        {t(
                          "app_parametros_generales_modal_accion_btn_editar"
                        )}{" "}
                        <i className="fa fa-pencil" />{" "}
                      </div>
                    )}
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => this.setState({ modal: false })}
                  >
                    {" "}
                    {t("app_parametros_generales_modal_accion_btn_cerrar")}{" "}
                    <i className="fa fa-times" />{" "}
                  </button>
                </ModalFooter>
              </React.Fragment>
            );
          }}
        </Formik>
      </Modal>
    );
  }
}

ModalEditParameter.propTypes = {
  authorization: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ModalEditParameter;
