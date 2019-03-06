import React from "react";

import Rol from "./Roles";

export default ({ favourites, data, deleteFavourite }) => {
  //   const hasFavorites = favourites.length > 0;
  const favRol = favourites.map((rol, i) => {
    return (
      <Rol
        id={rol.id}
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
