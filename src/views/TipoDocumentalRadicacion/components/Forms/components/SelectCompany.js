import React, { useEffect, useState } from "react";
import { COMPANY_BY_CONGLOMERATE } from "../../../../../services/EndPoints";

const FieldCompany = ({
  field,
  form: { errors, touched, setFieldTouched, setFieldValue, values },
  ...props
}) => {
  const [dataCompany, setDataCompany] = useState([]);
  const fetchNewValues = id => {
    fetch(`${COMPANY_BY_CONGLOMERATE}${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.authorization
      }
    })
      .then(response => response.json())
      .then(data => {
        setDataCompany(data);
      })
      .catch(err => {
        console.log("Error", err);
        setDataCompany([]);
      });
  };

  const validateValues = () => {
    if (props.oldValueConglomerateId !== props.newValueConglomerateId) {
      setDataCompany([]);
      values.empresa = "";
      fetchNewValues(props.newValueConglomerateId);
    } else if (props.conglomerado === "") {
      setDataCompany([]);
      values.empresa = "";
    }
  };

  useEffect(() => {
    validateValues();
  }, [props.newValueConglomerateId, props.conglomerado]);

  const t = props.t;
  return (
    <div>
      {" "}
      <select
        onChange={e => setFieldValue("empresa", e.target.value)}
        onBlur={e => setFieldTouched("empresa", true)}
        className={`form-control form-control-sm ${errors.empresa &&
          touched.empresa &&
          "is-invalid"}`}
      >
        <option value={""}>
          -- {t("app_documentalRadicacion_form_registrar_select_empresa")} --
        </option>
        {dataCompany.map((aux, id) => {
          return (
            <option key={id} value={aux.id}>
              {aux.name}
            </option>
          );
        })}
      </select>{" "}
    </div>
  );
};

export default FieldCompany;
