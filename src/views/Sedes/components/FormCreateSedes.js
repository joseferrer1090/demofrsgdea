import React from "react";
import PropTypes from "prop-types";
import { Row } from "reactstrap";
import SedesForm from "./Forms/SedesForm";

const FormCreateSedes = () => {
  return (
    <div className="animated fadeIn">
      <div className="container">
        <Row>
          <div className="col-md-8 offset-md-2">
            <SedesForm />
          </div>
        </Row>
      </div>
    </div>
  );
};

FormCreateSedes.propTypes = {};

export default FormCreateSedes;
