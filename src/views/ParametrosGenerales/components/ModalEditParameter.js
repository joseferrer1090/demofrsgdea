import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Formik, ErrorMessage, Field } from "formik";
import {
  PARAMETERS_FIND_BY_ID,
  PARAMTERS_UPDATE,
  PARAMETERS_INPUTS
} from "./../../../services/EndPoints";
import * as Yup from "yup";
import { decode } from "jsonwebtoken";

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
      id: id,
      modal: !this.state.modal
    });
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
          dataResult: data
        });
      })
      .catch(err => console.log(`err => ${err}`));
  };

  render() {
    console.log(this.state.dataResult);
    return (
      <Modal className="" isOpen={this.state.modal} onClick={() => this.toogle}>
        <ModalHeader>Parametro {this.state.dataResult.parameter}</ModalHeader>
        <Formik
          enableReinitialize={true}
          validationSchema={Yup.object().shape({})}
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
                    <div className="table-responseive">
                      <table className="table table-striped">
                        <tbody>
                          <tr>
                            <td> Parametro </td>
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
