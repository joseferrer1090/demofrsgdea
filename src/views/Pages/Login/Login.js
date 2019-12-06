import React, { Component } from "react";
import { Link } from "react-router-dom";
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
  Row
} from "reactstrap";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  render() {
    const validationSchema = Yup.object().shape({
      username: Yup.string().required("nombre de usuario invalido"),
      password: Yup.string().required("contraseña es requerida")
    });

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Formik
                      validationSchema={validationSchema}
                      onSubmit={(values, { setSubmitting, resetForm }) => {
                        setTimeout(() => {
                          alert(JSON.stringify(values, null, 2));
                          setSubmitting(false);
                          resetForm({ values });
                        }, 1500);
                      }}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting
                      }) => (
                        <Form onSubmit={handleSubmit} noValidate>
                          <div className="row">
                            <div
                              className="col-md-12"
                              style={{ marginTop: "-42px" }}
                            >
                              <div className="text-center">
                                <img
                                  src="/assets/img/sevenet.svg"
                                  width="150"
                                  height="100"
                                />
                              </div>
                            </div>
                          </div>
                          <h1 className="text-center">Iniciar sesión</h1>
                          <p className="text-muted text-center">
                            Ingresa al administrador general SGDEA
                          </p>
                          <div className="form-group">
                            <InputGroup className="mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-user" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <input
                                className="form-control form-control-sm"
                                name="username"
                                id="username"
                                type="text"
                                placeholder="usuario"
                                autoComplete="usuario"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoFocus
                              />
                            </InputGroup>
                            <div
                              style={{ color: "#D54B4B", marginTop: "-17px" }}
                            >
                              {errors.username && touched.username ? (
                                <i className="fa fa-exclamation-triangle" />
                              ) : null}
                              <ErrorMessage name="username" />
                            </div>
                          </div>

                          <div className="form-group">
                            <InputGroup className="mb-4">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-lock" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <input
                                className="form-control form-control-sm"
                                id="password"
                                type="password"
                                placeholder="contraseña"
                                autoComplete="on"
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </InputGroup>
                            <div
                              style={{ color: "#D54B4B", marginTop: "-17px" }}
                            >
                              {errors.password && touched.password ? (
                                <i className="fa fa-exclamation-triangle" />
                              ) : null}
                              <ErrorMessage name="password" />
                            </div>
                          </div>
                          <Row>
                            <Col xs="6">
                              <button
                                type="submit"
                                className="btn btn-outline-secondary btn-block"
                              >
                                {/* Ingresar{" "}
                                <i className="fa fa-arrow-circle-right" /> */}
                                {isSubmitting ? (
                                  <i className=" fa fa-spinner fa-spin" />
                                ) : (
                                  <div>
                                    Ingresar{" "}
                                    <i className="fa fa-arrow-circle-right" />
                                  </div>
                                )}
                              </button>
                              {/* <Link
                                to="/middleware"
                                className="btn btn-outline-secondary btn-block"
                              >
                                Ingresar{" "}
                                <i className="fa fa-arrow-circle-right" />
                              </Link> */}
                            </Col>
                            <Col xs="6" className="text-right">
                              <Link to="/forgot" color="link" className="px-0">
                                ¿Olvidaste tu contraseña?
                              </Link>
                            </Col>
                          </Row>
                        </Form>
                      )}
                    </Formik>
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
      </div>
    );
  }
}

export default Login;
