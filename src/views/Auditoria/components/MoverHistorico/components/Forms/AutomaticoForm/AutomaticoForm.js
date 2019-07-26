import React, {useState} from 'react';
import { Formik, withFormik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { RadioButtonSi, RadioButtonNo } from './radio-buttons';
import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Col,
  Row,
  Collapse
} from "reactstrap";

const SI = { label: 'Si', value: 'true' };
const NO = { label: 'No', value: 'false' };

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
  const [inputs, setInputs] = useState(null);
  const [collapse, setCollapse] = useState(false);
  const requiredNotification = values.inputsCondition === SI.value;

  const toggle = () => {
    setCollapse(!collapse)
  }

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
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.fechaDesde && touched.fechaDesde ?
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                        <ErrorMessage name="fechaDesde"/>
                        </div>
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
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.fechaHasta && touched.fechaHasta ?
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                        <ErrorMessage name="fechaHasta"/>
                        </div>
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
                      <option value={""}> Seleccione </option>
                      <option value={"1"}>Operación 1</option>
                      <option value={"2"}>Operación 2</option>
                    </select>
                    <div style={{ color: '#D54B4B' }}>
                    {
                      errors.operacion && touched.operacion ?
                      <i className="fa fa-exclamation-triangle"/> :
                      null
                    }
                    <ErrorMessage name="operacion"/>
                    </div>

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
                      <option value={""}> Seleccione </option>
                      <option value={"1"}> Módulo 1</option>
                      <option value={"2"}> Módulo 2</option>
                    </select>
                    <div style={{ color: '#D54B4B' }}>
                    {
                      errors.modulo && touched.modulo ?
                      <i className="fa fa-exclamation-triangle"/> :
                      null
                    }
                    <ErrorMessage name="modulo"/>
                    </div>
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
                      <option value={""}> Seleccione </option>
                      <option value={"1"}> Entidad 1</option>
                      <option value={"2"}> Entidad 2</option>
                    </select>
                    <div style={{ color: '#D54B4B' }}>
                    {
                      errors.entidad && touched.entidad ?
                      <i className="fa fa-exclamation-triangle"/> :
                      null
                    }
                    <ErrorMessage name="entidad"/>
                    </div>
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
                      <option value={""}> Seleccione </option>
                      <option value={"1"}> Acción 1</option>
                      <option value={"2"}> Acción 2</option>
                    </select>
                    <div style={{ color: '#D54B4B' }}>
                    {
                      errors.accion && touched.accion ?
                      <i className="fa fa-exclamation-triangle"/> :
                      null
                    }
                    <ErrorMessage name="accion"/>
                    </div>
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
                            <option value={""}>Seleccione</option>
                            <option value={"1"}> Periodo 1</option>
                            <option value={"2"}> Periodo 2</option>
                          </select>
                          <div style={{ color: '#D54B4B' }}>
                          {
                            errors.periodo && touched.periodo ?
                            <i className="fa fa-exclamation-triangle"/> :
                            null
                          }
                          <ErrorMessage name="periodo"/>
                          </div>
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
                          <div style={{ color: '#D54B4B' }}>
                          {
                            errors.hora && touched.hora ?
                            <i className="fa fa-exclamation-triangle"/> :
                            null
                          }
                          <ErrorMessage name="hora"/>
                          </div>
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
                            <option value={""}>Seleccione</option>
                            <option value={"1"}>Lunes</option>
                            <option value={"2"}>Martes</option>
                            <option value={"3"}>Miercoles</option>
                            <option value={"4"}>Jueves</option>
                            <option value={"5"}>Viernes</option>
                            <option value={"6"}>Sábado</option>
                            <option value={"7"}>Domingo</option>
                          </select>
                          <div style={{ color: '#D54B4B' }}>
                          {
                            errors.diaSemana && touched.diaSemana ?
                            <i className="fa fa-exclamation-triangle"/> :
                            null
                          }
                          <ErrorMessage name="diaSemana"/>
                          </div>
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
                          <div style={{ color: '#D54B4B' }}>
                          {
                            errors.diaMes && touched.diaMes ?
                            <i className="fa fa-exclamation-triangle"/> :
                            null
                          }
                          <ErrorMessage name="diaMes"/>
                          </div>
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
                            <option value={""}>Seleccione</option>
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
                          <div style={{ color: '#D54B4B' }}>
                          {
                            errors.mes && touched.mes ?
                            <i className="fa fa-exclamation-triangle"/> :
                            null
                          }
                          <ErrorMessage name="mes"/>
                          </div>
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
                              <Field
                              component={RadioButtonSi}
                              name="inputsCondition"
                              id="true"
                              label="Si"
                              value="true"
                            />
                            <Field
                              component={RadioButtonNo}
                              name="inputsCondition"
                              id="false"
                              label="No"
                              value="false"
                            />
                            <br/>
                            <div style={{ color: '#D54B4B' }}>
                            {
                              errors.inputsCondition && touched.inputsCondition ?
                              <i className="fa fa-exclamation-triangle"/> :
                              null
                            }
                            <ErrorMessage name="inputsCondition" />
                            </div>
                              </div>
                            </div>
                            <br/>
                            {requiredNotification && (
                              <div className="col-md-6 offset-3">
                                <Card body>
                                  <div className="row">
                                    <div className="col">
                                      <label>
                                        Días / horas antes que se desea enviar la
                                        notificación <span className="text-danger">*</span>
                                      </label>
                                      <select
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name={"selectNotification"}
                                        type="select"
                                        onClick={e => {
                                          setInputs(e.target.value);
                                        }}
                                        className={`form-control form-control-sm ${errors.selectNotification &&
                                          touched.selectNotification &&
                                          "is-invalid"}`}
                                          value={values.selectNotification}
                                      >
                                        <option value={""}>--Seleccione--</option>
                                        <option value={'1'}>Días</option>
                                        <option value={'2'}>Horas</option>
                                      </select>

                                      <ErrorMessage name="selectNotification" />
                                      <br/>
                                      {inputs === '0' ? (
                                        null
                                      ) : inputs === '1' ? (
                                        <div>
                                          <input
                                          name={"days"}
                                          type="number"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.days}
                                          className={`form-control form-control-sm ${errors.days &&
                                          touched.days &&
                                          "is-invalid"}`}
                                          defaultValue={1}
                                          min={1}
                                          max={31}
                                          />
                                          <ErrorMessage name="days" />
                                        </div>
                                      ) : inputs === '2' ? (
                                        <div>
                                        <input
                                        name={"hours"}
                                        type="time"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.hours}
                                        className={`form-control form-control-sm ${errors.hours &&
                                        touched.hours &&
                                        "is-invalid"}`}
                                        defaultValue={1}
                                        min={1}
                                        max={31}
                                        />
                                        </div>
                                      ) : null}
                                    </div>
                                  </div>
                                </Card>
                              </div>
                            )}
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
    inputsCondition: props.auditoriaMHAutomaticoForm.inputsCondition,
    selectNotification: props.auditoriaMHAutomaticoForm.selectNotification,
    days: props.auditoriaMHAutomaticoForm.days,
    hours: props.auditoriaMHAutomaticoForm.hours
  }),
  validationSchema: Yup.object().shape({
    operacion: Yup.string()
      .ensure()
      .required(" Por favor seleccione una operación."),
    modulo: Yup.string()
      .ensure()
      .required(" Por favor seleccione un módulo."),
    entidad: Yup.string()
      .ensure()
      .required(" Por favor seleccione una entidad."),
    accion: Yup.string()
      .ensure()
      .required(" Por favor seleccione una acción."),
    fechaDesde: Yup.date()
      .required(" Por favor introduzca una fecha valida."),
    fechaHasta: Yup.date()
      .required(" Por favor introduzca una fecha valida."),
    periodo: Yup.string()
      .ensure()
      .required(" Por favor seleccione un periodo."),
    hora: Yup.string()
      .required(" Por favor introduzca una hora."),
    diaSemana: Yup.string()
      .ensure()
      .required(" Por favor seleccione un día de la semana."),
    diaMes: Yup.string()
      .ensure()
      .required(" Por favor introduzca un día del mes."),
    mes: Yup.string()
      .ensure()
      .required(" Por favor seleccione un mes."),
    inputsCondition: Yup.bool()
      .required(' ¿Desea qué se le notifique?'),
    selectNotification: Yup.string()
      .ensure()
      .notRequired('Notificacion requerida'),
    days: Yup.string()
      .notRequired('Días requeridos.'),
    hours: Yup.string()
      .notRequired('Hora requerida.')
  }),

  handleSubmit: (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      resetForm();
    }, 1000);
  }
})(AutomaticoForm);

const InputTime = () =>(
  <input type="time" className={'form-control from-control-sm'}/>
);

const InputDays = () =>(
  <input
    type="number"
    className="form-control form-control-sm"
    defaultValue={1}
    min={1}
    max={31}
  />
);

