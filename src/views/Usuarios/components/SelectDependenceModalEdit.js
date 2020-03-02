import React, { useEffect, useState, useRef } from "react";
import { DEPENDENCIES_BY_HEADQUARTER } from "../../../services/EndPoints";

const FieldDependence = ({
  field,
  form: { errors, touched, setFieldTouched, setFieldValue, values },
  ...props
}) => {
  const [dataDependence, setDataDependence] = useState([]);
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
        setDataDependence(data);
      })
      .catch(err => {
        console.log("Error", err);
        setDataDependence([]);
      });
  };

  const validateValues = () => {
    if (
      PREValueConglomerate !== props.conglomerateId ||
      PREValueCompany !== props.companyId
    ) {
      setDataDependence([]);
    }
    if (PREValue !== props.headquarterId) {
      setDataDependence([]);
      if (PREValue !== "") {
        values.usuario_dependence = "";
      }
      fetchNewValues(props.headquarterId);
    }
  };

  useEffect(() => {
    validateValues();
  }, [
    props.headquarterId,
    props.dependenceId,
    props.conglomerateId,
    props.companyId
  ]);

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

  const PREValue = usePrevious(props.headquarterId);
  const PREValueConglomerate = usePrevious(props.conglomerateId);
  const PREValueCompany = usePrevious(props.companyId);
  const t = props.t;
  return (
    <div>
      {" "}
      <select
        onChange={e => setFieldValue("usuario_dependence", e.target.value)}
        onBlur={e => setFieldTouched("usuario_dependence", true)}
        className={`form-control form-control-sm ${errors.usuario_dependence &&
          touched.usuario_dependence &&
          "is-invalid"}`}
        value={values.usuario_dependence}
      >
        <option value={""}>
          -- {t("app_usuarios_modal_editar_dependencia_select")} --
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

// import React from "react";
// import PropTypes from "prop-types";
// import { DEPENDENCIES_BY_HEADQUARTER } from "../../../services/EndPoints";

// class SelectDependence extends React.Component {
//   state = {
//     dataDependence: [],
//     id: this.props.usuario_headquarter,
//     t: this.props.t,
//     auth: this.props.authorization
//   };

//   static getDerivedStateFromProps(props, state) {
//     if (props.usuario_headquarter !== state.id) {
//       return {
//         id: props.usuario_headquarter
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
//     if (this.props.usuario_headquarter !== prevProps.usuario_headquarter) {
//       this.getDataDependence();
//     }
//     if (this.props.authorization !== prevProps.authorization) {
//       this.setState({
//         auth: this.props.authorization
//       });
//     }
//   }

//   componentDidMount() {
//     this.getDataDependence();
//   }

//   getDataDependence = () => {
//     fetch(`${DEPENDENCIES_BY_HEADQUARTER}${this.props.usuario_headquarter}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + this.state.auth
//       }
//     })
//       .then(response => response.json())
//       .then(data => {
//         this.setState({
//           dataDependence: data
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
//           onChange={this.props.onChange}
//           className={this.props.className}
//           onBlur={this.props.onBlur}
//         >
//           <option value={""}>
//             -- {t("app_usuarios_modal_editar_dependencia_select")} --
//           </option>
//           {this.state.dataDependence.map((aux, id) => {
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
// SelectDependence.propTypes = {
//   id: PropTypes.string.isRequired,
//   t: PropTypes.any,
//   authorization: PropTypes.string.isRequired
// };
// export default SelectDependence;
