import React, { useEffect, useState, useRef } from "react";
import { COMPANY_BY_CONGLOMERATE } from "../../../../services/EndPoints";
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
        values.empresa = "";
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
        onChange={e => setFieldValue("empresa", e.target.value)}
        onBlur={() => setFieldTouched("empresa", true)}
        className={`form-control form-control-sm ${errors.empresa &&
          touched.empresa &&
          "is-invalid"}`}
        value={values.empresa}
      >
        <option value={""}>
          -- {t("app_tipoTramite_form_registrar_select_empresa")} --
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

// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { COMPANY_BY_CONGLOMERATE } from "./../../../../services/EndPoints";

// class SelectEmpresa extends Component {
//   state = {
//     dataEmpresa: [],
//     id: this.props.idConglomerado,
//     t: this.props.t,
//     auth: this.props.authorization
//   };

//   static getDerivedStateFromProps(props, state) {
//     if (props.authorization !== state.auth) {
//       return {
//         auth: props.authorization
//       };
//     }
//     if (props.idConglomerado !== state.id) {
//       return {
//         id: props.idConglomerado
//       };
//     }
//     return null;
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.props.idConglomerado !== prevProps.idConglomerado) {
//       // METODO
//       this.getDataEmpresa();
//     }
//     if (this.props.authorization !== prevProps.authorization) {
//       this.setState({
//         auth: this.props.authorization,
//         id: this.props.idConglomerado
//       });
//     }
//   }

//   getDataEmpresa = () => {
//     fetch(`${COMPANY_BY_CONGLOMERATE}${this.state.id}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + this.props.authorization
//       }
//     })
//       .then(response => response.json())
//       .then(data => {
//         this.setState({
//           dataEmpresa: data
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
//           <option value={" "}>
//             {" "}
//             -- {t("app_documentalRadicacion_actualizar_placeholder_empresa")} --
//             {/* -- {t("app_tipoTramite_form_registrar_select_empresa")} --{" "} */}
//           </option>
//           {this.state.dataEmpresa.map((aux, id) => {
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

// SelectEmpresa.propTypes = {
//   t: PropTypes.any,
//   authorization: PropTypes.string.isRequired,
//   idConglomerado: PropTypes.string.isRequired
// };

// export default SelectEmpresa;
