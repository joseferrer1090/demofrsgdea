import React from "react";
import "./../../../css/custom_roles.css";

export default ({ id, info, handleFavourite }) => (
  <li className="list-item-roles" onClick={() => handleFavourite(id)}>
    <div className="badge badge-light">{info.name}</div>
  </li>
);
