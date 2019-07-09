import React, { Component } from "react";
import ManualForm from './Forms/ManualForm';

const dataManualForm ={
  operacion:"",
  modulo:"",
  entidad:"",
  accion:"",
  fechaDesde:"",
  fechaHasta:""
}
const FormManual =()=>{
   return (
    <div className="animated fadeIn">
      <ManualForm auditoriaMHManualForm={dataManualForm}/>
    </div>
  );
}

export default FormManual;
