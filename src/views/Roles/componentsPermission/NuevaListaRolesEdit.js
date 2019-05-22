import React from "react";
import Rol from "./PasarRolesEdit";

export default ({ dataroles, data, deleterol }) => {
  const favRol = dataroles.map((rol, i) => {
    return (
      <Rol
        id={rol.id}
        key={i}
        info={data[rol]}
        handleaddrol={id => deleterol(id)}
      />
    );
  });
  return (
    <div>
      <select
        multiple
        className="form-control"
        disabled
        style={{
          width: "370px",
          marginRight: "10px"
        }}
      >
        {favRol}
      </select>
    </div>
  );
};
