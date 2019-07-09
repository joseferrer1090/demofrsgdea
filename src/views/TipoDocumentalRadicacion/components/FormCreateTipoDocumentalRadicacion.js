import React from "react";
import { Row, Col, CustomInput } from "reactstrap";
import TipoDocumentalRadicacion from "./Forms/TipoDocumentalRadicacion";

const FormCreateTipoTramite = props => {
  return (
    <div className="animated fadeIn">
      <div className="row">
        <TipoDocumentalRadicacion />
      </div>
    </div>
  );
};

export default FormCreateTipoTramite;
