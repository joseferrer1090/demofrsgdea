import React from "react";

import Rol from "./Roles";

export default ({ data, filter, favouritesroles, addFavourite }) => {
  const input = "";
  const roles = data.map((rol, i) => {
    return (
      <Rol id={i} key={i} info={rol} handleFavourite={id => addFavourite(id)} />
    );
  });
  return (
    <div>
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
  );
};
