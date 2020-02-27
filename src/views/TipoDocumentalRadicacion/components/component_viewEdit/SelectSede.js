import React, { useEffect, useState, useRef } from "react";
import { HEADQUARTER_BY_COMPANY } from "../../../../services/EndPoints";

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
  }, [props.companyId, props.headquarterId]);

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
          -- {t("app_tipoTramite_form_registrar_select_sede")} --
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

// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { HEADQUARTER_BY_COMPANY } from "./../../../../services/EndPoints";

// class SelectSede extends Component {
//   state = {
//     dataSede: [],
//     id: this.props.idEmpresa,
//     t: this.props.t,
//     auth: this.props.authorization
//   };

//   static getDerivedStateFromProps(props, state) {
//     if (props.idEmpresa !== state.id) {
//       return {
//         id: props.idEmpresa
//       };
//     }
//     if (props.authorization !== state.auth) {
//       return {
//         auth: props.authorization
//       };
//     }
//     return null;
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.props.idEmpresa !== prevProps.idEmpresa) {
//       // METODO
//       this.getDataSede();
//     }
//     if (this.props.authorization !== prevProps.authorization) {
//       this.setState({
//         auth: this.props.authorization,
//         id: this.props.idEmpresa
//       });
//     }
//   }

//   getDataSede = () => {
//     fetch(`${HEADQUARTER_BY_COMPANY}${this.state.id}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + this.props.authorization
//       }
//     })
//       .then(response => response.json())
//       .then(data => {
//         this.setState({
//           dataSede: data
//         });
//       })
//       .catch(err => console.log(`err => ${err}`));
//   };

//   render() {
//     const { t } = this.props;
//     return (
//       <div>
//         <select
//           name={this.props.name}
//           value={this.props.value}
//           onChange={this.props.onChange}
//           onBlur={this.props.onBlur}
//           className={this.props.className}
//         >
//           <option>
//             -- {t("app_documentalRadicacion_actualizar_placeholder_sede")} --
//             {/* -- {t("app_tipoTramite_form_registrar_select_sede")} -- */}
//           </option>
//           {this.state.dataSede.map((aux, id) => {
//             return (
//               <option key={id} value={aux.id}>
//                 {aux.name}
//               </option>
//             );
//           })}
//         </select>
//       </div>
//     );
//   }
// }

// SelectSede.propTypes = {
//   t: PropTypes.any,
//   idEmpresa: PropTypes.string.isRequired,
//   authorization: PropTypes.string.isRequired
// };

// export default SelectSede;
