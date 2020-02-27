import React, { useEffect, useState, useRef } from "react";
import { HEADQUARTER_BY_COMPANY } from "../../../../../services/EndPoints";

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
      values.sedeID = "";
      fetchNewValues(props.companyId);
    }
  };

  useEffect(() => {
    validateValues();
  }, [props.companyId, props.conglomerateId]);

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
        onChange={e => setFieldValue("sedeID", e.target.value)}
        onBlur={e => setFieldTouched("sedeID", true)}
        className={`form-control form-control-sm ${errors.sedeID &&
          touched.sedeID &&
          "is-invalid"}`}
      >
        <option value={""}>
          -- {t("app_usuarios_form_registrar_sede_select")} --
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

// import React from "react";
// import PropTypes from "prop-types";
// import { HEADQUARTER_BY_COMPANY } from "../../../../../services/EndPoints";

// class SelectHeadquarter extends React.Component {
//   state = {
//     dataHeadquarter: [],
//     id: this.props.company,
//     t: this.props.t,
//     auth: this.props.authorization
//   };

//   static getDerivedStateFromProps(props, state) {
//     if (props.company !== state.id) {
//       return {
//         company: props.company
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
//     if (this.props.company !== prevProps.company) {
//       this.getDataHeadquarter();
//     }
//     if (this.props.authorization !== prevProps.authorization) {
//       this.setState(
//         {
//           auth: this.props.authorization
//         },
//         this.getDataHeadquarter()
//       );
//     }
//   }

//   getDataHeadquarter = () => {
//     fetch(`${HEADQUARTER_BY_COMPANY}${this.props.company}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + this.state.auth
//       }
//     })
//       .then(response => response.json())
//       .then(data => {
//         this.setState({
//           dataHeadquarter: data
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
//             -- {t("app_usuarios_form_registrar_sede_select")} --{" "}
//           </option>
//           {this.state.dataHeadquarter.map((aux, id) => {
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

// SelectHeadquarter.propTypes = {
//   id: PropTypes.string.isRequired,
//   t: PropTypes.array,
//   authorization: PropTypes.string.isRequired
// };
// export default SelectHeadquarter;
