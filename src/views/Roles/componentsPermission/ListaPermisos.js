import React from "react";
import Permiso from "./Permiso";

export default ({ data, permiso, addPermiso }) => {
  const auxilar = data.map((permiso, i) => {
    return (
      <Permiso
        id={permiso.id}
        key={i}
        name={permiso.name}
        display_name={permiso.display_name}
        handleAssignedPermiso={id => {
          addPermiso(id);
        }}
      />
    );
  });

  return <ul>{auxilar}</ul>;
};
