import React, { Component } from "react";
import { Card, CardBody, CardFooter, Col, Row } from "reactstrap";

class FormChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-8 offset-2">
            <Row>
              <Col sm="12">
                <Card>
                  <CardBody>
                    <p className="text-center">
                      {" "}
                      Elige un contraseña unica para proteger tu cuenta <br />
                      <small>
                        {" "}
                        Escoge una contraseña que sea difícil de decifrar{" "}
                      </small>
                    </p>
                    <form className="form">
                      <div className="form-group">
                        <label>
                          {" "}
                          Contraseña actual{" "}
                          <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          className="form-control"
                          type="password"
                          placeholder=""
                        />
                      </div>
                      <div className="form-group">
                        <label>
                          {" "}
                          Nueva contraseña{" "}
                          <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          className="form-control"
                          type="password"
                          placeholder=""
                        />
                      </div>
                      <div className="form-group">
                        <label>
                          {" "}
                          Confirmar nueva contraseña{" "}
                          <span className="text-danger"> * </span>{" "}
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder=""
                        />
                      </div>
                    </form>
                  </CardBody>
                  <CardFooter>
                    <div className="float-right">
                      <button type="button" className="btn btn-secondary">
                        {" "}
                        <i className="fa fa-refresh" /> Actualizar contraseña{" "}
                      </button>
                    </div>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default FormChangePassword;
