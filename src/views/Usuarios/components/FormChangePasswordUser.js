import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Card,
  CardBody
} from "reactstrap";
import { Formik, ErrorMessage, Form } from "formik";
import * as Yup from "yup";

class ModalChangePasswordUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalpassword,
      id: this.props.id,
      userLogged: "jferrer",
      nameUser: ""
    };
  }

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
    fetch(
      `http://192.168.10.180:7000/api/sgdea/user/${id}?username=${this.state.userLogged}`,
      {
        method: "GET",
        headers: {
          Authorization: "Basic " + window.btoa("sgdea:123456"),
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          nameUser: data.name
        });
      })
      .catch(Error => console.log(Error));
  };

  render() {
    return (
      <Fragment>
        <Modal isOpen={this.state.modal}>
          <ModalHeader> Cambiar contraseña {this.state.nameUser} </ModalHeader>
          <Formik
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, "", 2));
              }, 2000);
            }}
            validationSchema={Yup.object().shape({
              newpassword: Yup.string().required(
                "Se requiere la nueva contraseña"
              ),
              confirmpassword: Yup.string().required(
                "Se requiere confirmar contraseña"
              )
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
              return (
                <Fragment>
                  <form className="form">
                    <ModalBody>
                      <Row>
                        <Col sm="12">
                          <p
                            className="text-muted"
                            style={{ textAlign: "justify" }}
                          >
                            Tener en cuenta que previamente se debe notificar al
                            usuario
                            <code> Nombre</code>, que la contraseña se va a
                            actualizar. En caso contrario se le pueden borrar
                            las operaciones que se estén realizando en el
                            sistema
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="12">
                          <Card>
                            <CardBody>
                              <div className="form-group">
                                <label>
                                  {" "}
                                  Nueva contraseña{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <input
                                  className="form-control form-control-sm"
                                  type="password"
                                  placeholder=""
                                />
                              </div>
                              <div className="form-group">
                                <label>
                                  {" "}
                                  Confirmar nueva contraseña{" "}
                                  <span className="text-danger"> * </span>{" "}
                                </label>
                                <input
                                  type="password"
                                  className="form-control form-control-sm"
                                  placeholder=""
                                />
                              </div>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </ModalBody>
                    <ModalFooter>
                      <button
                        type="submit"
                        className="btn btn-outline-warning btn-sm"
                      >
                        {" "}
                        <i className="fa fa-lock" /> Cambiar contraseña{" "}
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          this.setState({ modal: false });
                        }}
                      >
                        <i className="fa fa-times" /> Cerrar
                      </button>
                    </ModalFooter>
                  </form>
                </Fragment>
              );
            }}
          </Formik>
        </Modal>
      </Fragment>
    );
  }
}

ModalChangePasswordUser.propTypes = {
  modalpassword: PropTypes.bool.isRequired
};

export default ModalChangePasswordUser;
