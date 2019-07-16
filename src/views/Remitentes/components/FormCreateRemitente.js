import React from "react";
import RemitenteForm from './Forms/RemitenteForm';
const dataRemitenteForm = {
  tipoTercero: "",
  elementoComunicacion: "",
  pais:"",
  departamento:"",
  ciudad:"",
  identificacion:"",
  nombre: "",
  email: "",
  direccion:"",
  telefonoFijo: "",
  telefonoCelular:"",
  referencia: "",
  observacion:"",
  estado: ""
}
const FormCreateRemitente =()=>{
    return (
      <RemitenteForm remitenteForm={dataRemitenteForm}/>
    );
  }

export default FormCreateRemitente;
