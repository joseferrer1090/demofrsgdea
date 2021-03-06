import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { agregarMetadataAction } from "./../../../../actions/templateMetadataActions";
import { METADATA_ACTIVE } from "./../../../../services/EndPoints";
import "./../css/fixedTable.css";

const TableMetadata = props => {
  const [data, setData] = useState([]);
  const [auth, setAuth] = useState("");
  const [term, setTerm] = useState("");

  useEffect(() => {
    setAuth(props.authorization);
    if (props.authorization !== "" || props.authorization !== auth) {
      getMetadataActive();
    }
  }, [props.authorization]);

  const getMetadataActive = () => {
    fetch(`${METADATA_ACTIVE}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.authorization
      }
    })
      .then(resp => resp.json())
      .then(data => {
        setData(data);
      })
      .catch(err => {
        console.log(`Error => ${err.message}`);
      });
  };

  const handleSearchInput = e => {
    setTerm(e.target.value);
  };

  const searchMetadata = term => {
    return function(x) {
      return x.name.toLowerCase().includes(term);
    };
  };

  const dispatch = useDispatch();
  const AgregarMetadatoPlantilla = metadato =>
    dispatch(agregarMetadataAction(metadato));

  const aux = data.filter(searchMetadata(term)).map((aux, id) => {
    return (
      <tr key={id}>
        <td style={{ display: "none" }}>{aux.id}</td>
        <td>{(id += 1)}</td>
        <td>{aux.name}</td>
        <td>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() =>
              AgregarMetadatoPlantilla({
                id: aux.id,
                defaultValue: "",
                formula: false,
                required: false,
                name: aux.name
              })
            }
          >
            {" "}
            <i className="fa fa-plus" />{" "}
          </button>
        </td>
      </tr>
    );
  });
  //   const [aux, setAux] = useState([]);
  //   const [datatable, setDataTable] = useState([]);
  //   useEffect(() => {
  //     if (props.data !== "" || props.data !== null) {
  //       setAux(props.data);
  //     }
  //     buildData(aux);
  //   }, [props, aux]);

  //   const buildData = () => {
  //     const data = aux.map((aux, id) => {
  //       return {
  //         id: aux.id,
  //         name: aux.name,
  //         value: "",
  //         formula: aux.formula,
  //         required: aux.status
  //       };
  //     });
  //     setDataTable(data);
  //   };
  return (
    <div>
      {Object.keys(data) ? (
        <div className="animated fadeIn">
          {/* <p className="text-center"> Hay datos para mostrar </p> */}
          <input
            type="search"
            className="form-control form-control-sm"
            placeholder={"Buscar metadato"}
            value={term}
            onChange={e => {
              handleSearchInput(e);
            }}
          />
          <br />
          <div className="tableFixHead">
            <div className="table-responseive">
              <table className="table table-striped">
                <thead className="thead-light">
                  <tr>
                    <th>#</th>
                    <th>Nombre del metadato</th>
                    <th>Asignar a plantilla</th>
                  </tr>
                </thead>
                <tbody>{aux}</tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="animated fadeIn">
          <p className="text-center text-danger"> No hay datos para mostrar</p>
        </div>
      )}
    </div>
  );
};

export default TableMetadata;
