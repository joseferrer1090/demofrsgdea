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
      values.empresaID = "";
      fetchNewValues(props.newValueConglomerateId);
    }
  };

  useEffect(() => {
    validateValues();
  }, [props.newValueConglomerateId]);

  const t = props.t;
  return (
    <div>
      {" "}
      <select
        onChange={e => setFieldValue("empresaID", e.target.value)}
        onBlur={e => setFieldTouched("empresaID", true)}
        className={`form-control form-control-sm ${errors.empresaID &&
          touched.empresaID &&
          "is-invalid"}`}
      >
        <option value={""}>
          -- {t("app_usuarios_form_registrar_empresa_select")} --
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

// import React from "react";
// import PropTypes from "prop-types";
// import { COMPANY_BY_CONGLOMERATE } from "../../../../../services/EndPoints";

// class SelectCompany extends React.Component {
//   state = {
//     dataCompany: [],
//     id: this.props.conglomerate,
//     t: this.props.t,
//     auth: this.props.authorization
//   };

//   static getDerivedStateFromProps(props, state) {
//     if (props.conglomerate !== state.id) {
//       return {
//         id: props.conglomerate
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
//     if (this.props.conglomerate !== prevProps.conglomerate) {
//       this.getDataCompany();
//     }
//     if (this.props.authorization !== prevProps.authorization) {
//       this.setState(
//         {
//           auth: this.props.authorization
//         },
//         this.getDataCompany()
//       );
//     }
//   }

//   getDataCompany = () => {
//     fetch(`${COMPANY_BY_CONGLOMERATE}${this.state.id}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + this.state.auth
//       }
//     })
//       .then(response => response.json())
//       .then(data => {
//         this.setState({
//           dataCompany: data
//         });
//       })
//       .catch(err => console.log("Error", err));
//   };

//   render() {
//     const { t } = this.props;
//     return (
//       <div>
//         <select
//           name={this.props.name}
//           value={this.props.value}
//           className={this.props.className}
//           onChange={this.props.onChange}
//         >
//           <option value={""}>
//             {" "}
//             -- {t("app_usuarios_form_registrar_empresa_select")} --{" "}
//           </option>
//           {this.state.dataCompany.map((aux, id) => {
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
// SelectCompany.propTypes = {
//   t: PropTypes.any,
//   id: PropTypes.string.isRequired,
//   authorization: PropTypes.string.isRequired
// };
// export default SelectCompany;
