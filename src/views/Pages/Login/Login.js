import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, ErrorMessage, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardBody,
  Container,
  Col,
  CardGroup,
  Row,
  Alert
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "./../../../actions/authenticationActions";

export default props => {
  const [visible, setVisible] = useState(true);
  const [visiblepassword, setVisiblePassword] = useState(true);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(" nombre de usuario invalido"),
    password: Yup.string().required(" contraseña es requerida")
  });

  const onDismiss = () => setVisible(false);
  const onDismissPassword = () => setVisiblePassword(false);

  return (
    <Formik
      initialValues={{
        name: "",
        password: "",
        grant_type: "password"
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          //alert(JSON.stringify(values, null, 2));
          dispatch(userActions.login(values));
          setSubmitting(false);
          resetForm();
        }, 400);
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="6">
                <CardGroup>
                  <Card className="p-4">
                    <CardBody>
                      <Form>
                        <div className="row">
                          <div className="col-md-12">
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
                        {errors.name && touched.name ? (
                          <Alert
                            color="danger"
                            isOpen={visible}
                            toggle={onDismiss}
                            fade
                          >
                            <i className="fa fa-exclamation-triangle" />
                            <ErrorMessage name="name" />
                          </Alert>
                        ) : null}
                        {errors.password && touched.password ? (
                          <Alert
                            color="danger"
                            isOpen={visiblepassword}
                            toggle={onDismissPassword}
                          >
                            <i className="fa fa-exclamation-triangle" />{" "}
                            <ErrorMessage name="password" />
                          </Alert>
                        ) : null}
                        <div className="form-group">
                          <div className="input-group input-group mb-3">
                            <div className="input-group-prepend">
                              <span
                                className="input-group-text"
                                id="inputGroup-sizing-sm"
                              >
                                <i className="fa fa-user" />
                              </span>
                            </div>
                            <Field
                              className="form-control"
                              type="text"
                              placeholder="usuario"
                              name="name"
                              autoFocus
                            />
                          </div>
                        </div>
                        <div className="input-group input-group mb-3">
                          <div className="input-group-prepend">
                            <span
                              className="input-group-text"
                              id="inputGroup-sizing-sm"
                            >
                              <i className="fa fa-lock" />
                            </span>
                          </div>
                          <Field
                            className="form-control"
                            type="password"
                            placeholder="contraseña"
                            name="password"
                          />
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
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </Formik>
  );
};
