import React from "react";
import CreateThemeForm from './Forms/CreateThemeForm';

const dataTheme={
  codigo: "",
  nombre: "",
  estado: "",
  aplicarTema:""
}
const FormCreateTheme=()=>{
  return(
    <div className="animated fadeIn">
      <CreateThemeForm theme={dataTheme}/>
    </div>
  );
}

export default FormCreateTheme;
