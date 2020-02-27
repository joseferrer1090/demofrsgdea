import React, { useEffect, useState, useRef } from "react";
import { DEPARTMENTS_BY_COUNTRY } from "../../../services/EndPoints";

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
    if (PreValue !== props.countryId) {
      setDataDepartment([]);
      if (PreValue !== undefined) {
        values.company_department = "";
      }
      fetchNewValues(props.countryId);
    }
  };

  useEffect(() => {
    validateValues();
  }, [props.departmentId, props.countryId]);

  const PreviousValues = value => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });

    return ref.current;
  };
  const PreValue = PreviousValues(props.countryId);
  const t = props.t;
  return (
    <div>
      {" "}
      <select
        onChange={e => setFieldValue("company_department", e.target.value)}
        onBlur={() => setFieldTouched("company_department", true)}
        className={`form-control form-control-sm ${errors.company_department &&
          touched.company_department &&
          "is-invalid"}`}
        value={values.company_department}
      >
        <option value={""}>
          -- {t("app_empresa_modal_actualizar_select_departamento")} --
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
