import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import SIGNIN from "./../../../assets/img/favicon.ico";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Alert,
  Spinner
} from "reactstrap";
import { PASSWORD_RETRIEVAL_REQUEST } from "./../../../services/EndPoints";
class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      alertError: false,
      failed: false,
      alertError404: false,
      alertError400: false,
      alertSuccess: false,
      spinner: false
    };
  }

  Loadingspinner = () => {
    const { spinner } = this.state;
    if (spinner === true) {
      return (
        <center>
          <Spinner
            style={{ width: "3rem", height: "3rem" }}
            type="grow"
            color="primary"
          />
        </center>
      );
    } else if (spinner === false) {
      return null;
    }
  };

  onDismiss = () => {
    this.setState({
      alertError: false,
      failed: false
    });
  };
  handleChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    // console.log(this.state.username);
  };

  showEmail = email => {
    console.log(email);
  };
  render() {
    const email = this.state.email;
    return (
      <Fragment>
        <div className="app flex-row align-items-center">
          <Formik
            validationSchema={Yup.object().shape({
              user_email: Yup.string()
                .email(" Por favor introduzca un email valido.")
                .required(" Por favor introduzca un email.")
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setTimeout(() => {
                this.setState({
                  spinner: true
                });
                fetch(`${PASSWORD_RETRIEVAL_REQUEST}`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                  },
                  body: JSON.stringify({
                    email: values.user_email
                  })
                })
                  .then(response => {
                    if (response.status === 200) {
                      this.setState({
                        alertSuccess: false
                      });
                      setTimeout(() => {
                        this.setState({
                          alertSuccess: true,
                          spinner: false
                        });
                      }, 1000);
                      console.log(response.status);
                    } else if (response.status === 404) {
                      this.setState({
                        alertError404: false
                      });
                      setTimeout(() => {
                        this.setState({
                          alertError404: true,
                          spinner: false
                        });
                      }, 1000);
                      console.log(response.status);
                    } else if (response.status === 500) {
                      this.setState({
                        alertError: false
                      });
                      setTimeout(() => {
                        this.setState({
                          alertError: true,
                          spinner: false
                        });
                      }, 1000);
                      console.log(response.status);
                    } else if (response.status === 400) {
                      this.setState({
                        alertError400: false
                      });
                      setTimeout(() => {
                        this.setState({
                          alertError400: true,
                          spinner: false
                        });
                      }, 1000);
                      console.log(response.status);
                    }
                  })
                  .catch(error => {
                    console.log("", error);
                    this.setState({
                      failed: false
                    });
                    setTimeout(() => {
                      this.setState({
                        failed: true,
                        spinner: false
                      });
                    }, 1000);
                  });
                setSubmitting(false);
              }, 500);
            }}
          >
            {props => {
              const {
                values,
                touched,
                errors,
                handleChange,
                handleBlur,
                handleSubmit
              } = props;
              return (
                <Fragment>
                  <Container>
                    <Row className="justify-content-center">
                      <Col md="7">
                        <CardGroup>
                          <Card className="p-4">
                            <CardBody>
                              <Form>
                                <h1 className="text-center">
                                  Recuperar contraseña
                                </h1>
                                <p className="text-center text-muted">
                                  Se enviará un correo electrónico para generar
                                  una nueva contraseña.
                                </p>
                                {this.Loadingspinner()}
                                <Alert
                                  toggle={this.onDismiss}
                                  color="danger"
                                  isOpen={this.state.alertError}
                                >
                                  Error no se ha podido recuperar la contraseña.
                                  Inténtelo más tarde.
                                </Alert>
                                <Alert
                                  className="alert-dismissible"
                                  color="info"
                                  isOpen={this.state.alertSuccess}
                                >
                                  <i className="fa fa-envelope-square" />
                                  &nbsp; Se ha enviado satisfactoriamente un
                                  correo electrónico para la recuperación de la
                                  contraseña. Por favor revise su bandeja de
                                  entrada.
                                </Alert>
                                <Alert
                                  className="alert-dismissible"
                                  color="danger"
                                  isOpen={this.state.alertError400}
                                >
                                  Error no se ha podido recuperar la contraseña.
                                  Inténtelo nuevamente.
                                </Alert>
                                <Alert
                                  className="alert-dismissible"
                                  color="danger"
                                  isOpen={this.state.alertError404}
                                >
                                  El correo electrónico ingresado no se
                                  encuentra asociado a ningún usuario. Por favor
                                  inténtelo nuevamente.
                                </Alert>
                                <Alert
                                  toggle={this.onDismiss}
                                  color="danger"
                                  isOpen={this.state.failed}
                                >
                                  <i className="fa fa-exclamation-circle" />
                                  &nbsp; Error, por favor inténtelo más tarde.
                                </Alert>
                                <InputGroup className="mb-3">
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <i className="fa fa-envelope-square" />

                                      {/* <i className="icon-user" /> */}
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input
                                    id="email"
                                    name={"user_email"}
                                    type="text"
                                    placeholder="Email"
                                    // onChange={e => this.handleChangeInput(e)}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.user_email}
                                    className={`form-control form-control-md ${errors.user_email &&
                                      touched.user_email &&
                                      "is-invalid"}`}
                                    /*
                                    name={'usuario_email'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.usuario_email}
                                    type="text"
                                    className={`form-control form-control-sm ${errors.usuario_email &&
                                      touched.usuario_email &&
                                      'is-invalid'}`}*/
                                  />
                                </InputGroup>
                                <div className="text-center">
                                  <div style={{ color: "#D54B4B" }}>
                                    {errors.user_email && touched.user_email ? (
                                      <i className="fa fa-exclamation-triangle" />
                                    ) : null}
                                    <ErrorMessage name="user_email" />
                                  </div>
                                </div>
                                <br />
                                <Row>
                                  <Col xs="12">
                                    <Button
                                      onClick={e => {
                                        e.preventDefault();
                                        handleSubmit();
                                        // this.setState({
                                        //   spinner: true
                                        // })
                                      }}
                                      type="button"
                                      className="btn btn-secondary btn-block"
                                    >
                                      <i className="fa fa-send" />
                                      &nbsp; Recuperar contraseña
                                    </Button>
                                  </Col>
                                </Row>
                                <br />
                                <Row>
                                  <Col xs="12">
                                    <Link
                                      to="/"
                                      className="btn btn-dark btn-block"
                                    >
                                      <img
                                        src={SIGNIN}
                                        width={20}
                                        height={20}
                                      />
                                      &nbsp; Iniciar sesión
                                    </Link>
                                  </Col>
                                </Row>
                              </Form>
                            </CardBody>
                          </Card>
                          {/* <Card
                  className="text-black bg-secondary py-5 d-md-down-none"
                  style={{ width: "44%" }}
                >
                  <CardBody className="text-center">
                    <div>
                      <h2>Registro</h2>
                      <p>Este es Administrador general de la aplicacion.</p>
                      <Link to="/register">
                        <Button
                          color="primary"
                          className="mt-3"
                          active
                          tabIndex={-1}
                        >
                          Resgistrar
                        </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card> */}
                        </CardGroup>
                      </Col>
                    </Row>
                  </Container>
                </Fragment>
              );
            }}
          </Formik>
        </div>
      </Fragment>
    );
  }
}

Forgot.propTypes = {};

export default Forgot;
