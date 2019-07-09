import React from "react";
import { Row, Col, CustomInput } from "reactstrap";
import TipoDocumentalRadicacion from "./Forms/TipoDocumentalRadicacion";

const dataTipoDocumental = {
  tipo_correspondencia: "",
  codigo: "",
  nombre: "",
  descripcion: "",
  d_maximos_respuesta: "",
  estado: "",
  user_enabled: []
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

export default FormCreateTipoTramite;
