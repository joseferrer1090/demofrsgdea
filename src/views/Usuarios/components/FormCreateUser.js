import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, CardHeader, CardBody, CardFooter } from "reactstrap";

class FormCreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="animated fadeIn">
        <div className="container">
          <Row>
            <Col sm="10" md={{ offset: 1 }}>
              <Card>
                <CardHeader> Registro de usuario </CardHeader>
                <CardBody>
                  <div className="row">
                    
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="float-right">
                    <button className="btn btn-secondary"> Registrar </button>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

FormCreateUser.propTypes = {};

export default FormCreateUser;
