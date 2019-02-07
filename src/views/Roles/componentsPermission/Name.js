import React from "react";

export default ({ id, info, handleFavourite }) => (
  <li className={info.sex} onClick={() => handleFavourite(id)}>
    {" "}
    {info.name}{" "}
  </li>
);
