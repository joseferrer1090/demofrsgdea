import React, { useState, useEffect } from "react";
import NamePermission from "./NamePermission";

export default ({ favourites, data, deleteFavourite }) => {
  const hasFavourites = favourites.length > 0;
  const favList = favourites.map((fav, i) => {
    return (
      <NamePermission
        id={i}
        key={i}
        info={data}
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
