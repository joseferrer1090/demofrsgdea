import React from "react";
import TipoDocumentalRadicacion from "./Forms/TipoDocumentalRadicacion";
import PropTypes from "prop-types";

const FormCreateTipoTramite = props => {
  console.log(props);
  return (
    <div className="animated fadeIn">
      <div className="row">
        <TipoDocumentalRadicacion />
      </div>
    </div>
  );
};

FormCreateTipoTramite.propTypes = {
  authorization: PropTypes.string.isRequired
};

export default FormCreateTipoTramite;
