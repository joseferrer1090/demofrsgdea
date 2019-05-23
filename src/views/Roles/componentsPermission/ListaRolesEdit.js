import React from "react";
import Rol from "./PasarRolesEdit";


export default ({ data, addrol }) => {
  const roles = data.map((rol, e) => {
    return (
      <Rol
        id={rol.id}
        key={e}
        info={rol}
        handleaddrol={id => addrol(id)}
      />
    );
  });
  return (
  <div>
      <select
        multiple
        style={{
          width: "370px",
          marginLeft: "14px"
        }}
        className="form-control"
      >
        {roles}
      </select>
    </div>
  );
};

{/*<div>
      <select
        multiple
        style={{
          width: "310px",
          marginLeft: "14px"
        }}
        className="form-control"
      >
        {roles}
      </select>
    </div>
      */}
