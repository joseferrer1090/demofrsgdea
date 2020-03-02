import React, { useEffect, useState, useRef } from "react";
import { DEPENDENCIES_BY_HEADQUARTER } from "../../../../../services/EndPoints";

const FieldDependence = ({
  field,
  form: { errors, touched, setFieldTouched, setFieldValue, values },
  ...props
}) => {
  const [dataDependence, setDataDependece] = useState([]);
  const fetchNewValues = id => {
    fetch(`${DEPENDENCIES_BY_HEADQUARTER}${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.authorization
      }
    })
      .then(response => response.json())
      .then(data => {
        setDataDependece(data);
      })
      .catch(err => {
        console.log("Error", err);
        setDataDependece([]);
      });
  };

  const validateValues = () => {
    if (
      PREValueConglomerate !== props.conglomerateId ||
      PREValueCompany !== props.companyId
    ) {
      setDataDependece([]);
    }
    if (PREValue !== props.sedeId) {
      setDataDependece([]);
      values.dependencia = "";
      fetchNewValues(props.sedeId);
    }
  };

  useEffect(() => {
    validateValues();
  }, [props.sedeId, props.conglomerateId, props.companyId]);

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

  const PREValue = usePrevious(props.sedeId);
  const PREValueConglomerate = usePrevious(props.conglomerateId);
  const PREValueCompany = usePrevious(props.companyId);
  const t = props.t;
  return (
    <div>
      {" "}
      <select
        onChange={e => setFieldValue("dependencia", e.target.value)}
        onBlur={e => setFieldTouched("dependencia", true)}
        className={`form-control form-control-sm ${errors.dependencia &&
          touched.dependencia &&
          "is-invalid"}`}
      >
        <option value={""}>
          -- {t("app_tipoTramite_form_registrar_select_sede")} --
        </option>
        {dataDependence === []
          ? null
          : dataDependence.map((aux, id) => {
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
export default FieldDependence;
