import React from "react";

import Permiso from "./Permiso";

export default ({ favourites, data, deleteFavourite }) => {
  const hasFavourites = favourites.length > 0;
  const favList = favourites.map((fav, i) => {
    return (
      <Permiso
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
          ? "Permisos asignados"
          : "Haga clic en un permiso para agregarlos."}
      </h4>
      <ul>{favList}</ul>
      {hasFavourites && <hr />}
    </div>
  );
};
