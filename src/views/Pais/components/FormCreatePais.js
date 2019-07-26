import React  from "react";
import FormPais from "./Forms/FormPais";
const dataPais ={
  codigo:"",
  nombre:"",
  estado:""
}
const FormCreatePais =()=>{
  return (
    <div className="animated fadeIn">
      <FormPais pais={dataPais}/>
    </div>
  );
}

export default FormCreatePais;
