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
import SingleField from "./Types/SingleField";
import SelectField from "./Types/SelectField";
import RadioButtons from "./Types/RadioButtons";
import CheckBoxes from "./Types/CheckBoxes";
import DataField from "./Types/DateField";
import Paragraph from "./Types/Paragraph";

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
