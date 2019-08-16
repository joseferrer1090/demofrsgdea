import React, { Component } from "react";
import DepartamentoForm from './Forms/DepartamentoForm';
const dataDepartamento ={
  code:"",
  name:"",
  status:"",
  countryId:""
}
const FormCreateDepartamento = () => {
  return (
    <div className="animated fadeIn">
      <DepartamentoForm departamento={dataDepartamento}/>
    </div>
  );
};

export default FormCreateDepartamento;
