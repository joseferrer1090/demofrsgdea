import React from "react";

import Name from "./Name";
import "./../../../css/custom_roles.css";

export default ({ data, filter, favourites, addFavourite }) => {
  const input = filter.toLowerCase();

  const names = data.map((aux, i) => {
    return (
      <Name
        id={aux.id}
        key={i}
        info={aux}
        handleFavourite={id => addFavourite(id)}
      />
    );
  });
  return <ul className="list-roles">{names}</ul>;
};
