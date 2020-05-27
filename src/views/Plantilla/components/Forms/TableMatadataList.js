import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { agregarMetadataAction } from "./../../../../actions/templateMetadataActions";
import { METADATA_ACTIVE } from "./../../../../services/EndPoints";
import "./../css/fixedTable.css";
import { withTranslation } from "react-i18next";

const TableMetadata = (props) => {
  const { t } = props;
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
        Authorization: "Bearer " + props.authorization,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(`Error => ${err.message}`);
      });
  };

  const handleSearchInput = (e) => {
    setTerm(e.target.value);
  };

  const searchMetadata = (term) => {
    return function (x) {
      return x.name.toLowerCase().includes(term);
    };
  };

  const dispatch = useDispatch();
  const AgregarMetadatoPlantilla = (metadato) =>
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
                name: aux.name,
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

  return (
    <div>
      {Object.keys(data) ? (
        <div className="animated fadeIn">
          <input
            type="search"
            className="form-control form-control-sm"
            placeholder={t("app_plantilla_form_registrar_placeholder_search")}
            value={term}
            onChange={(e) => {
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
                    <th>
                      {t(
                        "app_plantilla_form_registrar_card_table_metadatos_nombre"
                      )}
                    </th>
                    <th>
                      {t(
                        "app_plantilla_form_registrar_card_table_metadatos_asignar_plantilla"
                      )}
                    </th>
                  </tr>
                </thead>
                <tbody>{aux}</tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="animated fadeIn">
          <p className="text-center text-danger">
            {" "}
            {t("app_plantilla_form_registrar_alert_no_data")}
          </p>
        </div>
      )}
    </div>
  );
};

export default withTranslation("translations")(TableMetadata);
