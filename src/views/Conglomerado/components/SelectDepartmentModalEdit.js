import React, { useEffect, useState, useRef } from "react";
import { DEPARTMENTS_BY_COUNTRY } from "../../../services/EndPoints";

const FieldDepartment = ({
  field,
  form: { errors, touched, setFieldTouched, setFieldValue, values },
  ...props
}) => {
  const [dataDepartment, setDataDepartment] = useState([]);
  const [id, setid] = useState(props.conglomerate_country);
  const [auth, setauth] = useState(props.authorization);

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
      values.conglomerate_department = "";
      fetchNewValues(props.newValueCountryId);
    }
  };

  // useEffect(() => {
  //   console.log(`id = ${id}`)
  //   fetchNewValues();
  //   validateValues();
  // }, [props.newValueCountryId]);

  useEffect(() => {
    // if (props.conglomerate_country !== PreValue) {
    //   fetchNewValues(props.conglomerate_country);
    // }
    console.log(`useRef = ${PreValue !== props.conglomerate_country}`);
    console.log(
      `useChangeInValue = ${props.oldValueCountryId !==
        props.newValueCountryId}`
    );
    console.log(
      `preHook = ${PreValue} newHook = ${props.conglomerate_country}`
    );
    console.log(
      `preProp = ${props.oldValueCountryId} newProp = ${props.newValueCountryId}`
    );
    // console.log(`old = ${PreValue} new = ${props.conglomerate_country}`);
    // console.log(`id x estado = ${id}`);
    // console.log(`id x props = ${props.conglomerate_country} `);
  });

  const PreviousValues = value => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });

    return ref.current;
  };

  const PreValue = PreviousValues(props.conglomerate_country);

  const t = props.t;
  return (
    <div>
      {" "}
      <select
        onChange={e => setFieldValue("conglomerate_department", e.target.value)}
        onBlur={() => setFieldTouched("conglomerate_department", true)}
        className={`form-control form-control-sm ${errors.conglomerate_department &&
          touched.conglomerate_department &&
          "is-invalid"}`}
        value={values.conglomerate_department}
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
