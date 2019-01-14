import React, { Component } from "react";
import {
  Button,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";

class Page500 extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <span className="clearfix">
                <h1 className=" display-4 text-center">500</h1>
                <h4 className="text-center">Houston, tenemos un problema!</h4>
                <p className="text-muted text-center">
                  La página que está buscando no está disponible temporalmente.
                </p>
              </span>
              <InputGroup className="input-prepend">
                <InputGroupAddon addonType="prepend" />
              </InputGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Page500;
