import React, { Component } from "react";
import DepartamentoForm from './Forms/DepartamentoForm';
const dataDepartamento ={
  codigo:"",
  nombre:"",
  estado:"",
  pais:""
}
const FormCreateDepartamento = () => {
  return (
    <div className="animated fadeIn">
      <DepartamentoForm departamento={dataDepartamento}/>
    </div>
  );
};

export default FormCreateDepartamento;
