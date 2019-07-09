import React from 'react';
import { Formik, withFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Col,
  Row,
} from "reactstrap";
const AutomaticoForm = props =>{
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
          {" "}
          <i className="fa fa-server" /> Mover histórico automatico{" "}
        </CardHeader>
        <CardBody>
          <p className="text-justify">
            Si desea mover los registros del <b>“Log de Auditoria” </b> de
            forma programada, es decir que el sistema se encarga de
            ejecutar esta acción, puede utilizar esta opción, con el fin
            de liberar espacio y mejorar el rendimiento de las consultas.
            Los datos se moverán a un repositorio de históricos de
            auditorias, el cual podrá consultar.
          </p>
          <form role="form">
            <div className="row">
              <div className="col-md-12">
                <Card body>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          {" "}
                          Fecha desde{" "}
                          <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          type="date"
                          name={"fechaDesde"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.fechaDesde}
                          className={`form-control form-control-sm ${errors.fechaDesde &&
                            touched.fechaDesde &&
                            "is-invalid"}`}
                        />
                        <ErrorMessage name="fechaDesde"/>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          {" "}
                          Fecha hasta{" "}
                          <span className="text-danger">*</span>{" "}
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
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          Entidad <span className="text-danger">*</span>
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
                          Acción <span className="text-danger">*</span>
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
                </Card>
              </div>
              <div className="col-md-12">
                <Card body>
                  <form role="form">
                    <div className="row" />
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>
                            {" "}
                            Periodo <span className="text-danger">
                              *
                            </span>{" "}
                          </label>
                          <select
                          name={"periodo"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.periodo}
                          className={`form-control form-control-sm ${errors.periodo &&
                            touched.periodo &&
                            "is-invalid"}`}
                          >
                            <option>Seleccione</option>
                            <option value={"1"}> Periodo 1</option>
                            <option value={"2"}> Periodo 2</option>
                          </select>
                          <ErrorMessage name="periodo"/>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>
                            {" "}
                            Hora <span className="text-danger">
                              *
                            </span>{" "}
                          </label>
                          <input
                            type="time"
                            name={"hora"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.hora}
                            className={`form-control form-control-sm ${errors.hora &&
                              touched.hora &&
                              "is-invalid"}`}
                          />
                          <ErrorMessage name="hora"/>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>
                            {" "}
                            Día de semana{" "}
                            <span className="text-danger">*</span>{" "}
                          </label>
                          <select
                          name={"diaSemana"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.diaSemana}
                          className={`form-control form-control-sm ${errors.diaSemana &&
                            touched.diaSemana &&
                            "is-invalid"}`}
                          >
                            <option>Seleccione</option>
                            <option value={"1"}>Lunes</option>
                            <option value={"2"}>Martes</option>
                            <option value={"3"}>Miercoles</option>
                            <option value={"4"}>Jueves</option>
                            <option value={"5"}>Viernes</option>
                            <option value={"6"}>Sábado</option>
                            <option value={"7"}>Domingo</option>
                          </select>
                          <ErrorMessage name="diaSemana"/>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {" "}
                            Día del mes{" "}
                            <span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            type="number"
                            min={1}
                            max={31}
                            name={"diaMes"}
                            defaultValue={1}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.diaMes}
                            className={`form-control form-control-sm ${errors.diaMes &&
                              touched.diaMes &&
                              "is-invalid"}`}
                          />
                          <ErrorMessage name="diaMes"/>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {" "}
                            Mes <span className="text-danger">
                              *
                            </span>{" "}
                          </label>
                          <select
                          name={"mes"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.mes}
                          className={`form-control form-control-sm ${errors.mes &&
                            touched.mes &&
                            "is-invalid"}`}
                          >
                            <option>Seleccione</option>
                            <option value={"1"}>Enero</option>
                            <option value={"2"}>Febrero</option>
                            <option value={"3"}>Marzo</option>
                            <option value={"4"}>Abril</option>
                            <option value={"5"}>Mayo</option>
                            <option value={"6"}>Junio</option>
                            <option value={"7"}>Julio</option>
                            <option value={"8"}>Agosto</option>
                            <option value={"9"}>Septiembre</option>
                            <option value={"10"}>Octubre</option>
                            <option value={"11"}>Noviembre</option>
                            <option value={"12"}>Diciembre</option>
                          </select>
                          <ErrorMessage name="mes"/>
                        </div>
                      </div>
                    </div>
                  </form>
                </Card>
                <Card body>
                  <div className="row">
                    <div className="col-md-12">
                      <form role="form">
                        <div className="row">
                          <div className="col-md-12">
                            <p className="text-justify">
                              {" "}
                              ¿Desea enviar una notificación al
                              administrador del sistema indicando las
                              horas o los dias antes en la cual se va a
                              ejecutar la programación automática?
                            </p>

                            <div className="col-md-6 offset-3">
                              <div className="offset-2">
                                Sí{" "}
                                <input
                                  name="notificacionSi"
                                  type="radio"
                                  value="si"
                                />{" "}
                                <span className="offset-6">
                                  {" "}
                                  No{" "}
                                  <input
                                  name="notificacionNo"
                                  type="radio"
                                  value="no"
                                  />{" "}
                                </span>
                              </div>
                            </div>
                            <br/>
                              <div className="col-md-6 offset-3">
                                <Card body>
                                  <div className="row">
                                    <div className="col">
                                      <label>
                                        Días / horas antes que se desea
                                        enviar la notificación{" "}
                                        <span className="text-danger">
                                          *
                                        </span>
                                      </label>
                                      <input
                                        type="number"
                                        className="form-control form-control-sm"
                                      />
                                      <br />
                                      <div className="">
                                        <select
                                          className="form-control form-control-sm"
                                        >

                                          <option value={"1"}>Dias</option>
                                          <option value={"2"}>Horas</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </Card>
                              </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </form>
        </CardBody>
        <CardFooter>
          <div className="pull-right">
          <button className="btn btn-sm btn-warning ">
              {" "}
              <i className="fa fa-pencil" /> Editar{" "}
            </button>
            &nbsp;
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
                  <i className="fa fa-refresh" /> Programar
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
    operacion: props.auditoriaMHAutomaticoForm.operacion,
    modulo: props.auditoriaMHAutomaticoForm.modulo,
    entidad:props.auditoriaMHAutomaticoForm.entidad,
    accion:props.auditoriaMHAutomaticoForm.accion,
    fechaDesde: props.auditoriaMHAutomaticoForm.fechaDesde,
    fechaHasta: props.auditoriaMHAutomaticoForm.fechaHasta,
    periodo: props.auditoriaMHAutomaticoForm.periodo,
    hora: props.auditoriaMHAutomaticoForm.hora,
    diaMes: props.auditoriaMHAutomaticoForm.diaMes,
    diaSemana:props.auditoriaMHAutomaticoForm.diaSemana,
    mes:props.auditoriaMHAutomaticoForm.mes,
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
      .required("Fecha requerida."),
    periodo: Yup.string()
    .ensure()
    .required("Periodo requerido."),
    hora: Yup.string()
    .required("Hora requerida."),
    diaSemana: Yup.string()
    .ensure()
    .required("Día de la semana requerido."),
    diaMes: Yup.string()
    .ensure()
    .required("Día del mes requerido."),
    mes: Yup.string()
    .ensure()
    .required("Mes requerido."),
  }),

  handleSubmit: (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      resetForm();
    }, 1000);
  }
})(AutomaticoForm);
