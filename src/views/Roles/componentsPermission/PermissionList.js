import React from "react";
import Permission from "./Permission";

export default ({ data, addPermssionAssigned, permissions }) => {
  const permissions = data.map((permi, id) => {
    return (
      <Permission
        id={permi.id}
        info={permi.display_name}
        name={permi.name}
        handleAddPermission={id => addPermssionAssigned(id)}
      />
    );
  });

  return <ul>{permissions}</ul>;
};
