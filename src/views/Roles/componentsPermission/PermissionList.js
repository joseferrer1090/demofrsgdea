import React from "react";
import Permiso from "./Permission";
import data from "./../../../data/data.json";
import { Card } from "reactstrap";

const PermissionList = () => {
  const permisos = data.map((p, i) => {
    return (
      <div key={i}>
        <span className="badge badge-secondary"> {p.display_name} </span>
      </div>
    );
  });

  return (
    <div>
      <Card>{permisos}</Card>
    </div>
  );
};

export default PermissionList;
