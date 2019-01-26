import React from "react";
import Permiso from "./Permiso";

export default ({ data, filter, favourites, addFavourite }) => {
  const names = data.map((person, i) => {
    return (
      <Permiso
        id={person.id}
        key={i}
        info={person}
        handleFavourite={id => addFavourite(id)}
      />
    );
  });
  return <ul>{names}</ul>;
};
