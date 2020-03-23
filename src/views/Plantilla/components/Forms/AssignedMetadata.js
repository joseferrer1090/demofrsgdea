import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { eliminarMetadataAction } from "./../../../../actions/templateMetadataActions";

const AssignedMetadata = props => {
  const [data, setData] = React.useState([]);
  const dispatch = useDispatch();
  const eliminar = id => dispatch(eliminarMetadataAction(id));

  React.useEffect(() => {
    setData(props.data);
  }, [props.data]);

  return (
    <div className="animation fadeIn">
      <div className="table-responseive">
        {data.length ? (
          <div className="animated fadeIn">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre metadado</th>
                  <th scope="col">Accion</th>
                </tr>
              </thead>
              <tbody>
                {data.map((aux, id) => {
                  return (
                    <tr key={id}>
                      <th scope="row">{(id += 1)}</th>
                      <td>{aux.name}</td>
                      <td>
                        <button
                          type={"button"}
                          className="btn btn-danger btn-sm"
                          onClick={() => eliminar({ id: aux.id })}
                        >
                          {" "}
                          <i className="fa fa-trash" />{" "}
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {/* <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                </tr> */}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="animated fadeIn">
            <div className="text-center">
              <p className="alert alert-danger">
                <i className="fa fa-exclamation-triangle" /> No hay datos para
                la asociacion
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignedMetadata;
