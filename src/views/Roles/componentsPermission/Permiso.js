import React from "react";

export default ({ id, name, display_name, handleAssignedPermiso }) => (
  <li className="" onClick={() => handleAssignedPermiso(id)}>
    {display_name}
  </li>
);
