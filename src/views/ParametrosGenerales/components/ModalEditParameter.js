import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from "reactstrap";
import { Formik, ErrorMessage, Field } from "formik";
import {
  PARAMETERS_FIND_BY_ID,
  PARAMTERS_UPDATE,
  PARAMETERS_INPUTS
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
      alertError500: false
    };
  }

  toggle = id => {
    this.setState({
      id: id,
      modal: !this.state.modal
    });
    //console.log(this.state.dataResult);
    this.getDataParametar(id);
  };

  getDataParametar = id => {
    fetch(`${PARAMETERS_INPUTS}${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.authorization
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          data: data,
          dataResult: data.dataForm
        });
      })
      .catch(err => console.log(`err => ${err}`));
  };

  render() {
    const aux = [];
    for (const key in this.state.dataResult) {
      aux.push({
        id: key,
        inputInfo: this.state.dataResult[key]
      });
    }
    console.log(aux);
    // console.log(
    //   aux.map(element => console.log(`${element.inputInfo.elementConfig.name}`))
    // );

    return (
      <Modal className="" isOpen={this.state.modal} onClick={() => this.toogle}>
        <ModalHeader>Parametro {this.state.data.parameter}</ModalHeader>
        <Formik
          enableReinitialize={true}
          initialValues={{
            parameter: this.state.data.parameter,
            description: this.state.data.description
          }}
          validationSchema={Yup.object().shape({})}
          onSubmit={(values, { setSubmitting, props }) => {
            setTimeout(() => {
              const token = this.state.auth;
              const user = decode(token);
              fetch(`${PARAMTERS_UPDATE}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + this.state.auth
                },
                body: JSON.stringify({
                  parameter: values.parameter,
                  value: values.value,
                  username: user.user_name
                })
              })
                .then(response => {
                  if (response.ok) {
                    this.setState({
                      alertSuccess: true
                    });
                    setTimeout(() => {
                      this.setState({
                        alertSuccess: false,
                        modal: false
                      });
                    }, 3000);
                  } else if (response.status === 400) {
                    this.setState({
                      alertError: true
                    });
                    setTimeout(() => {
                      this.setState({
                        alertError: false
                      });
                    }, 3000);
                  } else if (response.status === 500) {
                    this.setState({
                      alertError500: true
                    });
                    setTimeout(() => {
                      this.setState({
                        alertError500: false
                      });
                    }, 3000);
                  }
                  //console.log(response.json());
                })
                .catch(error => {
                  console.log(`${error}`);
                });
              //alert(JSON.stringify({ values }, null, 2));
              //console.log(JSON.stringify({ values }, null, 2));
              setSubmitting(false);
            }, 10);
          }}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
              setFieldValue,
              setFieldTouched
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
                      Se actualizo el Parametro del sistema
                    </Alert>
                    <Alert
                      color={"danger"}
                      isOpen={this.state.alertError}
                      toggle={() => {
                        this.setState({ alertError: false });
                      }}
                    >
                      <i className="fa fa-exclamation-triangle" /> Error al
                      actualizar el parametro, verifique el valor ingresado
                    </Alert>
                    <Alert
                      color={"danger"}
                      isOpen={this.state.alertError500}
                      toggle={() => {
                        this.setState({ alertError500: false });
                      }}
                    >
                      <i className="fa fa-exclamation-triangle" /> Error al
                      actualizar verifique con el administrador
                    </Alert>
                    <div className="table-responseive">
                      <table className="table table-striped table-condensed ">
                        <tbody>
                          <tr>
                            <td>Parametro </td>
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
                            <td>Descripcion</td>
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
                            <td>Valor del parametro</td>
                            <td>
                              {aux.map((element, id) => (
                                <Field name={`${element.id}`}>
                                  {() => (
                                    <InpuDynamics
                                      key={id}
                                      formType={element.inputInfo.type}
                                      onChange={e =>
                                        setFieldValue("value", e.target.value)
                                      }
                                      name={
                                        element.inputInfo.elementConfig.name
                                      }
                                      options={
                                        element.inputInfo.elementConfig.options
                                      }
                                      //value={element.inputInfo.value}
                                      defaultValue={element.inputInfo.value}
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
                    onClick={e => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                  >
                    {" "}
                    Editar <i className="fa fa-pencil" />{" "}
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => this.setState({ modal: false })}
                  >
                    {" "}
                    Cerrar <i className="fa fa-times" />{" "}
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
  id: PropTypes.string.isRequired
};

export default ModalEditParameter;
