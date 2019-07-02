import React from "react";
import ConglomeradoForm from "./Forms/ConglomeradoForm";

const dataConglomerado = {
  codigo: "",
  nombre: "",
  descripcion: "",
  estado: ""
};

const FormCreateConglomerado = props => {
  return (
    <div className="anitmated fadeIn">
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <ConglomeradoForm conglomerado={dataConglomerado} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCreateConglomerado;
