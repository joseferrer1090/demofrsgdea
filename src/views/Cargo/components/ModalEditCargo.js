import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Table,
  CustomInput
} from "reactstrap";
import IMGCARGO from "./../../../assets/img/employee.svg";
import { Formik, ErrorMessage, FormikProps, Form, Field } from "formik";
import * as Yup from "yup";

class ModalEditCargo extends React.Component {
  state = {
      modal: this.props.modaledit,
      codigo: "",
      nombre: "",
      descripcion: "",
      estado: "",
      conglomerado_responsable:"",
      empresa_responsable: "",
      sede_responsable: "",
      dependencia_responsable: "",
      conglomerado: "",
      empresa: "",
      sede: "",
      dependencia: "",
    };


  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    return;
  };

  componentDidMount() {
    this.getCargoInformation()
  }

  getCargoInformation() {
    fetch(`http://localhost:3001/cargo/1`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          codigo: data.codigo,
          nombre: data.nombre,
          descripcion: data.descripcion,
          estado: data.estado,
          conglomerado_responsable: data.conglomerado_responsable,
          empresa_responsable: data.empresa_responsable,
          sede_responsable: data.sede_responsable,
          dependencia_responsable: data.dependencia_responsable,
          conglomerado: data.conglomerado,
          empresa: data.empresa,
          sede: data.sede,
          dependencia: data.dependencia,
        });
        console.log(this.state);
      })
      .catch(error => console.log("Error", error));
}
  render() {
    const dataPreview={
      codigo: this.state.codigo,
      nombre: this.state.nombre,
      descripcion: this.state.descripcion,
      estado: this.state.estado,
      conglomerado_responsable: this.state.conglomerado_responsable,
      empresa_responsable: this.state.empresa_responsable,
      sede_responsable: this.state.sede_responsable,
      dependencia_responsable: this.state.dependencia_responsable,
      conglomerado: this.state.conglomerado,
      empresa: this.state.empresa,
      sede: this.state.sede,
      dependencia: this.state.dependencia,
    }

    return (
      <Fragment>
      <Modal className="modal-lg" isOpen={this.state.modal}>
        <ModalHeader> Actualizar cargo </ModalHeader>
        <Formik
          initialValues={dataPreview}
          onSubmit={(values, {setSubmitting}) =>{
            setTimeout(()=>{
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false)
            },500)
          }}
          validationSchema={Yup.object().shape({
            codigo: Yup.string().required(" Por favor introduzca un código."),
            nombre: Yup.string().required(" Por favor introduzca un nombre."),
            descripcion: Yup.string()
                .max(250, " Máximo 250 caracteres."),
            conglomerado: Yup.string()
                .ensure()
                .required(" Por favor seleccione un conglomerado."),
            empresa: Yup.string()
                .ensure()
                .required(" Por favor seleccione una empresa."),
            sede: Yup.string()
                .ensure()
                .required(" Por favor seleccione una sede."),
            dependencia: Yup.string()
                .ensure()
                .required(" Por favor seleccione una dependencia."),
            estado: Yup.bool()
              .test(
                "Activado",
                "",
                value=> value === true
              ),
              conglomerado_responsable: Yup.bool()
              .test(
                "Activado",
                "",
                value=> value === true
              ),
              empresa_responsable: Yup.bool()
              .test(
                "Activado",
                "",
                value=> value === true
              ),
              sede_responsable: Yup.bool()
              .test(
                "Activado",
                "",
                value=> value === true
              ),
              dependencia_responsable: Yup.bool()
              .test(
                "Activado",
                "",
                value=> value === true
              )
          })}
        >
        {props => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset
          } = props;
          return(
            <Fragment>
            <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGCARGO} className="img-thumbnail" />
              </Col>
              <Col sm="9">
                <div className="">
                  {" "}
                  <h5 className="" style={{ borderBottom: "1px solid black" }}>
                    {" "}
                    Datos{" "}
                  </h5>{" "}
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                         Código <span className="text-danger">*</span>{" "}
                        <dd>
                          {" "}
                          <input
                          name={"codigo"}
                          type="text"
                          placeholder=""
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.codigo}
                          className={`form-control form-control-sm ${errors.codigo &&
                            touched.codigo &&
                            "is-invalid"}`}
                        />
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.codigo && touched.codigo ?
                          <i class="fa fa-exclamation-triangle"/> :
                          null
                        }
                        <ErrorMessage name={"codigo"} />
                        </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                         Nombre <span className="text-danger">*</span>{" "}
                        <dd>
                        <input
                        name={"nombre"}
                        type="text"
                        placeholder=""
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.nombre}
                        className={`form-control form-control-sm ${errors.nombre &&
                          touched.nombre &&
                          "is-invalid"}`}
                      />
                      <div style={{ color: '#D54B4B' }}>
                      {
                        errors.nombre && touched.nombre ?
                        <i class="fa fa-exclamation-triangle"/> :
                        null
                      }
                      <ErrorMessage name={"nombre"} />
                      </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <dl className="param">
                         Descripción
                        <dd>
                          {" "}
                          <textarea
                          name={"descripcion"}
                          className="form-control form-control-sm"
                          placeholder=""
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.descripcion}
                        />
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <dl className="param">
                      <label>
                      {" "}
                      Estado <span className="text-danger">*</span>{" "}
                    </label>
                    <div className="text-justify">
                    <Field
                      name="estado"
                      render={({field, form})=>{
                        return(
                          <CustomInput
                            type="checkbox"
                            id="CheckBoxEditRoles"
                            label=" Si esta opción se encuentra activada, representa
                            que el rol es visible en el sistema y se podrán
                            realizar operaciones entre cada uno de los módulos
                            correspondientes de la aplicación. En caso
                            contrario el rol no se elimina del sistema solo
                            quedará inactivo e invisibles para cada uno de los
                            módulos correspondiente del sistema."
                            {...field}
                            checked={field.value}
                            className={
                              errors.estado &&
                              touched.estado &&
                              "invalid-feedback"
                            }
                          />
                        );
                      }}
                    />
                      <ErrorMessage name="estado"/>
                      </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm="12">
                <Table size="sm" striped hover>
                  <thead>
                    <tr >
                      <th className="text-center"> Asignar responsabilidades</th>
                      <th></th>
                      <th className="text-center"> Responsable </th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    <tr>
                      <td>Conglomerado</td>
                      <td>
                        <select
                        name={"conglomerado"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.conglomerado}
                        className={`form-control form-control-sm ${errors.conglomerado &&
                          touched.conglomerado &&
                          "is-invalid"}`}
                          >
                          {" "}
                          <option>Seleccione</option>
                          <option value={"1"}> Conglomerado 1 </option>
                          <option value={"2"}> Conglomerado 2 </option>
                          <option value={"3"}> Conglomerado 3 </option>
                          {" "}
                        </select>{" "}
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.conglomerado && touched.conglomerado ?
                          <i class="fa fa-exclamation-triangle"/> :
                          null
                        }
                        <ErrorMessage name="conglomerado" />
                        </div>
                      </td>
                      <td>
                      <Field
                        name="conglomerado_responsable"
                        render={({field, form})=>{
                          return(
                            <CustomInput
                              {...field}
                              checked={field.value}
                              className={
                                errors.conglomerado_responsable &&
                                touched.conglomerado_responsable &&
                                "invalid-feedback"
                              }
                              type="checkbox"
                              id="ExampleCheckbox" />
                          );
                        }}
                      />
                        <ErrorMessage name="conglomerado_responsable"/>
                      </td>
                    </tr>
                    <tr>
                      <td>Empresa</td>
                      <td>
                        <select
                        name={"empresa"}
                        value={values.empresa}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`form-control form-control-sm ${errors.empresa &&
                          touched.empresa &&
                          "is-invalid"}`}
                        >
                          {" "}
                          <option>Seleccione</option>
                          <option value={"1"}> Empresa 1</option>
                          <option value={"2"}> Empresa 1</option>
                          <option value={"3"}> Empresa 1</option>
                          {" "}
                        </select>{" "}
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.empresa && touched.empresa ?
                          <i class="fa fa-exclamation-triangle"/> :
                          null
                        }
                        <ErrorMessage name={"empresa"} />
                        </div>
                      </td>
                      <td>
                      <Field
                      name="empresa_responsable"
                      render={({field, form})=>{
                        return(
                          <CustomInput
                          {...field}
                          checked={field.value}
                          className={
                            errors.empresa_responsable &&
                            touched.empresa_responsable &&
                            "invalid-feedback"
                          }
                          type="checkbox" id="ExampleCheckbox2" />
                        );
                      }}
                      />
                        <ErrorMessage name="empresa_responsable"/>
                      </td>
                    </tr>
                    <tr>
                      <td>Sede</td>
                      <td>
                        <select
                        name={"sede"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.sede}
                        className={`form-control form-control-sm ${errors.sede &&
                          touched.sede &&
                          "is-invalid"}`}
                        >
                          {" "}
                          <option>Seleccione</option>
                          <option value={"1"}> Sede 1</option>
                          <option value={"2"}> Sede 2</option>
                          <option value={"3"}> Sede 3</option>
                          {" "}
                        </select>{" "}
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.sede && touched.sede ?
                          <i class="fa fa-exclamation-triangle"/> :
                          null
                        }
                        <ErrorMessage name={"sede"} />
                        </div>
                      </td>
                      <td>
                      <Field
                      name="sede_responsable"
                      render={({field, form})=>{
                        return(
                          <CustomInput
                          {...field}
                          checked={field.value}
                          className={
                            errors.sede_responsable &&
                            touched.sede_responsable &&
                            "invalid-feedback"
                          }
                            type="checkbox" id="ExampleCheckbox3" />
                        );
                      }}
                      />
                        <ErrorMessage name="sede_responsable"/>
                      </td>
                    </tr>
                    <tr>
                      <td>Dependencia</td>
                      <td>
                        <select
                        name={"dependencia"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.dependencia}
                        className={`form-control form-control-sm ${errors.dependencia &&
                          touched.dependencia &&
                          "is-invalid"}`}
                        >
                          {" "}
                          <option>Seleccione</option>
                          <option value={"1"}> Dependencia 1</option>
                          <option value={"2"}> Dependencia 2</option>
                          <option value={"3"}> Dependencia 3</option>
                          {" "}
                        </select>{" "}
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.dependencia && touched.dependencia ?
                          <i class="fa fa-exclamation-triangle"/> :
                          null
                        }
                        <ErrorMessage name={"dependencia"} />
                        </div>
                      </td>
                      <td>
                      <Field
                      name="dependencia_responsable"
                      render={({field, form})=>{
                        return(
                          <CustomInput
                           {...field}
                           checked={field.value}
                           className={
                             errors.dependencia_responsable &&
                             touched.dependencia_responsable &&
                             "invalid-feedback"
                           }
                           type="checkbox"
                           id="ExampleCheckbox4" />
                        );

                      }}
                      />
                        <ErrorMessage name="dependencia_responsable"/>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <button
            onClick={e=>{
              e.preventDefault();
              handleSubmit();
            }}
            className="btn btn-outline-success">
              {" "}
              <i className="fa fa-pencil" /> Actualizar{" "}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              {" "}
              <i className="fa fa-times" /> Cerrar{" "}
            </button>
          </ModalFooter>
            </Fragment>
          );}}
        </Formik>
      </Modal>
      </Fragment>
    );
  }
}

ModalEditCargo.propTypes = {
  modaledit: PropTypes.bool.isRequired
};

export default ModalEditCargo;
