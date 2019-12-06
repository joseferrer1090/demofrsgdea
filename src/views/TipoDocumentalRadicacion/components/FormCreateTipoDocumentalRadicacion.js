import React from "react";
import TipoDocumentalRadicacion from "./Forms/TipoDocumentalRadicacion";
import PropTypes from "prop-types";

const dataTipoDocumental = {
  tipo_correspondencia: "",
  codigo: "",
  nombre: "",
  descripcion: "",
  d_maximos_respuesta: "",
  estado: "",
  user_enabled: [],
  workflow: "",
  plantilla: "",
  asunto: ""
};

const FormCreateTipoTramite = props => {
  return (
    <div className="animated fadeIn">
      <div className="row">
        <TipoDocumentalRadicacion tdocumentalradicacion={dataTipoDocumental} />
      </div>
    </div>
  );
};

FormCreateTipoTramite.propTypes = {
  tdocumentalradicacion: PropTypes.object.isRequired
};

export default FormCreateTipoTramite;
