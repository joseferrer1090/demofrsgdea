import React  from "react";
import CiudadForm from './Forms/CiudadForm';
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
