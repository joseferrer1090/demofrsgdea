import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
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

class Forgot extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="7">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1 className="text-center">Recuperar contraseña</h1>
                      <p className="text-center text-muted">
                        Se enviara un correao al administrador del sistema para
                        generar una nueva contraseña.
                      </p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-envelope" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="correo electronico" />
                      </InputGroup>

                      <Row>
                        <Col xs="12">
                          <Link to="/" className="btn btn-secondary btn-block">
                            <i className="fa fa-send" /> Recuperar contraseña
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
      </div>
    );
  }
}

Forgot.propTypes = {};

export default Forgot;
