import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "./../../../actions";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardGroup,
  Container,
  Form
} from "reactstrap";

class Login extends React.Component {
  constructor(props) {
    super(props);
    //this.props.logout();
    this.state = {
      username: "",
      password: "",
      grant_type: "password",
      submitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      submitted: true
    });
    const { username, password, grant_type } = this.state;
    if (username && password) {
      this.props.login(username, password, grant_type);
    }
  }

  render() {
    // const { logginIn } = this.props;
    const { username, password, grant_type } = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <form name="form" onSubmit={this.handleSubmit}>
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
                            name="username"
                            value={username}
                            onChange={this.handleChange}
                            placeholder="Usuarios"
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
                        <input
                          type="password"
                          className="form-control form-control-sm"
                          name="password"
                          value={password}
                          onChange={this.handleChange}
                          placeholder="Contraseña"
                        />
                      </div>
                      <input type="hidden" value={grant_type} />
                      <Row>
                        <Col xs="6">
                          <button
                            type="submit"
                            className="btn btn-outline-secondary btn-block"
                          >
                            Ingresar <i className="fa fa-arrow-circle-right" />
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
function mapStateToProps(state) {
  // const { loggingIn } = state.authentication;
  console.log(state);
  return { state };
}

const actionCreators = {
  login: userActions.login,
  logout: userActions.logout
};

export default connect(mapStateToProps, actionCreators)(Login);
