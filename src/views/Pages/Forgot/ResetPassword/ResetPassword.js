import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import SIGNIN from "./../../../../assets/img/favicon.ico";
import * as Yup from "yup";
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
  Alert
} from "reactstrap";
import {NEW_PASSWORD} from './../../../../services/EndPoints';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LoginPage: false,
      access_token: "",
      alertError: false,
      alertError400: false,
      alertError404: false,
      alertSuccess: false,
      failed: false
    };
  }

  onDismiss = () => {
    this.setState({
      alertError: false,
      alertError400: false,
      alertError404: false,
      alertSuccess: false,
      failed: false
    });
  };

  componentDidMount() {
    const url = new URLSearchParams(this.props.location.search);
    const token = url.get("token");

    this.setState({
      access_token: token
    });
  }

  render() {
    return (
      <Fragment>
        <div className="app flex-row align-items-center">
          <Formik
            validationSchema={Yup.object().shape({
              password_one: Yup.string()
                .matches(
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/, // esta expresion regular valida la contraseña
                  " Contraseña no valida, asegúrese de que lleve al menos una letra en mayuscula, un digito, y un caracter especial."
                )
                .required(" Por favor introduzca una contraseña.")
                .min(8, "  Mínimo 8 caracteres. ")
                .max(15, " Máximo 15 caracteres."),
              password_two: Yup.string()
                .oneOf(
                  [Yup.ref("password_one"), null],
                  " Las contraseñas no coinciden."
                )
                .required(" Por favor confirme la contraseña.")
                .min(10, " Mínimo 10 caracteres.")
                .max(200)
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                fetch(
                  `${NEW_PASSWORD}`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      password: values.password_one,
                      token: this.state.access_token
                    })
                  }
                )
                  .then(response => {
                    if (response.status === 200) {
                      console.log(response.status);
                      this.setState({
                        LoginPage: true
                      });
                    } else if (response.status === 500) {
                      this.setState({
                        alertError: false
                      });
                      setTimeout(() => {
                        this.setState({
                          alertError: true
                        });
                      }, 1000);
                    }
                  })
                  .catch(error => {
                    console.log("", error);
                    this.setState({
                      failed: false
                    });
                    setTimeout(() => {
                      this.setState({
                        failed: true
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
                dirty,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset,
                setFieldValue,
                setFieldTouched
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
                                {this.state.LoginPage === false ? (
                                  <Fragment>
                                    <h1 className="text-center">
                                      Restablecer constraseña
                                    </h1>
                                    <p className="text-center text-muted">
                                      Por favor introduzca una nueva contraseña:
                                    </p>
                                    <br />
                                    <Alert
                                      toggle={this.onDismiss}
                                      color="danger"
                                      isOpen={this.state.alertError}
                                    >
                                      Error no se ha podido restablecer la
                                      contraseña. Inténtelo más tarde.
                                    </Alert>
                                    <Alert
                                      toggle={this.onDismiss}
                                      color="danger"
                                      isOpen={this.state.failed}
                                    >
                                      <i className="fa fa-exclamation-circle" />
                                      &nbsp; Error, por favor inténtelo más
                                      tarde.
                                    </Alert>
                                    <InputGroup className="mb-3">
                                      <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                          <i className="fa fa-key" />
                                        </InputGroupText>
                                      </InputGroupAddon>
                                      <Input
                                        id="password_one"
                                        name={"password_one"}
                                        type="password"
                                        placeholder="Contraseña"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password_one}
                                        className={`form-control form-control-sm ${errors.password_one &&
                                          touched.password_one &&
                                          "is-invalid"}`}
                                      />
                                    </InputGroup>
                                    <Row>
                                      <div style={{ color: "#D54B4B" }}>
                                        {errors.password_one &&
                                        touched.password_one ? (
                                          <i className="fa fa-exclamation-triangle" />
                                        ) : null}
                                        <ErrorMessage name="password_one" />
                                      </div>
                                    </Row>
                                    <br />
                                    <InputGroup className="mb-3">
                                      <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                          <i className="fa fa-key" />
                                        </InputGroupText>
                                      </InputGroupAddon>
                                      <Input
                                        id="password_two"
                                        name={"password_two"}
                                        type="password"
                                        placeholder="Confirmar contraseña"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password_two}
                                        className={`form-control form-control-sm ${errors.password_two &&
                                          touched.password_two &&
                                          "is-invalid"}`}
                                      />
                                    </InputGroup>
                                    <Row>
                                      <div style={{ color: "#D54B4B" }}>
                                        {errors.password_two &&
                                        touched.password_two ? (
                                          <i className="fa fa-exclamation-triangle" />
                                        ) : null}
                                        <ErrorMessage name="password_two" />
                                      </div>
                                    </Row>
                                    {/* <div className="text-center">
                                      <div style={{ color: '#D54B4B' }}>
                                        {errors.user_email &&
                                        touched.user_email ? (
                                          <i className="fa fa-exclamation-triangle" />
                                        ) : null}
                                        <ErrorMessage name="user_email" />
                                      </div>
                                    </div> */}
                                    <br />
                                    <Row>
                                      <Col xs="12">
                                        <Button
                                          onClick={e => {
                                            e.preventDefault();
                                            handleSubmit();
                                          }}
                                          type="button"
                                          className="btn btn-secondary btn-block"
                                        >
                                          <i className="fa fa-send" />{" "}
                                          Restablecer constraseña
                                        </Button>
                                      </Col>
                                    </Row>
                                  </Fragment>
                                ) : (
                                  <Fragment>
                                    <h1 className="text-center">
                                      Restablecer constraseña
                                    </h1>
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
                                  </Fragment>
                                )}
                              </Form>
                            </CardBody>
                          </Card>
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

ResetPassword.propTypes = {};

export default ResetPassword;
