import React, { Component } from "react";
import AutomaticoForm from './Forms/AutomaticoForm/AutomaticoForm';

const dataAutomaticoForm ={
  operacion:"",
  modulo:"",
  entidad:"",
  accion:"",
  fechaDesde:"",
  fechaHasta:"",
  periodo:"",
  hora:"",
  diaMes: "",
  diaSemana:"",
  mes:"",
  inputsCondition:"",
  selectNotification:"",
  days:"",
  hours:"",
}
const FormAutomatic = ()=> {
  return (
    <div className="animated fadeIn">
      <AutomaticoForm auditoriaMHAutomaticoForm={dataAutomaticoForm}/>
    </div>
  );
}


export default FormAutomatic;
