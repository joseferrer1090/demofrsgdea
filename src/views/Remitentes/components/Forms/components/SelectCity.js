import React, { useEffect, useState, useRef } from "react";
import { CITIES_BY_DEPARTMENT } from "../../../../../services/EndPoints";

const FieldCity = ({
  field,
  form: { errors, touched, setFieldTouched, setFieldValue, values },
  ...props
}) => {
  const [dataCity, setDataCity] = useState([]);
  const fetchNewValues = id => {
    fetch(`${CITIES_BY_DEPARTMENT}${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.authorization
      }
    })
      .then(response => response.json())
      .then(data => {
        setDataCity(data);
      })
      .catch(err => {
        console.log("Error", err);
        setDataCity([]);
      });
  };

  const validateValues = () => {
    if (PREValue !== props.departmentId) {
      setDataCity([]);
      values.ciudad = "";
      fetchNewValues(props.departmentId);
    }
  };

  useEffect(() => {
    validateValues();
  }, [props.departmentId]);

  const usePrevious = value => {
    let valueRef;
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    if (ref.current !== undefined) {
      valueRef = ref.current;
    } else {
      valueRef = "";
    }
    return valueRef;
  };

  const PREValue = usePrevious(props.departmentId);
  const t = props.t;
  return (
    <div>
      {" "}
      <select
        onChange={e => setFieldValue("ciudad", e.target.value)}
        onBlur={e => setFieldTouched("ciudad", true)}
        className={`form-control form-control-sm ${errors.ciudad &&
          touched.ciudad &&
          "is-invalid"}`}
      >
        <option value={""}>
          -- {t("app_conglomerado_form_select_ciudad")} --
        </option>
        {dataCity === []
          ? null
          : dataCity.map((aux, id) => {
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
export default FieldCity;
