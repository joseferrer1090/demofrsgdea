import React from "react";

export default ({
  id, // identificador
  info, // objeto para la informacion
  handleaddrol // metodo click para pasar
}) => (
  <option onClick={() => handleaddrol(id)}>
    {info.id}-{info.display_name}
  </option>
);
