import React from "react";
import TipoTercerosForm from './Forms/TipoTercerosForm';

const dataTipoTercerosForm ={
  code:"",
  name:"",
  status:"",
  description:""
}

const  FormCreateTipoTercero =()=>{
    return (
      <TipoTercerosForm TipoTercerosForm={dataTipoTercerosForm}/>
    );
}


export default FormCreateTipoTercero;
