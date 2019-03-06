import React from "react";

import Rol from "./Roles";

export default ({ favouritesroles, data, deleteFavourite }) => {
  const hasFavourites = favouritesroles.length > 0;
  const favRol = favouritesroles.map((rol, i) => {
    return (
      <Rol
        id={i}
        key={i}
        info={data[rol]}
        handleFavourite={id => deleteFavourite(id)}
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
          width: "310px",
          marginRight: "10px"
        }}
      >
        {favRol}
      </select>
    </div>
  );
};
