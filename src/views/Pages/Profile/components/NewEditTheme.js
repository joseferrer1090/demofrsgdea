import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Row,
  Col,
  Collapse
} from "reactstrap";
import PropType from "prop-types";

class NewEditTheme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headercollapse: false,
      bodycollapse: false,
      footercollapse: false,
      componentscollapse: false
    };
  }

  toggle = () => {
    this.setState({ headercollapse: !this.state.headercollapse });
  };

  toggleBody = () => {
    this.setState({
      headercollapse: false,
      bodycollapse: !this.state.bodycollapse
    });
  };

  toggleFooter = () => {
    this.setState({
      headercollapse: false,
      bodycollapse: false,
      footercollapse: !this.state.footercollapse
    });
  };

  toggleComponentes = () => {
    this.setState({
      headercollapse: false,
      bodycollapse: false,
      footercollapse: false,
      componentscollapse: !this.state.componentscollapse
    });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <Col sm="12">
                  <Card>
                    <CardHeader
                      onClick={() => {
                        this.toggle();
                      }}
                    >
                      {" "}
                      Header{" "}
                    </CardHeader>
                    <Collapse isOpen={this.state.headercollapse}>
                      <CardBody>
                        <p>Probando</p>
                      </CardBody>
                    </Collapse>
                  </Card>
                </Col>
                <Col sm="12">
                  <Card>
                    <CardHeader
                      onClick={() => {
                        this.toggleBody();
                      }}
                    >
                      {" "}
                      Body{" "}
                    </CardHeader>
                    <Collapse isOpen={this.state.bodycollapse}>
                      <CardBody>
                        <p>Probando</p>
                      </CardBody>
                    </Collapse>
                  </Card>
                </Col>
                <Col sm="12">
                  <Card>
                    <CardHeader
                      onClick={() => {
                        this.toggleFooter();
                      }}
                    >
                      {" "}
                      Footer{" "}
                    </CardHeader>
                    <Collapse isOpen={this.state.footercollapse}>
                      <CardBody>
                        <p>Probando</p>
                      </CardBody>
                    </Collapse>
                  </Card>
                </Col>
                <Col sm="12">
                  <Card>
                    <CardHeader
                      onClick={() => {
                        this.toggleComponentes();
                      }}
                    >
                      Otro componentes
                    </CardHeader>
                    <Collapse isOpen={this.state.componentscollapse}>
                      <CardBody>
                        <p>Probando</p>
                      </CardBody>
                    </Collapse>
                  </Card>
                </Col>
              </CardBody>
              <CardFooter>
                <div className="float-right">
                  <button className="btn btn-secondary btn-sm">
                    {" "}
                    <i className="fa fa-times" /> Borrar{" "}
                  </button>
                  &nbsp;
                  <button className="btn btn-secondary btn-sm">
                    <i className="fa fa-pencil" /> Nuevo tema{" "}
                  </button>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NewEditTheme;
