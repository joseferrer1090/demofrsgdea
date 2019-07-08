import React, { Component } from "react";
import CiudadForm from './Form/CiudadForm';
const dataCiudad ={
  pais:"",
  departamento:"",
  codigo:"",
  nombre:"",
  estado:""
}
const  FormCreateCiudad =()=>{
    return (
      <div className="animated fadeIn">
        <CiudadForm ciudad={dataCiudad}/>
      </div>
    );
};
export default FormCreateCiudad;
