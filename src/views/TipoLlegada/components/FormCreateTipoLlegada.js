import React from "react";
import TipoLlegadaForm from "./Forms/TipoLlegadaForm";
const dataTipollegada = {
  codigo: "",
  nombre: "",
  decripcion: "",
  estado: ""
};
const FormCreateTipoLlegada = () => {
  return (
    <div className="animated fadeIn">
      <TipoLlegadaForm tipollegada={dataTipollegada} />
    </div>
  );
};

export default FormCreateTipoLlegada;
