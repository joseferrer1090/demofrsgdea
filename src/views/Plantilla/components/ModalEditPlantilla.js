import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { TEMPLATE_SHOW, TEMPLATE_UPDATE } from "./../../../services/EndPoints";
import { Formik } from "formik";
import * as Yup from "yup";
import { decode } from "jsonwebtoken";
import IMGPLANTILLA from "./../../../assets/img/puzzle-pieces.svg";

class ModalEditPlantilla extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaledit,
      auth: this.props.authorization,
      id: this.props.id
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
    if (props.id !== state.id) {
      return {
        id: props.id
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.id !== prevProps.id) {
      this.setState({
        auth: this.props.authorization,
        id: this.props.id
      });
      this.getDataTemplate(this.state.id, this.state.auth);
    } else if (this.props.authorization === "" || this.props.id === null) {
    }
    return;
  }

  getDataTemplate = (id, auth) => {
    const username = decode(auth);
    fetch(`${TEMPLATE_SHOW}/${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/jsom",
        authorization: "Bearer " + auth
      }
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(`Error => ${err.message}`);
      });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  render() {
    return (
      <Modal className={"modal-lg"} isOpen={this.state.modal}>
        <ModalHeader>Probando apenas</ModalHeader>
        <Formik>
          {props => {
            const {
              values,
              touched,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              setFieldTouched
            } = props;
            return (
              <React.Fragment>
                <ModalBody>
                  <div className="row">
                    <div className="col-md-3">
                      <img src={IMGPLANTILLA} className="img-thumbnail" />
                    </div>
                    <div className="col-md-9">
                      <div className="">
                        {" "}
                        <h5
                          className=""
                          style={{ borderBottom: "1px solid black" }}
                        >
                          {" "}
                          Datos plantilla{" "}
                        </h5>{" "}
                      </div>
                      <form className="form">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                Codigo <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.codigo}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                Nombre <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.nombre}
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>
                                Descripcion{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <textarea
                                className="form-control form-control-sm"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.descripcion}
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <div className="pull-right">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({ modal: false });
                      }}
                    >
                      {" "}
                      <i className="fa fa-times" /> Cancelar{" "}
                    </button>
                  </div>
                </ModalFooter>
              </React.Fragment>
            );
          }}
        </Formik>
      </Modal>
    );
  }
}

ModalEditPlantilla.propTypes = {
  authorization: PropTypes.string.isRequired
};

export default ModalEditPlantilla;
