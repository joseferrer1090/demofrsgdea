import React from "react";

export default ({
  id, // identificador
  info, // objeto para la informacion
  handleFavourite // metodo click para pasar
}) => <option onClick={() => handleFavourite(id)}>{info.display_name}</option>;
