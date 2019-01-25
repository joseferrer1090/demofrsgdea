import React from "react";
import Permiso from "./Permiso";

export default ({ data, filter, favourites, addFavourite }) => {
  const input = filter.toLowerCase();
  const names = data
    .filter((person, i) => {
      return (
        favourites.indexOf(person.id) === -1 &&
        !person.name.toLowerCase().indexOf(input)
      );
    })

    .map((person, i) => {
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
