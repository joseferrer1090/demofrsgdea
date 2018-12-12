import React, { Component } from "react";
import { Card, CardBody, CardFooter, CardHeader, Button } from "reactstrap";
import PropTypes from "prop-types";

class FormCreateConglomerado extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Card className="">
          <CardHeader>Registro de Conglomerado</CardHeader>
          <CardBody>
            <form className="form">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      {" "}
                      Dato1 <span className="text-danger">*</span>{" "}
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </CardBody>
          <CardFooter>
            <Button className="btn btn-secundary pull-right">
              <i className="fa fa-plus" /> Registrar{" "}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

FormCreateConglomerado.propTypes = {};

export default FormCreateConglomerado;
