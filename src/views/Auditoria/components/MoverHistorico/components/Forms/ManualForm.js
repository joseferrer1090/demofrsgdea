import React from 'react';
import { Formik, withFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter
} from "reactstrap";
const ManualForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    setFieldValue,
    handleBlur,
    handleSubmit,
    handleReset
  } = props;

  return(
    <Row>
    <Col sm={{ size: 8, offset: 2 }}>
      <Card>
        <CardHeader>
          <i className="fa fa-server" />
          Movimiento Histórico manual
        </CardHeader>
        <CardBody>
          <p className="text-justify">
            {" "}
            Si desea mover los registros del <b>“Log de Auditoria”</b> en
            tiempo real, puede utilizar esta opción, con el fin de liberar
            espacio y mejorar el rendimiento de las consultas. Los datos
            se moverán a un repositorio de históricos de auditorias, el
            cual podrá consultar.
          </p>
          <Card body>
            <form role="form">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      {" "}
                      Fecha desde <span className="text-danger">
                        *
                      </span>{" "}
                    </label>
                    <input
                      name={"fechaDesde"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.fechaDesde}
                      className={`form-control form-control-sm ${errors.fechaDesde &&
                        touched.fechaDesde &&
                        "is-invalid"}`}
                      type="date"
                    />
                    <ErrorMessage name="fechaDesde"/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      {" "}
                      Fecha hasta <span className="text-danger">
                        *
                      </span>{" "}
                    </label>
                    <input
                      type="date"
                      name={"fechaHasta"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.fechaHasta}
                      className={`form-control form-control-sm ${errors.fechaHasta &&
                        touched.fechaHasta &&
                        "is-invalid"}`}
                    />
                    <ErrorMessage name="fechaHasta"/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      {" "}
                      Operación <span className="text-danger">
                        *
                      </span>{" "}
                    </label>
                    <select
                      name={"operacion"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.operacion}
                      className={`form-control form-control-sm ${errors.operacion &&
                        touched.operacion &&
                        "is-invalid"}`}
                    >
                      <option> Seleccione </option>
                      <option value={"1"}>Operación 1</option>
                      <option value={"2"}>Operación 2</option>
                    </select>
                    <ErrorMessage name="operacion"/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      {" "}
                      Módulo <span className="text-danger">*</span>{" "}
                    </label>
                    <select
                      name={"modulo"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.modulo}
                      className={`form-control form-control-sm ${errors.modulo &&
                        touched.modulo &&
                        "is-invalid"}`}
                    >
                      <option> Seleccione </option>
                      <option value={"1"}> Módulo 1</option>
                      <option value={"2"}> Módulo 2</option>
                    </select>
                    <ErrorMessage name="modulo"/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      {" "}
                      Entidad <span className="text-danger">*</span>{" "}
                    </label>
                    <select
                      name={"entidad"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.entidad}
                      className={`form-control form-control-sm ${errors.entidad &&
                        touched.entidad &&
                        "is-invalid"}`}
                    >
                      <option> Seleccione </option>
                      <option value={"1"}> Entidad 1</option>
                      <option value={"2"}> Entidad 2</option>
                    </select>
                    <ErrorMessage name="entidad"/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      {" "}
                      Acción <span className="text-danger">*</span>{" "}
                    </label>
                    <select
                      name={"accion"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.accion}
                      className={`form-control form-control-sm ${errors.accion &&
                        touched.accion &&
                        "is-invalid"}`}
                    >
                      <option> Seleccione </option>
                      <option value={"1"}> Acción 1</option>
                      <option value={"2"}> Acción 2</option>
                    </select>
                    <ErrorMessage name="accion"/>
                  </div>
                </div>
              </div>
            </form>
          </Card>
        </CardBody>
        <CardFooter>
          <div className="pull-right">
            <button
              type="submit"
              className="btn btn-outline-secondary btn-sm"
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <i className=" fa fa-spinner fa-spin" />
              ) : (
                <div>
                  <i className="fa fa-gear" />  Mover a histórico
                </div>
              )}
            </button>
          </div>
        </CardFooter>
      </Card>
    </Col>
  </Row>
  );
}
export default withFormik({
  mapPropsToValues: props => ({
    operacion: props.auditoriaMHManualForm.operacion,
    modulo: props.auditoriaMHManualForm.modulo,
    entidad:props.auditoriaMHManualForm.entidad,
    accion:props.auditoriaMHManualForm.accion,
    fechaDesde: props.auditoriaMHManualForm.fechaDesde,
    fechaHasta: props.auditoriaMHManualForm.fechaHasta,
  }),
  validationSchema: Yup.object().shape({
    operacion: Yup.string()
      .ensure()
      .required("Operación requerida."),
    modulo: Yup.string()
      .ensure()
      .required("Módulo requerido."),
    entidad: Yup.string()
      .ensure()
      .required("Entidad requerida."),
    accion: Yup.string()
      .ensure()
      .required("Acción requerida"),
    fechaDesde: Yup.date()
      .required("Fecha requerida."),
    fechaHasta: Yup.date()
      .required("Fecha requerida.")
  }),
  handleSubmit: (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      resetForm();
    }, 1000);
  }
})(ManualForm);
