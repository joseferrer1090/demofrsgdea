import React, { useEffect, useState } from "react";

const FieldDepartment = ({
  field,
  form: { errors, touched, setFieldTouched, setFieldValue, values },
  ...props
}) => {
  const [dataDepartment, setDataDepartment] = useState([]);
  const fetchNewValues = id => {
    fetch(
      `http://192.168.20.187:8090/api/sgdea/service/configuration/departments/country/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJjY3VhcnRhcyIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE1ODIzMjY2MjAsImF1dGhvcml0aWVzIjpbIlJPTEVfY29tcGFueS5jcmVhdGUiLCJST0xFX2NvbXBhbnkuc2hvdyIsIlJPTEVfY29uZ2xvbWVyYXRlcy5lZGl0IiwiUk9MRV9jb25nbG9tZXJhdGVzLnNob3ciLCJST0xFX2NvbXBhbnkuaW5kZXgiLCJST0xFX2Nvbmdsb21lcmF0ZXMuY3JlYXRlIiwiUk9MRV9jb21wYW55LmRlbGV0ZSIsIlJPTEVfY29uZ2xvbWVyYXRlcy5pbmRleCJdLCJqdGkiOiIzMWNlY2UzYy1jZWNiLTQyZTItYTk1Zi0yOWRjM2E0OWRjZWYiLCJlbmFibGVkIjp0cnVlLCJjbGllbnRfaWQiOiJmcm9udGVuZGFwcCJ9.WvZA9ih45X5yvU4GcZz0wF2hQdam8yW5YoNx_hxfhK-ft8bjO83jCS6uaTH5PfWX9eNkLQ4m429JhwecvqKjlo2eA0iz6XjqdqSGOWCi9_YE_bPsZfA5a_BCsLXhRzQ3t1ICoAjkOML6DF8WYU7ZHGtTPJ4An8apg8ow11eiAzsOSLZ9cwK12Maxpp6ccrv_HMEKhZPLYDo6Id_1jzQmCLEYi1yJlmBOY1PjpA4vPfrkpKs09XLP8QVo3Jb0U1Au4YUiEOkb5o17fehGlGn_Hu0ULIQEfBJ51Ub0KrVrFl7tyqNKkD5vGO9bjVJqCmlQxFDXEL9cO0ORHA29ruZW6A"
        }
      }
    )
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
      values.departmentId = "";
      fetchNewValues(props.newValueCountryId);
    }
  };
  useEffect(() => {
    validateValues();
  }, [props.newValueCountryId]);

  return (
    <div>
      {" "}
      <select
        onChange={e => setFieldValue("departmentId", e.target.value)}
        onBlur={e => setFieldTouched("departmentId", true)}
        className={`form-control form-control-sm ${errors.departmentId &&
          touched.departmentId &&
          "is-invalid"}`}
      >
        <option value={""}>-- Seleccione --</option>
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

// import PropTypes from "prop-types";
// import { DEPARTMENTS_BY_COUNTRY } from "../../../../../services/EndPoints";

// class SelectDepartment extends React.Component {
//   state = {
//     dataDepartment: [],
//     id: this.props.countryId,
//     t: this.props.t,
//     auth: this.props.authorization
//   };

//   static getDerivedStateFromProps(props, state) {
//     if (props.countryId !== state.id) {
//       return {
//         id: props.countryId
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
//     if (this.props.countryId !== prevProps.countryId) {
//       this.getDataDepartment();
//     }
//     if (this.props.authorization !== prevProps.authorization) {
//       this.setState(
//         {
//           auth: this.props.authorization
//         },
//         this.getDataDepartment()
//       );
//     }
//   }

//   getDataDepartment = () => {
//     fetch(`${DEPARTMENTS_BY_COUNTRY}${this.state.id}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + this.state.auth
//       }
//     })
//       .then(response => response.json())
//       .then(data => {
//         this.setState({
//           dataDepartment: data
//         });
//       })
//       .catch(err => {
//         console.log("Error", err);
//         this.setState({
//           dataDepartment: []
//         });
//       });
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
//           onBlur={this.props.onBlur}
//         >
//           <option value={""}>
//             -- {t("app_conglomerado_form_select_departamento")} --
//           </option>
//           {this.state.dataDepartment.map((aux, id) => {
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

// SelectDepartment.propTypes = {
//   id: PropTypes.string.isRequired,
//   t: PropTypes.any,
//   authorization: PropTypes.string.isRequired
// };

// export default SelectDepartment;
