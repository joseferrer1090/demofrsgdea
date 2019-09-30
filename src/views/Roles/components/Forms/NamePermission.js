import React from "react";

export default ({ id, info, handleFavourite }) => (
  <li className="" onClick={() => handleFavourite(id)} key={id}>
    {info.name} - {info.id}
  </li>
);
