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
        <div className="row">
          <div className="col-md-8 offset-md-2  ">
            <Card>
              <CardHeader> Datos adicionales</CardHeader>
              <CardBody>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <tbody>
                      <tr>
                        <td> Sede: </td>
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
                        <td>Roles:</td>
                        <td> </td>
                      </tr>
                      <tr>
                        <td>Permisos:</td>
                        <td> </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default FormChangeAdvanceData;
