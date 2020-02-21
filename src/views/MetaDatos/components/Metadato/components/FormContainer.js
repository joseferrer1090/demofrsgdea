import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardLink,
  CardTitle,
  CardSubtitle,
  CardHeader,
  CardFooter,
  Button
} from "reactstrap";

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <Card>
            <CardHeader>
              <i className="fa fa-code" /> Bolsa de metadatos
            </CardHeader>
            <CardBody>
              <div className="row">
                <div className="col-md-12">
                  <Card body outline color={"primary"}>
                    <p>DROP</p>
                  </Card>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default FormContainer;
