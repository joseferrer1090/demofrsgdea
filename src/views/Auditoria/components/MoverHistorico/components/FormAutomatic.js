import React, { Component } from "react";
import AutomaticoForm from './Forms/AutomaticoFrom';

const dataAutomaticoForm ={
  operacion:"",
  modulo:"",
  entidad:"",
  accion:"",
  fechaDesde:"",
  fechaHasta:""

}
const FormAutomatic = ()=> {
  return (
    <div className="animated fadeIn">
      <AutomaticoForm auditoriaMHAutomaticoForm={dataAutomaticoForm}/>
    </div>
  );
}


export default FormAutomatic;
