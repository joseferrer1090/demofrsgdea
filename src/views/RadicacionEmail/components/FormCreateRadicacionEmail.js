import React from "react";
import RadicacionEmailForm from "./Forms/RadicacionEmailForm";

const dataRadicacionEmail = {
  protocolo: "",
  host: "",
  puerto: "",
  email: "",
  password: "",
  status: ""
};

const FormCreateRadicacionEmail = props => {
  const { authorization } = props;
  return (
    <div className="animated fadeIn">
      <RadicacionEmailForm
        radicacionemail={dataRadicacionEmail}
        authorization={authorization}
      />
    </div>
  );
};

FormCreateRadicacionEmail.propType = {};

export default FormCreateRadicacionEmail;
