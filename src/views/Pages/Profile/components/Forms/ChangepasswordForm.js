import React from "react";
import { Formik, withFormik, ErrorMessage, yupToFormErrors } from "formik";
import * as Yup from "yup";
import { Card, CardBody, CardFooter, Col, Row } from "reactstrap";
import { withTranslation } from "react-i18next";

const ChangepasswordForm = props => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    t
  } = props;
  return (
    <div>
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <p className="text-center">
                {t("user_profile_tab_3_form_data_3_text")}
              </p>
              <form className="form">
                <div className="form-group">
                  <label>
                    {" "}
                    {t("user_profile_tab_3_form_data_3_actual_password")}{" "}
                    <span className="text-danger">*</span>{" "}
                  </label>
                  <input
                    name="old_password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.old_password}
                    className={`form-control form-control-sm ${errors.old_password &&
                      touched.old_password &&
                      "is-invalid"}`}
                    type="password"
                    placeholder=""
                  />
                  <ErrorMessage name="old_password" />
                </div>
                <div className="form-group">
                  <label>
                    {" "}
                    {t("user_profile_tab_3_form_data_3_nueva_password")}{" "}
                    <span className="text-danger">*</span>{" "}
                  </label>
                  <input
                    name={"new_password"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="password"
                    placeholder=""
                    className={`form-control form-control-sm ${errors.new_password &&
                      touched.new_password &&
                      "is-invalid"}`}
                  />
                  <ErrorMessage name={"new_password"} />
                </div>
                <div className="form-group">
                  <label>
                    {" "}
                    {t(
                      "user_prifile_tab_3_form_data_3_confirmar_password"
                    )}{" "}
                    <span className="text-danger"> * </span>{" "}
                  </label>
                  <input
                    name={"confirm_password"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="password"
                    className={`form-control form-control-sm ${errors.confirm_password &&
                      touched.confirm_password &&
                      "is-invalid"}`}
                    placeholder=""
                  />
                  <ErrorMessage name={"confirm_password"} />
                </div>
              </form>
            </CardBody>
            <CardFooter>
              <div className="float-right">
                <button
                  type="submit"
                  className="btn btn-outline-secondary btn-sm"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                >
                  {isSubmitting ? (
                    <div>
                      {" "}
                      <i className="fa fa-refresh fa-spin" />{" "}
                      {t("user_profile_tab_3_form_data_3_button")}
                    </div>
                  ) : (
                    <div>
                      <i className="fa fa-refresh" />{" "}
                      {t("user_profile_tab_3_form_data_3_button")}
                    </div>
                  )}
                </button>
              </div>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default withTranslation("translations")(
  withFormik({
    mapPropsToValues: props => ({
      new_password: props.changepassword.new_password,
      confirm_password: props.changepassword.confirm_password,
      old_password: props.changepassword.old_password
    }),
    validationSchema: Yup.object().shape({
      old_password: Yup.string().required(
        "Necesario validar su clave antigua."
      ),
      new_password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/, // esta expresion regular valida la contraseña
          "Contraseña no valida, la contraseña debe tener al menos una letra en mayuscula, al menos un dígito, no acepta espacios en blanco y al menos un carácter especial."
        )
        .required("Es necesario digitar la nueva contraseña.")
        .min(8)
        .max(15),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("new_password"), null], "La contraseña no coincide.")
        .min(8)
        .max(15)
        .required("Es necesario repetir la contraseña.")
    }),
    handleSubmit: (values, { setSubmitting, resetForm }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
        resetForm();
      });
    }
  })(ChangepasswordForm)
);
