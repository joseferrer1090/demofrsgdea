import React from "react";

import Name from "./Name";

export default ({ favourites, data, deleteFavourite }) => {
  const hasFavourites = favourites.length > 0;
  const favList = favourites.map((fav, i) => {
    return (
      <Name
        id={i}
        key={i}
        info={data[fav]}
        handleFavourite={id => deleteFavourite(id)}
      />
    );
  });
  return (
    <div className="favourites">
      <h4>
        {hasFavourites
          ? "Roles asignados"
          : "Seleccione los roles para el usuario."}
      </h4>
      <ul>{favList}</ul>
      {hasFavourites && <hr />}
    </div>
  );
};
