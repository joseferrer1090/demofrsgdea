import React, { useEffect, useState, useRef } from "react";
import { DEPARTMENTS_BY_COUNTRY } from "../../../../../services/EndPoints";

const FieldDepartment = ({
  field,
  form: { errors, touched, setFieldTouched, setFieldValue, values },
  ...props
}) => {
  const [dataDepartment, setDataDepartment] = useState([]);
  const fetchNewValues = id => {
    fetch(`${DEPARTMENTS_BY_COUNTRY}${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.authorization
      }
    })
      .then(response => response.json())
      .then(data => {
        setDataDepartment(data);
      })
      .catch(err => {
        console.log("Error", err);
        setDataDepartment([]);
      });
  };

  const validateValues = () => {
    if (props.oldValueCountryId !== props.newValueCountryId) {
      setDataDepartment([]);
      values.departamento = "";
      fetchNewValues(props.newValueCountryId);
    } else if (props.pais) {
      setDataDepartment([]);
      values.departamento = "";
    }
  };

  useEffect(() => {
    validateValues();
  }, [props.newValueCountryId, props.pais]);

  const t = props.t;
  return (
    <div>
      {" "}
      <select
        onChange={e => setFieldValue("departamento", e.target.value)}
        onBlur={e => setFieldTouched("departamento", true)}
        className={`form-control form-control-sm ${errors.departamento &&
          touched.departamento &&
          "is-invalid"}`}
      >
        <option value={""}>
          -- {t("app_conglomerado_form_select_departamento")} --
        </option>
        {dataDepartment.map((aux, id) => {
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

export default FieldDepartment;
