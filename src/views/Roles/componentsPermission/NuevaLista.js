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
        {hasFavourites ? "Your Shortlist" : "Click on a name to shortlist it.."}
      </h4>
      <ul>{favList}</ul>
      {hasFavourites && <hr />}
    </div>
  );
};
