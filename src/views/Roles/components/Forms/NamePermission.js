import React from "react";

export default ({ id, info, handleFavourite }) => (
  <li className="" onClick={() => handleFavourite(id)}>
    {info.name}
  </li>
);
