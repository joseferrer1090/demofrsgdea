import React, { Component } from "react";
import { Card, CardHeader, CardFooter, CardBody, Col, Row } from "reactstrap";
import PropTypes from "prop-types";

class FormAutomatic extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm={{ size: 8, offset: 2 }}>
            <Card>
              <CardHeader>
                {" "}
                <i className="fa fa-gears" /> Mover historico automatico{" "}
              </CardHeader>
              <CardBody>
                <p className="text-justify">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <form role="form">
                  <div className="row">
                    <div className="col-md-12">
                      <Card body>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {" "}
                                Fecha desde{" "}
                                <span className="text-danger">*</span>{" "}
                              </label>
                              <input
                                type="date"
                                className="form-control form-control-sm"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {" "}
                                Fecha hasta{" "}
                                <span className="text-danger">*</span>{" "}
                              </label>
                              <input
                                type="date"
                                className="form-control form-control-sm"
                              />
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                    <div className="col-md-12">
                      <Card body>
                        <p>Segunda parte del formulario</p>
                      </Card>
                    </div>
                  </div>
                </form>
              </CardBody>
              <CardFooter>
                <div className="float-right">
                  <button className="btn btn-secondary btn-sm">
                    {" "}
                    <i className="fa fa-refresh" /> Programar{" "}
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

FormAutomatic.propTypes = {};

export default FormAutomatic;
