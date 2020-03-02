import React, { useEffect, useState, useRef } from "react";
import { HEADQUARTER_BY_COMPANY } from "../../../services/EndPoints";

const FieldHeadquarter = ({
  field,
  form: { errors, touched, setFieldTouched, setFieldValue, values },
  ...props
}) => {
  const [dataHeadquarter, setDataHeadquarter] = useState([]);
  const fetchNewValues = id => {
    fetch(`${HEADQUARTER_BY_COMPANY}${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.authorization
      }
    })
      .then(response => response.json())
      .then(data => {
        setDataHeadquarter(data);
      })
      .catch(err => {
        console.log("Error", err);
        setDataHeadquarter([]);
      });
  };

  const validateValues = () => {
    if (PREValueConglomerate !== props.conglomerateId) {
      setDataHeadquarter([]);
    }
    if (PREValue !== props.companyId) {
      setDataHeadquarter([]);
      if (PREValue !== "") {
        values.sede = "";
      }
      fetchNewValues(props.companyId);
    }
  };

  useEffect(() => {
    validateValues();
  }, [props.companyId, props.headquarterId, props.conglomerateId]);

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

  const PREValue = usePrevious(props.companyId);
  const PREValueConglomerate = usePrevious(props.conglomerateId);
  const t = props.t;
  return (
    <div>
      {" "}
      <select
        onChange={e => setFieldValue("sede", e.target.value)}
        onBlur={e => setFieldTouched("sede", true)}
        className={`form-control form-control-sm ${errors.sede &&
          touched.sede &&
          "is-invalid"}`}
        value={values.sede}
      >
        <option value={""}>
          -- {t("app_grupoUsuarios_modal_editar_select_sede")} --
        </option>
        {dataHeadquarter === []
          ? null
          : dataHeadquarter.map((aux, id) => {
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
export default FieldHeadquarter;
