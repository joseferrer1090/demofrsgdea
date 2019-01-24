import React from "react";

export default ({ id, info, name, handleAddPermission }) => (
  <li
    onClick={() => {
      this.handlePermission(id);
    }}
  >
    {info.name}
  </li>
);
