import React from "react";
import { Row, Col, CustomInput } from "reactstrap";
import PropTypes from "prop-types";
import TipoTramiteForm from "./Forms/TipoTramiteForm";

const FormCreateTipoTramite = () => {
  return (
    <div className="animated fadeIn">
      <div className="row">
        <TipoTramiteForm />
      </div>
    </div>
  );
};

export default FormCreateTipoTramite;
