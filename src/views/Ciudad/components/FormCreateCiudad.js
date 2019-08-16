import React  from "react";
import CiudadForm from './Forms/CiudadForm';
const dataCiudad ={
  countryId:"",
  departmentId:"",
  code:"",
  name:"",
  status:""
}
const  FormCreateCiudad =()=>{
    return (
      <div className="animated fadeIn">
        <CiudadForm ciudad={dataCiudad}/>
      </div>
    );
};
export default FormCreateCiudad;
