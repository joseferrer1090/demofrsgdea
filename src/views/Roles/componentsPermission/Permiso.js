import React from "react";

export default ({ id, info, handleFavourite }) => (
  <li onClick={() => handleFavourite(id)}> {info.display_name}</li>
);
