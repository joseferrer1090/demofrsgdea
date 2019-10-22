import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
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
} from 'reactstrap';

class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      alertError: false,
      alertError400: false,
      alertError404: false,
      alertSuccess: false
    };
  }

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
                .email(' Por favor introduzca un email valido.')
                .required(' Por favor introduzca un email.')
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                fetch(
                  `http://192.168.10.180:8090/api/sgdea/service/configuration/user/password-reset-request`,
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({
                      email: values.user_email
                    })
                  }
                )
                  .then(response => {
                    if (response.status === 200) {
                      this.setState({
                        alertSuccess: true
                      });
                      console.log(response.status);
                    } else if (response.status === 404) {
                      this.setState({
                        alertError404: true
                      });
                      console.log(response.status);
                    } else if (response.status === 500) {
                      this.setState({
                        alertError: true
                      });
                      console.log(response.status);
                    } else if (response.status === 400) {
                      this.setState({
                        alertError400: true
                      });
                      console.log(response.status);
                    }
                  })
                  .catch(error => console.log('', error));
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
                                <h1 className="text-center">
                                  Recuperar contraseña
                                </h1>
                                <p className="text-center text-muted">
                                  Se enviará un correo electrónico para generar
                                  una nueva contraseña.
                                </p>
                                <Alert
                                  color="danger"
                                  isOpen={this.state.alertError}
                                >
                                  Error no se ha podido recuperar la contraseña.
                                </Alert>
                                <Alert
                                  color="success"
                                  isOpen={this.state.alertSuccess}
                                ></Alert>
                                <Alert
                                  color="danger"
                                  isOpen={this.state.alertError400}
                                >
                                  Error 400
                                </Alert>
                                <Alert
                                  color="danger"
                                  isOpen={this.state.alertError404}
                                >
                                  Error 404
                                </Alert>
                                <InputGroup className="mb-3">
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <i className="icon-user" />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input
                                    id="email"
                                    name={'user_email'}
                                    type="text"
                                    placeholder="Email"
                                    // onChange={e => this.handleChangeInput(e)}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.user_email}
                                    className={`form-control form-control-sm ${errors.user_email &&
                                      touched.user_email &&
                                      'is-invalid'}`}
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
                                  <div style={{ color: '#D54B4B' }}>
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
                                      }}
                                      type="button"
                                      className="btn btn-secondary btn-block"
                                    >
                                      <i className="fa fa-send" /> Recuperar
                                      contraseña
                                    </Button>
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
