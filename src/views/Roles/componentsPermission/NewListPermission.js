import React from "react";

import Permission from "./Permission";

export default ({ permissions, data, deletePermission }) => {
  const hasPermissions = permissions.length > 0;
  const favPermissions = permissions.map((per, i) => {
    return (
      <Permission
        id={i}
        key={i}
        info={data[]}
        handleAddPermission={id => deletePermissionAssigned(id)}
      />
    );
  });
  return (
    <div>
        <p> Probandito aqui va cada uno de los nuevo valores  </p>
    </div>
  );
};
