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
import "./../../../../../node_modules/hover.css/css/hover.css";
import themeSVG from "./../../../../assets/img/theme.svg";
import "./custom.css";

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
              type and scrambled it to make a type specimen book. It has .{" "}
            </Alert>
          </Col>
          <Col sm="12" height="250">
            <Card body>
              <Row>
                <div className="col-md-12">
                  <Card body outline color="secondary">
                    <div className="row">
                      <div
                        className="col-md-4"
                        //   style={{ border: "1px solid red" }}
                      >
                        <div className="mt-2">
                          <input type="radio" className="zoom-radio" />
                        </div>
                      </div>
                      <div
                        className="col-md-4"
                        //   style={{ border: "1px solid red" }}
                      >
                        {" "}
                        <h3 className="text-center">
                          <a
                            onClick={() => {
                              alert("probando");
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            {" "}
                            <b> Tema 1 </b>{" "}
                          </a>
                        </h3>{" "}
                      </div>
                      <div
                        className="col-md-4"
                        //   style={{ border: "1px solid red" }}
                      >
                        <div className="text-center">
                          <img
                            src={themeSVG}
                            width={30}
                            className="float-right"
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="col-md-12">
                  <Card body outline color="secondary">
                    <div className="row">
                      <div
                        className="col-md-4"
                        //   style={{ border: "1px solid red" }}
                      >
                        <div className="mt-2">
                          <input type="radio" className="zoom-radio" />
                        </div>
                      </div>
                      <div
                        className="col-md-4"
                        //   style={{ border: "1px solid red" }}
                      >
                        {" "}
                        <h3 className="text-center">
                          <a
                            onClick={() => {
                              alert("probando");
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            {" "}
                            <b> Tema 1 </b>{" "}
                          </a>
                        </h3>{" "}
                      </div>
                      <div
                        className="col-md-4"
                        //   style={{ border: "1px solid red" }}
                      >
                        <div className="text-center">
                          <img
                            src={themeSVG}
                            width={30}
                            className="float-right"
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="col-md-12">
                  <Card body outline color="secondary">
                    <div className="row">
                      <div
                        className="col-md-4"
                        //   style={{ border: "1px solid red" }}
                      >
                        <div className="mt-2">
                          <input type="radio" className="zoom-radio" />
                        </div>
                      </div>
                      <div
                        className="col-md-4"
                        //   style={{ border: "1px solid red" }}
                      >
                        {" "}
                        <h3 className="text-center">
                          <a
                            onClick={() => {
                              alert("probando");
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            {" "}
                            <b> Tema 1 </b>{" "}
                          </a>
                        </h3>{" "}
                      </div>
                      <div
                        className="col-md-4"
                        //   style={{ border: "1px solid red" }}
                      >
                        <div className="text-center">
                          <img
                            src={themeSVG}
                            width={30}
                            className="float-right"
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="col-md-12">
                  <Card body outline color="secondary">
                    <div className="row">
                      <div
                        className="col-md-4"
                        //   style={{ border: "1px solid red" }}
                      >
                        <div className="mt-2">
                          <input type="radio" className="zoom-radio" />
                        </div>
                      </div>
                      <div
                        className="col-md-4"
                        //   style={{ border: "1px solid red" }}
                      >
                        {" "}
                        <h3 className="text-center">
                          <a
                            onClick={() => {
                              alert("probando");
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            {" "}
                            <b> Tema 1 </b>{" "}
                          </a>
                        </h3>{" "}
                      </div>
                      <div
                        className="col-md-4"
                        //   style={{ border: "1px solid red" }}
                      >
                        <div className="text-center">
                          <img
                            src={themeSVG}
                            width={30}
                            className="float-right"
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ThemeSelector;
