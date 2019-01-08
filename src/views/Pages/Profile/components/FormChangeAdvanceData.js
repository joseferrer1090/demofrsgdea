import React, { Component } from "react";
import { Card, Row, Col, CardBody, CardHeader } from "reactstrap";
class FormChangeAdvanceData extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="10" md={{ offset: 1 }}>
            <Card>
              <CardHeader> Datos adicionales</CardHeader>
              <CardBody>
                <div className="col-md-10 offset-1">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td> Sede </td>
                        <td> </td>
                      </tr>
                      <tr>
                        <td>Dependencia:</td>
                        <td> </td>
                      </tr>
                      <tr>
                        <td>Cargo:</td>
                        <td> </td>
                      </tr>
                      <tr>
                        <td>Roles</td>
                        <td> </td>
                      </tr>
                      <tr />
                      <tr>
                        <td>Permisos</td>
                        <td> </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default FormChangeAdvanceData;
