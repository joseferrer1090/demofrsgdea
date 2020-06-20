import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eliminarMetadataAction } from "./../../../../actions/templateMetadataActions";
import { Alert } from "reactstrap";
import { withTranslation } from "react-i18next";

const AssignedMetadata = (props) => {
  const { t } = props;
  const err = useSelector((state) => state.templateMetadata.error);
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState();

  const dispatch = useDispatch();
  const eliminar = (id) => dispatch(eliminarMetadataAction(id));
  const mounted = useRef(false);

  // Validand el porps que viene del padre y el componenDidUpdate
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (props.data !== undefined || props.data !== null) {
        setData(props.data);
      }
    }
    setError(err);
  }, [props.data, err]);
  // React.useEffect(() => {
  //   if (props.data !== undefined || props.data !== null) {
  //     setData(props.data);
  //   }
  //   setError(err);
  // }, [props.data, err]);
  return (
    <div className="animation fadeIn">
      <Alert color={"danger"} isOpen={error} toggle={() => setError(false)}>
        <i className="fa fa-exclamation-triangle" />{" "}
        {t("app_plantilla_form_registrar_table_metadatos_alert_duplicado")}
      </Alert>
      <div className="table-responsive">
        {Object.keys(data).length ? (
          <div className="animated fadeIn">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">
                    {t("app_plantilla_form_registrar_table_metadatos_nombre")}
                  </th>
                  <th scope="col">
                    {t("app_plantilla_form_registrar_table_metadatos_accion")}
                  </th>
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
              </tbody>
            </table>
          </div>
        ) : (
          <div className="animated fadeIn">
            <div className="text-center">
              <p className="alert alert-danger">
                <i className="fa fa-exclamation-triangle" />{" "}
                {t(
                  "app_plantilla_form_registrar_table_metadatos_alert_no_data"
                )}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default withTranslation("translations")(AssignedMetadata);
