import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import SelectConglomerado from "./component_viewEdit/SelectConglomerado";
import SelectEmpresa from "./component_viewEdit/SelectEmpresa";
import SelectSede from "./component_viewEdit/SelectSede";
import SelectDependencia from "./component_viewEdit/SelectDependencia";

const viewEditTipoDocumental = () => {
  return (
    <Formik>
      {props => {
        const {
          values,
          touched,
          errors,
          hanbdleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          setFieldTouched
        } = props;
        return (
          <Fragment>
            <div>Probando</div>
          </Fragment>
        );
      }}
    </Formik>
  );
};

export default viewEditTipoDocumental;
