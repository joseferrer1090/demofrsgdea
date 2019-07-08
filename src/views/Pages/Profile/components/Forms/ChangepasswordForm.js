import React from "react";
import { Formik, withFormik, ErrorMessage, yupToFormErrors } from "formik";
import * as Yup from "yup";
import { Card, CardBody, CardFooter, Col, Row } from "reactstrap";

const ChangepasswordForm = props => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
  } = props;
  return (
    <div>
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <p className="text-center">
                {" "}
                Elige un contraseña unica para proteger tu cuenta <br />
                <small>
                  {" "}
                  Escoge una contraseña que sea difícil de decifrar{" "}
                </small>
              </p>
              <form className="form">
                <div className="form-group">
                  <label>
                    {" "}
                    Contraseña actual <span className="text-danger">
                      *
                    </span>{" "}
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
                    Nueva contraseña <span className="text-danger">*</span>{" "}
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
                    Confirmar nueva contraseña{" "}
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
                      <i className="fa fa-refresh fa-spin" /> Actualizar
                      contraseña
                    </div>
                  ) : (
                    <div>
                      <i className="fa fa-refresh" /> Actualizar contraseña
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

export default withFormik({
  mapPropsToValues: props => ({
    new_password: props.changepassword.new_password,
    confirm_password: props.changepassword.confirm_password,
    old_password: props.changepassword.old_password
  }),
  validationSchema: Yup.object().shape({
    old_password: Yup.string().required("necesario validar su calve antigua"),
    new_password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/, // esta expresion regular valida la contraseña
        "contraseña no valida, la contraseña debe tener al menos una letra en mayuscula, al menos un digito, no espacio en blanco, al menos un caracter especial"
      )
      .required("es necesario digitar la nueva contraseña")
      .min(8)
      .max(15),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("new_password"), null], "la contraseña no coincide")
      .min(8)
      .max(15)
      .required("es necesario repetir la contraseña")
  }),
  handleSubmit: (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      resetForm();
    });
  }
})(ChangepasswordForm);
