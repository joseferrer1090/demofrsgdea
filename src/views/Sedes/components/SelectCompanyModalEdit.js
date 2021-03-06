import React, { useEffect, useState, useRef } from "react";
import { COMPANY_BY_CONGLOMERATE } from "../../../services/EndPoints";

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
    if (PreValue !== props.conglomerateId) {
      setDataCompany([]);
      if (PreValue !== undefined) {
        values.headquarter_company = "";
      }
      fetchNewValues(props.conglomerateId);
    }
  };

  useEffect(() => {
    validateValues();
  }, [props.companyId, props.conglomerateId]);

  const PreviousValues = value => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });

    return ref.current;
  };
  const PreValue = PreviousValues(props.conglomerateId);
  const t = props.t;
  return (
    <div>
      {" "}
      <select
        onChange={e => setFieldValue("headquarter_company", e.target.value)}
        onBlur={() => setFieldTouched("headquarter_company", true)}
        className={`form-control form-control-sm ${errors.headquarter_company &&
          touched.headquarter_company &&
          "is-invalid"}`}
        value={values.headquarter_company}
      >
        <option value={""}>
          -- {t("app_sedes_form_actualizar_select_empresa")} --
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
