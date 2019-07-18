import React from "react";
import TipoTercerosForm from './Forms/TipoTercerosForm';

const dataTipoTercerosForm ={
  codigo:"",
  nombre:"",
  estado:""
}

const  FormCreateTipoTercero =()=>{
    return (
      <TipoTercerosForm TipoTercerosForm={dataTipoTercerosForm}/>
    );
}


export default FormCreateTipoTercero;
