import React, { useState, useEffect } from "react";

const TableMetadata = props => {
  const [aux, setAux] = useState([]);
  const [datatable, setDataTable] = useState([]);

  useEffect(() => {
    if (props.data !== "" || props.data !== null) {
      setAux(props.data);
    }
    buildData(aux);
  }, [props, aux]);

  const buildData = () => {
    const data = aux.map((aux, id) => {
      return {
        id: aux.id,
        name: aux.name,
        value: "",
        formula: aux.formula,
        required: aux.status
      };
    });
    setDataTable(data);
  };

  return (
    <div>
      {/* <p>Probando</p> */}
      {datatable.map((aux, id) => {
        return (
          <div>
            <p>
              {(id += 1)} - {aux.name} -{" "}
              {aux.formula ? "asignado a formula" : "no asignado formula"} -{" "}
              {aux.required ? "requerido" : "no requerido"}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default TableMetadata;
