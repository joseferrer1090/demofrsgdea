import React  from "react";
import FormPais from "./Forms/FormPais";
const dataPais ={
  code:"",
  name:"",
  status:""
}
const FormCreatePais =()=>{
  return (
    <div className="animated fadeIn">
      <FormPais pais={dataPais}/>
    </div>
  );
}

export default FormCreatePais;
