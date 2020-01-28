import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { PARAMETERS_FIND_BY_ID } from "./../../../services/EndPoints";
import { Fomrik, ErrorMessage, Formik, Field } from "formik";
import * as Yup from "yup";
import Input from "./../components/InputDynamics";

class ModalEditParameter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalEditParameter,
      idParameter: this.props.id,
      dataResult: {},
      auth: this.props.authorization
    };
  }

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      idParameter: id
    });
    this.getDataParameterByID(id);
  };

  getDataParameterByID = id => {
    fetch(`${PARAMETERS_FIND_BY_ID}${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.auth
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataResult: data
        });
      })
      .catch(err => console.log(`err => ${err}`));
  };

  // handleSubmit = (values, { props = this.props, setSubmitting }) => {
  //   alert(JSON.stringify(values, null, 2));
  //   setSubmitting(false);
  //   return;
  // };

  render() {
    return (
      <Modal className="" isOpen={this.state.modal} onClick={() => this.toggle}>
        <ModalHeader> Parametro {this.state.dataResult.parameter} </ModalHeader>
        <Formik
          enableReinitialize={true}
          initialValues={{
            parameter: this.state.dataResult.parameter,
            description: this.state.dataResult.description,
            valueparameter: this.state.dataResult.value
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 1000);
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
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <tbody>
                          <tr>
                            <td>Parametro</td>
                            <td>
                              {" "}
                              <input
                                type={"text"}
                                className="form-control form-control-sm"
                                value={values.parameter}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled
                              />{" "}
                            </td>
                          </tr>
                          <tr>
                            <td>Descripcion</td>
                            <td>
                              {" "}
                              <textarea
                                className="form-control form-control-sm"
                                rows={4}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                                disabled
                              ></textarea>
                            </td>
                          </tr>
                          <tr>
                            <td>Valor</td>
                            <td>
                              <Field name="valueparameter">
                                {({}) => (
                                  <div>
                                    <Input
                                      onChange={e =>
                                        setFieldValue(
                                          "valueparameter",
                                          e.target.value
                                        )
                                      }
                                      onBlur={() =>
                                        setFieldTouched("valueparameter", true)
                                      }
                                      value={values.valueparameter}
                                      formType={
                                        this.state.dataResult.parameterType
                                      }
                                    />
                                  </div>
                                )}
                              </Field>

                              {/* <Field
                              value={values.valueparameter}
                              type={this.state.dataResult.typeParameter}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={"form-control form-control-sm"}
                              
                            ></Field> */}
                              {/* <input
                              type={"text"}
                              className="form-control form-control-sm"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.valueparameter}
                            /> */}
                            </td>
                          </tr>
                        </tbody>
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
                    Editar <i className="fa fa-pencil" />
                  </button>
                  <button
                    type={"button"}
                    onClick={() => this.setState({ modal: false })}
                    className="btn btn-secondary btn-sm"
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
