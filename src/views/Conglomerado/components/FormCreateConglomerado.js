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
        <Card className="border-success">
          <CardHeader>Registro de Conglomerado</CardHeader>
          <CardBody>
            <p>Fomulario de Registro con los datos</p>
          </CardBody>
          <CardFooter>
            <Button className="btn btn-secundary pull-right">
              {" "}
              Registrar{" "}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

FormCreateConglomerado.propTypes = {};

export default FormCreateConglomerado;
