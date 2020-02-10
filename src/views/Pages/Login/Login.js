import React from "react";
import { Formik, withFormik } from "formik";
import * as Yup from "yup";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardGroup,
  Container,
  Form,
  Alert
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "./../../../actions";
import { alertActions } from "./../../../actions/alertActions";

const ErrorMessage = ({ errorValue }) => (
  <div style={{ margin: 0, color: "red" }}>
    {errorValue ? (
      <p>
        <i className="fa fa-exclamation-triangle" /> {errorValue}
      </p>
    ) : null}
  </div>
);

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      alertType: ""
    };
  }

  componentDidMount() {
    console.log(this.state.alertType);
  }

  onDismiss = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const {
      values,
      touched,
      errors,
      dirty,
      handleChange,
      handleBlur,
      handleSubmit,
      handleReset,
      isSubmitting,
      isAuthenticated,
      loginError,
      isLogginIn,
      attempts
    } = this.props;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <form name="form" onSubmit={handleSubmit}>
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
                      {loginError && (
                        <Alert color="danger" isOpen={loginError}>
                          {" "}
                          <p className="text-justify">
                            <i className="fa fa-exclamation-triangle" /> Error
                            al ingresar a la plataforma , usuario y/o contraseña
                            no son validos, intentos {attempts}
                          </p>
                        </Alert>
                      )}
                      {attempts === 3 ? (
                        <Alert color={"danger"} isOpen={loginError}>
                          <p>
                            <i className="fa fa-exclamation-triangle" /> El
                            usuario se ha bloqueado por numero de intentos
                            errados, contacte al administrador
                          </p>
                        </Alert>
                      ) : null}
                      <h1 className="text-center">Iniciar sesión</h1>
                      <p className="text-muted text-center">
                        Ingresa al administrador general SGDEA
                      </p>
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
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            // name="username"
                            id="username"
                            placeholder="Usuario"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                          />
                        </div>
                        <ErrorMessage errorValue={errors.username} />
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
                        <input
                          type="password"
                          className="form-control form-control-sm"
                          // name="password"
                          id="password"
                          value={values.password}
                          placeholder="Contraseña"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <ErrorMessage errorValue={errors.password} />
                      {/* <input type="hidden" value={grant_type} /> */}
                      <Row>
                        <Col xs="6">
                          <button
                            type="submit"
                            className="btn btn-outline-secondary btn-block"
                            disabled={this.props.isSubmitting}
                          >
                            {isSubmitting ? (
                              <i className=" fa fa-spinner fa-spin" />
                            ) : (
                              <div>
                                Login <i className="fa fa-arrow-circle-right" />
                              </div>
                            )}
                            {/* Ingresar <i className="fa fa-arrow-circle-right" /> */}
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
                    </form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    username: Yup.string().required("usuario no puede ir en blanco"),
    password: Yup.string().required("constraseña invalida")
  }),
  mapPropsToValues: () => ({
    username: "",
    password: "",
    grant_type: "password"
  }),
  handleSubmit: (values, { setSubmitting, resetForm, props }) => {
    setTimeout(() => {
      const username = values.username;
      const password = values.password;
      const grant_type = values.grant_type;
      // alert(JSON.stringify(values, null, 2));

      props.login(username, password, grant_type);

      setSubmitting(true);
      resetForm();
    }, 1500);
  }
})(LoginForm);

const mapStateToProps = state => {
  return {
    loginError: state.authenticationReducer.loginError,
    isLogginIn: state.authenticationReducer.isLogginIn,
    isAuthenticated: state.authenticationReducer.isAuthenticated,
    attempts: state.authenticationReducer.attempts
  };
};

const actionCreators = {
  login: userActions.login
};

const Login = connect(mapStateToProps, actionCreators)(formikEnhancer);

export default Login;
