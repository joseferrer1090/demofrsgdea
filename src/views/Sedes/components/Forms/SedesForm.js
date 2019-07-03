import React, { useState } from "react";
import { Formik, withFormik, ErrorMessage } from "formik";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CustomInput,
  Col,
  Row,
  Alert
} from "reactstrap";
const SedesForm = props => {
  const [visibleAlert, setVisibleAlert] = useState(true);

  const onDismiss = () => {
    console.log(visibleAlert);
    setVisibleAlert(!visibleAlert);
  };

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
  return (
    <div>
      <Card>
        <CardHeader>Registro de sede</CardHeader>
        <CardBody>
          <form className="form">
            <Row>
              <Col sm="6">
                <div className="form-group">
                  <label>
                    {" "}
                    Conglomerado <span className="text-danger">*</span>{" "}
                  </label>
                  <select className="form-control form-control-sm">
                    {" "}
                    <option>--Seleccione-- </option>{" "}
                  </select>
                </div>
              </Col>
              <Col sm="6">
                <div className="form-group">
                  <label>
                    {" "}
                    Empresa <span className="text-danger">*</span>
                  </label>
                  <br />
                  <select className="form-control form-control-sm">
                    <option>--seleccione--</option>
                  </select>
                  {/* <Select
                    className=""
                    value={this.state.selectedOptionEmpresa}
                    onChange={this.handleChangeOptionEmpresa}
                    options={dataEmpresa}
                  /> */}
                </div>
              </Col>
              <Col sm="6">
                <div className="form-group">
                  <label>
                    {" "}
                    Código <span className="text-danger">*</span>{" "}
                  </label>
                  <input type="text" className="form-control form-control-sm" />
                </div>
              </Col>
              <Col sm="6">
                <div className="form-group">
                  <label>
                    {" "}
                    Nombre <span className="text-danger">*</span>{" "}
                  </label>
                  <input type="text" className="form-control form-control-sm" />
                </div>
              </Col>
              <Col sm="12">
                <div className="form-group">
                  <label> Descripción </label>
                  <textarea className="form-control form-control-sm" />
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm="6">
                <div className="form-group ">
                  <label>
                    {" "}
                    Prefijo de radicación <span className="text-danger">
                      *
                    </span>{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    maxLength={"6"}
                    placeholder=" "
                  />
                </div>
              </Col>
              <Col sm="6">
                <div className="form-group">
                  <label>
                    {" "}
                    Secuencia de radicación{" "}
                    <span className="text-danger">*</span>{" "}
                  </label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    min={0}
                  />
                </div>
              </Col>
              <Col sm="12">
                <Alert
                  color="secondary"
                  isOpen={visibleAlert}
                  toggle={onDismiss}
                  fade={true}
                >
                  <h4 className="alert-heading">¡ Importante !</h4>
                  <p>
                    Los campos de{" "}
                    <b>Prefijo de radicación y Secuencia de radicación</b>, son
                    campos que se reflejaran en el formulario de radicación.
                  </p>
                  <hr />
                  <p className="mb-0">
                    Es recomendable que el campo <b>Prefijo de radicación</b>,
                    se describa acorde al proceso de radicación.
                  </p>
                </Alert>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="4">
                <div className="form-group">
                  <label>País</label>
                  <select className="form-control form-control-sm">
                    <option>--Seleccione--</option>
                  </select>
                </div>
              </Col>
              <Col sm="4">
                <div className="form-group">
                  <label>Departamento</label>
                  <select className="form-control form-control-sm">
                    <option>--Seleccione--</option>
                  </select>
                </div>
              </Col>
              <Col sm="4">
                <div className="form-group">
                  <label>
                    Ciudad <span className="text-danger">*</span>
                  </label>
                  <select className="form-control form-control-sm">
                    <option>--Seleccione--</option>
                  </select>
                </div>
              </Col>
              <Col sm="7">
                <div className="form-group">
                  <label>
                    {" "}
                    Dirección <span className="text-danger">*</span>{" "}
                  </label>
                  <input type="text" className="form-control form-control-sm" />
                </div>
              </Col>
              <Col sm="5">
                <div className="form-group">
                  <label>
                    {" "}
                    Teléfono <span className="text-danger">*</span>{" "}
                  </label>
                  <input type="text" className="form-control form-control-sm" />
                </div>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="12">
                <div className="form-group">
                  <label> Cargo responsable </label>
                  {/* <Select
                    value={selectedOptionOptionRolResponsable}
                    onChange={this.handleChangeOptionRolResponsable}
                    options={dataExampleRolResponsable}
                  /> */}
                  <select className="form-control form-control-sm">
                    <option>--Seleccione--</option>
                  </select>
                </div>
              </Col>
              <Col sm="12">
                <div className="form-group">
                  <label>
                    {" "}
                    Estado <span className="text-danger">*</span>{" "}
                  </label>
                  <div className="text-justify">
                    <CustomInput
                      type="checkbox"
                      id="ExampleInputCheckbox"
                      label="Si esta opción se encuentra activada, Representa que
                             la sede es visible en el sistema y se podrán
                             realizar operaciones entre cada uno de los módulos
                             correspondientes de la aplicación. En caso contrario
                             la sede no se elimina del sistema solo quedará
                             inactiva e invisibles para cada uno de los módulos
                             correspondiente del sistema."
                    />
                  </div>
                  {/* <p
                            className="text-muted"
                            style={{ textAlign: "justify" }}
                          >
                            {" "}
                            Si esta opción se encuentra activada, Representa que
                            la sede es visible en el sistema y se podrán
                            realizar operaciones entre cada uno de los módulos
                            correspondientes de la aplicación. En caso contrario
                            la sede no se elimina del sistema solo quedará
                            inactiva e invisibles para cada uno de los módulos
                            correspondiente del sistema.
                          </p> */}
                </div>
              </Col>
            </Row>
          </form>
        </CardBody>
        <CardFooter>
          <div className="float-right">
            <button className="btn btn-secondary btn-sm">
              {" "}
              <i className="fa fa-plus" /> Registrar{" "}
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default withFormik({})(SedesForm);
