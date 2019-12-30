import React from "react";
import PropTypes from "prop-types";
import { Row } from "reactstrap";
import SedesForm from "./Forms/SedesForm";

const dataSede = {
  conglomerateId: "",
  companyId: "",
  code: "",
  name: "",
  description: "",
  prefix: "",
  sequence: "",
  countryId: "",
  departmentId: "",
  cityId: "",
  address: "",
  phone: "",
  chargeId: "",
  status: ""
};
const FormCreateSedes = props => {
  return (
    <div className="animated fadeIn">
      <div className="container">
        <Row>
          <div className="col-md-8 offset-md-2">
            <SedesForm sede={dataSede} authorization={props.authorization} />
          </div>
        </Row>
      </div>
    </div>
  );
};

FormCreateSedes.propTypes = {
  sede: PropTypes.object.isRequired,
  authorization: PropTypes.string.isRequired
};

export default FormCreateSedes;
