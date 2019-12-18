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

class Page404 extends Component {
  goBack = () => {
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <div className="clearfix">
                <h1 className="float-left display-3 mr-4">404</h1>
                <h4 className="pt-3">Ups! Estas perdido.</h4>
                <p className="text-muted float-left">
                  No se encontro la pagina que buscas
                  <br />
                  <Button color="secondary" onClick={this.goBack}>
                    <i className="fa fa-arrow-circle-o-left" /> Atras{" "}
                  </Button>
                </p>
                <br />
              </div>
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

export default Page404;
