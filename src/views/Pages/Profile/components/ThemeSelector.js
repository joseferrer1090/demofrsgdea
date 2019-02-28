import React, { Component } from "react";
import {
  Row,
  Col,
  Alert,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from "reactstrap";

class ThemeSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="12">
            <Alert color="secondary">
              {" "}
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.{" "}
            </Alert>
          </Col>
          <Col sm="12">
            <Card>
              <CardBody>
                <Row>
                  <Col sm="12">
                    <Card body>
                      <input type="radio" />
                    </Card>
                  </Col>
                  <Col sm="12">
                    <Card body>
                      <input type="radio" />
                    </Card>
                  </Col>
                  <Col sm="12">
                    <Card body>
                      <input type="radio" />
                    </Card>
                  </Col>
                  <Col sm="12">
                    <Card body>
                      <input type="radio" />
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ThemeSelector;
