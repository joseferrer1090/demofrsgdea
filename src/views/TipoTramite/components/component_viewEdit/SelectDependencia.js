import React, { useEffect, useState, useRef } from "react";
import { DEPENDENCIES_BY_HEADQUARTER } from "../../../../services/EndPoints";

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
    if (PREValue !== props.headquarterId) {
      setDataDependence([]);
      if (PREValue !== "") {
        values.dependencia = "";
      }
      fetchNewValues(props.headquarterId);
    }
  };

  useEffect(() => {
    validateValues();
    // console.log(props.headquarterId);
  }, [props.headquarterId, props.dependenceId]);

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
        value={values.dependencia}
      >
        <option value={""}>
          -- {t("app_tipoTramite_actualizar_placeholder_dependencia")} --
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
// import { DEPENDENCIES_BY_HEADQUARTER } from "./../../../../services/EndPoints";

// class SelectDependencia extends React.Component {
//   state = {
//     dataDependencia: [],
//     id: this.props.idSede,
//     t: this.props.t,
//     auth: this.props.authorization
//   };

//   static getDerivedStateFromProps(props, state) {
//     if (props.idSede !== state.id) {
//       return {
//         id: props.idSede
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
//     if (this.props.idSede !== prevProps.idSede) {
//       // METODO
//       this.getDataDependencia();
//     }
//     if (this.props.authorization !== prevProps.authorization) {
//       this.setState({
//         auth: this.props.authorization,
//         id: this.props.idSede
//       });
//     }
//   }

//   getDataDependencia = () => {
//     fetch(`${DEPENDENCIES_BY_HEADQUARTER}${this.state.id}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + this.props.authorization
//       }
//     })
//       .then(response => response.json())
//       .then(data => {
//         this.setState({
//           dataDependencia: data
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
//             {" "}
//             -- {t("app_tipoTramite_actualizar_placeholder_dependencia")} --
//           </option>
//           {this.state.dataDependencia.map((aux, id) => {
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

// SelectDependencia.propTypes = {
//   t: PropTypes.any,
//   authorization: PropTypes.string.isRequired,
//   idSede: PropTypes.string.isRequired
// };

// export default SelectDependencia;
