import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  CustomInput
} from "reactstrap";
import { Formik, ErrorMessage, FormikProps, Form, Field } from "formik";
import * as Yup from "yup";

class ModalEditPais extends React.Component {
    state = {
      // items: dataGrupoUsuarios,
      modal: this.props.modalgitedit,
      dataOk: false,
      selectedOptionUserAsigandos: null,
      codigo: "",
      nombre: "",
      conglomerado: "",
      conglomerado_selected:[],
      empresa: "",
      empresa_selected:[],
      sede: "",
      sede_selected:[],
      dependencia: "",
      dependencia_selected:[],
      roles: "",
      estado: "",
      descripcion:""
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
    this.getGrupoInformation();
    this.getConglomeradoData();
    this.getEmpresaData();
    this.getSedeData();
    this.getDependenciaData();
  }

  getGrupoInformation() {
    fetch(`http://localhost:3001/grupos/1`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          codigo: data.codigo,
          nombre: data.nombre,
          descripcion: data.descripcion,
          conglomerado: data.conglomerado,
          empresa: data.empresa,
          sede: data.sede,
          dependencia: data.dependencia,
          roles: data.roles,
          estado: data.estado
        });
        console.log(this.state);
      })
      .catch(error => console.log("Error", error));
  }
  getConglomeradoData = () => {
    fetch("http://localhost:3001/gruposConglomeradoSelected")
      .then(response => response.json())
      .then(data => {
        this.setState({
          conglomerado_selected: data
        });
      })
      .catch(error => console.log(error));
  };
  getEmpresaData = () => {
    fetch("http://localhost:3001/gruposEmpresaSelected")
      .then(response => response.json())
      .then(data => {
        this.setState({
          empresa_selected: data
        });
      })
      .catch(error => console.log(error));
  };
  getSedeData = () => {
    fetch("http://localhost:3001/gruposSedeSelected")
      .then(response => response.json())
      .then(data => {
        this.setState({
          sede_selected: data
        });
      })
      .catch(error => console.log(error));
  };
  getDependenciaData = () => {
    fetch("http://localhost:3001/gruposDependenciaSelected")
      .then(response => response.json())
      .then(data => {
        this.setState({
          dependencia_selected: data
        });
      })
      .catch(error => console.log(error));
  };


  // handleChangeSelectedOptionUsers = selectedOptionUserAsigandos => {
  //   this.setState({ selectedOptionUserAsigandos });
  //   console.log(this.state.selectedOptionUserAsigandos);
  // };

  render() {
    // const {dataOk, items, selectedOptionUserAsigandos} = this.state;
    // const buscarOpciones = items.map(item => (
    //   <option
    //     key={item.id}
    //     onClick={() => {
    //     const string = JSON.stringify({
    //       value: `${item.id}`,
    //       label: `${item.nombre}`
    //     });
    //     filtraritems.push(JSON.parse(string));
    //     console.log(filtraritems);
    //   }}
    // >
    //   {item.nombre}
    // </option>
    //     ));
    // console.log(filtraritems);
    const dataPreview = {
      codigo: this.state.codigo,
      nombre: this.state.nombre,
      descripcion: this.state.descripcion,
      conglomerado: this.state.conglomerado,
      empresa: this.state.empresa,
      sede: this.state.sede,
      dependencia: this.state.dependencia,
      roles: this.state.roles,
      estado: this.state.estado
    };
    const auxSelectedConglomerado = this.state.conglomerado_selected.map((aux, id) => {
      return (
        <option key={id} value={aux.id}>
          {aux.nombre}
        </option>
      );
    });
    const auxSelectedEmpresa = this.state.empresa_selected.map((aux, id) => {
      return (
        <option key={id} value={aux.id}>
          {aux.nombre}
        </option>
      );
    });
    const auxSelectedSede = this.state.sede_selected.map((aux, id) => {
      return (
        <option key={id} value={aux.id}>
          {aux.nombre}
        </option>
      );
    });
    const auxSelectedDependencia = this.state.dependencia_selected.map((aux, id) => {
      return (
        <option key={id} value={aux.id}>
          {aux.nombre}
        </option>
      );
    });
    return (
      <Fragment>
      <Modal className="modal-lg" isOpen={this.state.modal}>
      <ModalHeader> Actualizar grupo de usuarios </ModalHeader>
      <Formik
      initialValues={dataPreview}
            onSubmit={(values, {setSubmitting}) =>{
              setTimeout(()=>{
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false)
              },500)
            }}
            validationSchema={Yup.object().shape({
              codigo: Yup.string()
                .min(6, " Mínimo 6 caracteres.")
                .max(6, " Máximo 6 caracteres.")
                .required(" Por favor introduzca un código."),
              nombre: Yup.string()
              .required(" Por favor introduzca un nombre.")
              .max(100),
              descripcion: Yup.string()
              .max(250, " Máximo 250 para la descripción del conglomerado"),
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
              roles: Yup.array()
                .of(
                  Yup.object().shape({
                    label: Yup.string().required(),
                    value: Yup.string().required()
                  })
                )
                .required(" Por favor seleccione al menos un rol."),
              estado: Yup.bool()
                .test(
                  "Activado",
                  "",
                  value=> value === true
                ),
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
          handleReset,
          setFieldValue,
          setFieldTouched
        } = props;
        return(
          <Fragment>
          <ModalBody>
          <form className="form">
            <div className="container">
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>
                      {" "}
                      Código <span className="text-danger">*</span>{" "}
                    </label>
                    <input
                      name={"codigo"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      className={`form-control form-control-sm ${errors.codigo &&
                        touched.codigo &&
                        "is-invalid"}`}
                      value={values.codigo}
                    />
                    <div style={{ color: '#D54B4B' }}>
                      {
                        errors.codigo && touched.codigo ?
                        <i className="fa fa-exclamation-triangle"/> :
                        null
                      }
                    <ErrorMessage name="codigo" />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>
                      {" "}
                      Nombre <span className="text-danger">*</span>{" "}
                    </label>
                    <input
                      name={"nombre"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      className={`form-control form-control-sm ${errors.nombre &&
                        touched.nombre &&
                        "is-invalid"}`}
                      value={values.nombre}
                    />
                    <div style={{ color: '#D54B4B' }}>
                      {
                        errors.nombre && touched.nombre ?
                        <i className="fa fa-exclamation-triangle"/> :
                        null
                      }
                    <ErrorMessage name="nombre" />
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group">
                    <label> Descripción </label>
                    <textarea
                            name={"descripcion"}
                            value={values.descripcion}
                            className="form-control form-control-sm"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <div style={{ color: '#D54B4B' }}>
                            {
                              errors.descripcion && touched.descripcion ?
                              <i className="fa fa-exclamation-triangle"/> :
                              null
                            }
                          <ErrorMessage name="descripcion" />
                          </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                <Card>
                <CardBody>
                  <h5 className=""> Búsqueda de usuarios </h5>
                  <hr />
                  <br />
                  <form className="form">
                    <div className="row">
                      <div className="col-md-3">
                        <div className="form-group">
                          <label>
                            {" "}
                            Conglomerado{" "}
                            <span className="text-danger">*</span>{" "}
                          </label>
                          <select
                          name="conglomerado"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className={`form-control form-control-sm ${errors.conglomerado &&
                            touched.conglomerado &&
                            "is-invalid"}`}
                          value={values.conglomerado}
                        >
                        {auxSelectedConglomerado}
                      </select>
                      <div style={{ color: '#D54B4B' }}>
                      {
                        errors.conglomerado && touched.conglomerado ?
                        <i className="fa fa-exclamation-triangle"/> :
                        null
                      }
                      <ErrorMessage name="conglomerado" />
                      </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label>
                            {" "}
                            Empresa{" "}
                            <span className="text-danger">*</span>{" "}
                          </label>
                          <select
                            name="empresa"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            className={`form-control form-control-sm
                            ${errors.empresa &&
                              touched.empresa &&
                              "is-invalid"}`}
                            value={values.empresa}
                          >
                          {auxSelectedEmpresa}
                        </select>
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.empresa && touched.empresa ?
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                        <ErrorMessage name="empresa"/>
                        </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label>
                            {" "}
                            Sede <span className="text-danger">
                              *
                            </span>{" "}
                          </label>
                          <select
                            name="sede"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            className={`form-control form-control-sm
                            ${errors.sede &&
                              touched.sede &&
                              "is-invalid"}`}
                            value={values.sede}
                          >
                          {auxSelectedSede}
                        </select>
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.sede && touched.sede ?
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                        <ErrorMessage name="sede"/>
                        </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label>
                            {" "}
                            Dependencia{" "}
                            <span className="text-danger">*</span>{" "}
                          </label>
                          <select
                            name="dependencia"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            className={`form-control form-control-sm
                              ${errors.dependencia &&
                                touched.dependencia &&
                                "is-invalid"}`}
                            value={values.dependencia}
                            >
                            {auxSelectedDependencia}
                          </select>
                          <div style={{ color: '#D54B4B' }}>
                          {
                            errors.dependencia && touched.dependencia ?
                            <i className="fa fa-exclamation-triangle"/> :
                            null
                          }
                          <ErrorMessage name ="dependencia"/>
                          </div>
                        </div>
                      </div>
                    </div>


                        <div className="form-group">
                          <label>Usuarios disponibles</label>
                          <select className="form-control form-control-sm"  multiple>
                            <option>Usuarios disponibles de la consulta </option>
                          </select>

                        </div>


                  </form>
                </CardBody>
                <CardFooter>
                  <div className="float-right">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({ dataOk: !this.state.dataOk });
                      }}
                    >
                      {" "}
                      <i className="fa fa-search" /> Buscar
                    </button>{" "}
                  </div>
                </CardFooter>
              </Card>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label>
                      {" "}
                      Seleccione usuario(s) asignados{" "}
                      <span className="text-danger">*</span>{" "}
                    </label>
                    <MySelect
                          name={"roles"}
                          value={values.roles}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          error={errors.roles}
                          touched={touched.roles}
                        />
                        {touched ? (
                          <div style={{ color: "red" }}>
                            {" "}
                            <div style={{ color: '#D54B4B' }}>
                            {
                              errors.roles && touched.roles ?
                              <i className="fa fa-exclamation-triangle"/> :
                              null
                            }
                            <ErrorMessage name={"roles"} />
                            </div>
                          </div>
                        ) : null}
                  </div>
                </div>
                <div className="col-sm-12">
                <div className="form-group">
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
                    id="CheckBoxEditGrupos"
                    label="Si esta opción se encuentra activada, Representa
                    que el grupo es visible en el sistema y se
                    podrán realizar operaciones entre cada uno de
                    los módulos correspondientes de la aplicación.
                    En caso contrario el grupo no se elimina del
                    sistema solo quedará inactiva e invisibles para
                    cada uno de los módulos correspondiente del
                    sistema."
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
                </div>
              </div>
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-outline-success btn-sm"
            onClick={e=>{
              e.preventDefault();
              handleSubmit();
            }}
            >
            {" "}
            <i className="fa fa-pencil" /> Actualizar{" "}
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => {
              this.setState({ modal: false });
            }}
          >
            {" "}
            <i className="fa fa-times" /> Cerrar{" "}
          </button>
        </ModalFooter>
      </Fragment>);}}
      </Formik>
    </Modal>
      </Fragment>
    );
  }
}

ModalEditPais.propTypes = {
  modaledit: PropTypes.bool.isRequired
};

export default ModalEditPais;

const options = [
  { value: "Food", label: "Food" },
  { value: "Being Fabulous", label: "Being Fabulous" },
  { value: "Ken Wheeler", label: "Ken Wheeler" },
  { value: "ReasonML", label: "ReasonML" },
  { value: "Unicorns", label: "Unicorns" },
  { value: "Kittens", label: "Kittens" }
];

class MySelect extends React.Component {
  handleChange = value => {
    this.props.onChange("roles", value);
  };

  handleBlur = () => {
    this.props.onBlur("roles", true);
  };

  render() {
    return (
      <div style={{ margin: "0" }}>
        <Select
          name={this.props.name}
          options={options}
          isMulti
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
          placeholder={"-- seleccione rol --"}
        />
        {/* {!!this.props.error && this.props.touched && (
          <div
            style={{ color: "red", marginTop: ".5rem" }}
            className="invalid-feedback"
          >
            {this.props.error}
          </div>
        )} */}
      </div>
    );
  }
}
