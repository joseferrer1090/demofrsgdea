import React, {useState, useEffect, useRef} from "react";
import { Formik, withFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Col, Row, CustomInput, ListGroup, ListGroupItem, Badge, Button } from "reactstrap";
import Select from "react-select";
import { useDispatch } from "react-redux";
import {agregarUserAction}  from "./../../../../actions/usersActions";

const TipoTramite = props => {

  //  const [usuario, setUsuarios] = useState({});

  // const dispatch = useDispatch();

  // const AgregarUsuario = (user) => dispatch(agregarUserAction(user));

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
  return (
    <div className="col-md-12">
      <form className="form">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="p-2 mb-1 bg-light text-dark">
                    Información básica
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            Tipo de correspondencia{" "}
                            <span className="text-danger">* </span>
                          </label>
                          <select
                            name={"t_correspondencia"}
                            value={values.t_correspondencia}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`form-control form-control-sm ${errors.t_correspondencia &&
                              touched.t_correspondencia &&
                              "is-invalid"}`}
                          >
                            <option disabled value={""}> --Seleccione-- </option>
                            <option value={"1"}> Recibida </option>
                            <option value={"2"}> Despachada </option>
                            <option value={"3"}> Interna </option>
                          </select>
                          <div style={{ color: '#D54B4B' }}>
                          {
                            errors.t_correspondencia && touched.t_correspondencia ?
                            <i className="fa fa-exclamation-triangle"/> :
                            null
                          }
                          <ErrorMessage name={"t_correspondencia"} />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            Código <span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            name={"codigo"}
                            onChange={e => {setFieldValue("codigo", e.target.value.toUpperCase())}}
                            onBlur={handleBlur}
                            value={values.codigo}
                            type="text"
                            className={`form-control form-control-sm ${errors.codigo &&
                              touched.codigo &&
                              "is-invalid"}`}
                          />
                          <div style={{ color: '#D54B4B' }}>
                          {
                            errors.codigo && touched.codigo ?
                            <i className="fa fa-exclamation-triangle"/> :
                            null
                          }
                          <ErrorMessage name={"codigo"} />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            Nombre <span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            name={"nombre"}
                            onChange={e => {setFieldValue("nombre", e.target.value.toUpperCase())}}
                            onBlur={handleBlur}
                            value={values.nombre}
                            type="text"
                            className={`form-control form-control-sm ${errors.nombre &&
                              touched.nombre &&
                              "is-invalid"}`}
                          />
                          <div style={{ color: '#D54B4B' }}>
                          {
                            errors.nombre && touched.nombre ?
                            <i className="fa fa-exclamation-triangle"/> :
                            null
                          }
                          <ErrorMessage name={"nombre"} />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            Descripción <span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            name={"descripcion"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}
                            type="text"
                            className={`form-control form-control-sm ${errors.descripcion &&
                              touched.descripcion &&
                              "is-invalid"}`}
                          />
                          <div style={{ color: '#D54B4B' }}>
                          {
                            errors.descripcion && touched.descripcion ?
                            <i className="fa fa-exclamation-triangle"/> :
                            null
                          }
                          <ErrorMessage name={"descripcion"} />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>
                            Días máximos de respuesta{" "}
                            <span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            name={"d_maximos"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.d_maximos}
                            type="number"
                            className={`form-control form-control-sm ${errors.d_maximos &&
                              touched.d_maximos &&
                              "is-invalid"}`}
                            min={0}
                          />
                          <div style={{ color: '#D54B4B' }}>
                          {
                            errors.d_maximos && touched.d_maximos ?
                            <i className="fa fa-exclamation-triangle"/> :
                            null
                          }
                          <ErrorMessage name={"d_maximos"} />
                          </div>
                        </div>
                      </div>
                      <Col sm="12">
                        <div className="form-group">
                          <label>
                            {" "}
                            Estado <span className="text-danger">*</span>{" "}
                          </label>
                          <div className="text-justify">
                            <CustomInput
                              name={"estado"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.estado}
                              type="checkbox"
                              id="ExampleInputCheckbox"
                              label="Si esta opción se encuentra activada, Representa que
                    el tipo de tramite es visible en el sistema y se podrán
                     realizar operaciones entre cada uno de los módulos
                     correspondientes de la aplicación. En caso contrario
                     la sede no se elimina del sistema solo quedará
                     inactiva e invisibles para cada uno de los módulos
                     correspondiente del sistema."
                              className={
                                errors.estado &&
                                touched.estado &&
                                "invalid-feedback"
                              }
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
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="p-2 mb-1 bg-light text-dark">
                    Usuarios disponibles
                  </div>
                  <div className="card-body">
                    <div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label> Conglomerado </label>
                              <SelectConglomerado 
                                name="conglomerado" 
                                value={values.conglomerado} 
                                onChange={(e) => {setFieldValue('conglomerado', e.target.value)}}
                                onBlur={() => {setFieldTouched('conglomerado', true)}}
                                className="form-control form-control-sm"
                              />
                            {/* <select className="form-control form-control-sm">
                              <option>Seleccione</option>
                            </select> */}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Empresa </label>
                            <SelectEmpresa 
                              idConglomerado={props.values.conglomerado}
                              name="empresa" 
                              value={values.empresa}
                              onChange={(e) => { setFieldValue("empresa", e.target.value)}}
                              onBlur={() => { setFieldTouched('empresa', true)}}
                              className={"form-control form-control-sm"}
                              />
                            {/* <select className="form-control form-control-sm">
                              <option>Seleccione</option>
                            </select> */}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label> Sede </label>
                            <SelectSede 
                              idEmpresa={props.values.empresa}
                              name="sede"
                              value={values.sede}
                              onChange={(e) => {setFieldValue('sede', e.target.value)}}
                              onBlur={() => {setFieldTouched('sede', true)}}
                              className="form-control form-control-sm"
                            />
                            {/* <select className="form-control form-control-sm">
                              <option>Seleccione</option>
                            </select> */}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label> Dependencia </label>
                            <SelectDependencia
                            idSede={props.values.sede} 
                            name="dependencia"
                            value={values.dependencia}
                            onChange={(e) => {setFieldValue('dependencia', e.target.value)}}
                            onBlur={() => { setFieldTouched('dependencia', true)}}
                            className={"form-control form-control-sm"}  />
                            {/* <select className="form-control form-control-sm">
                              <option>Seleccione</option>
                            </select> */}
                          </div>
                        </div>
                        <div className="col-md-12">
                            <UserList id={props.values.dependencia}  />
                          {/* <textarea
                            className="form-control form-control-sm"
                            disabled
                            placeholder="Usuarios disponibles de la consulta"
                            rows={8}
                          /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="p-2 mb-1 bg-light text-dark">
                    Usuarios disponibles
                  </div>
                  <div className="card-body">
                    <div>
                      <div className="row">
                        <div className="col-md-12">
                          <table className="table table-bordered table-sm">
                            <thead className="thead-light">
                              <tr className="text-center">
                                <th scope="col">Usuario</th>
                                <th scope="col">Sede</th>
                                <th scope="col">Dependencia</th>
                                <th scope="col">Original</th>
                                <th scope="col">Eliminar</th>
                              </tr>
                            </thead>
                            <tbody className="text-center">
                              <tr>
                                <td scope="row">NOMBRE COMPLETO DEL USUARIO</td>
                                <td>SEDE I</td>
                                <td>DEPENDENCIA I</td>
                                <td>
                                  <CustomInput
                                    type="radio"
                                    id="exampleCustomCheckbox2"
                                  />{" "}
                                </td>
                                <td>
                                  {" "}
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-danger"
                                  >
                                    <i className="fa fa-trash" />
                                  </button>{" "}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="card">
                  <div className="p-2 mb-1 bg-light text-dark">Asunto</div>
                  <div className="card-body">
                    <div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Asunto</label>
                            <textarea
                              name={"asunto"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.asunto}
                              className="form-control form-control-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="p-2 mb-1 bg-light text-dark">Plantilla</div>
                  <div className="card-body">
                    <div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Plantilla</label>
                            <select
                              name={"plantilla"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.plantilla}
                              className="form-control form-control-sm"
                            >
                              <option>Seleccione</option>
                              <option>Plantilla 1</option>
                              <option>Plantilla 2</option>
                              <option>Plantilla 3</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="p-2 mb-1 bg-light text-dark">Workflow</div>
                  <div className="card-body">
                    <div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Workflow</label>
                            <select
                              name={"workflow"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.workflow}
                              className="form-control form-control-sm"
                            >
                              <option>Seleccione</option>
                              <option>Workflow1</option>
                              <option>Workflow2</option>
                              <option>Workflow3</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
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
                    <i className="fa fa-save" /> Guardar
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default withFormik({
  mapPropsToValues: props => ({
    t_correspondencia: props.tipotramite.t_correspondencia,
    codigo: props.tipotramite.codigo,
    nombre: props.tipotramite.nombre,
    descripcion: props.tipotramite.descripcion,
    d_maximos: props.tipotramite.d_maximos,
    estado: props.tipotramite.estado,
    plantilla: props.tipotramite.plantilla,
    asunto: props.tipotramite.asunto,
    workflow: props.tipotramite.workflow,
    user_enabled: props.tipotramite.user_enabled, 
    conglomerado: props.tipotramite.conglomerado, 
    empresa: props.tipotramite.empresa, 
    sede: props.tipotramite.sede, 
    dependencia: props.tipotramite.dependencia
  }),
  validationSchema: Yup.object().shape({
    t_correspondencia: Yup.string()
      .ensure()
      .required(" Por favor seleccione el tipo de correspondencia."),
    codigo: Yup.string()
      .required(" Por favor introduzca un código.")
      .matches(/^[0-9a-zA-Z]+$/, " No es un codigo alfanumerico")
      .min(2, " minimo 2 caracteres para el codigo")
      .max(15, " maximo 15 caracteres para el codigo"),
    nombre: Yup.string()
      .required(" Por favor introduzca un nombre."),
    descripcion: Yup.string()
    .required(" Por favor introduzca una descripción."),
    d_maximos: Yup.number()
      .integer()
      .positive()
      .required(" Por favor introduzca los días máximos de respuesta."),
    estado: Yup.bool()
      .test(
        "Activo",
        "Es necesario activar el tipo de trámite",
        value => value === true
      )
      .required(" Es necesario activar el tipo de trámite."),
    user_enabled: Yup.array().of(
      Yup.object().shape({ id: Yup.number(), name: Yup.string() })
    ),
    asunto: Yup.string(),
    plantilla: Yup.string().ensure(),
    workflow: Yup.string().ensure(), 
    conglomerado: Yup.string().ensure(), 
    empresa: Yup.string().ensure(),
    sede: Yup.string().ensure(), 
    dependencia: Yup.string().ensure()
  }),
  handleSubmit: (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      resetForm();
    }, 1000);
  }
})(TipoTramite);

// Esta es la Seccion de los usuarios disponibles //

class SelectConglomerado extends React.Component {
  state = {
    dataConglomerado: []
  }

  componentDidMount() {
    this.getDataConglomerado();
  }

  getDataConglomerado = () => {
    fetch(`http://192.168.20.187:7000/api/sgdea/conglomerate`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", 
        Authorization: "Basic " + window.btoa('sgdea:123456')
      }
    }).then(response => response.json()).then(data => {
     this.setState({
       dataConglomerado: data
     })
    }).catch(err => console.log("Error", err))
  }

  handleChange = value => {
    this.props.onChange('conglomerado', value);
  }

  handleBlur = () => {
    this.props.onBlur('conglomerado', true);
  }

  render() {
    const data = this.state.dataConglomerado;
    return (
      <div>
        <select
          name={this.props.name}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          value={this.props.value}
          className={this.props.className}
        >
          <option value={" "}>-- Seleccione --</option>
          {data.map((aux, id) => {
            return (
              <option key={id} value={aux.id}>{aux.name}</option>
            )
          })}
        </select>
      </div>
    );
  }
}

class SelectEmpresa extends React.Component {
  state = {
    dataEmpresa: [], 
    id: this.props.idConglomerado
  }

  static getDerivedStateFormProps(props, state){
    if(props.idConglomerado !== state.id){
      return{
        id: props.idConglomerado
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.idConglomerado !== prevProps.idConglomerado){
      // Metodo
      this.getDataEmpresa();
    }
  }

  componentDidMount() {
    this.getDataEmpresa()
  }

  getDataEmpresa = () => {
    fetch(`http://192.168.20.187:7000/api/sgdea/company/conglomerate/${this.props.idConglomerado}`, {
      method: "GET", 
      headers: {
        "Content-Type":"application/json", 
        Authorization: "Basic " +  window.btoa('sgdea:123456')
      }
    }).then(response => response.json()).then(data => {
      this.setState({
        dataEmpresa: data
      })
     // console.log(data);
    }).catch(err => console.log("Error", err));
  }

  render() {
    return (
      <div>
        <select 
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          className={this.props.className}>
          <option value={" "}> -- Seleccione --  </option>
          {
            this.state.dataEmpresa.map((aux, id) => {
              return(
                <option key={id} value={aux.id}>{aux.name}</option>
              )
            })
          }
        </select>
      </div>
    );
  }

}

class SelectSede extends React.Component {
  state={
    dataSede: [], 
    id: this.props.idEmpresa
  }

   static getDerivedStateFormProps(props, state){
    if(props.idEmpresa !== state.id){
      return{
        id: props.idEmpresa
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.idEmpresa !== prevProps.idEmpresa){
      // Metodo
      this.getDataSede();
    }
  }

  componentDidMount() {
    this.getDataSede()
  }

  getDataSede = () => {
    fetch(`http://192.168.20.187:7000/api/sgdea/headquarter/company/${this.props.idEmpresa}`, {
      method:"GET",
      headers: {
        "Content-Type":"application/json", 
        Authorization: "Basic " +  window.btoa('sgdea:123456')
      }
    }).then(response => response.json()).then(data => {
      this.setState({
        dataSede: data
      })
    }).catch(err => console.log("Error", err))
  }

  render() {
    return (
      <div>
        <select
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          className={this.props.className}
        >
          <option>-- Seleccione --</option>
          {
            this.state.dataSede.map((aux, id ) => {
              return(
                <option key={id}  value={aux.id}>{aux.name}</option>
              )
            })
          }
        </select>
      </div>
    );
  }
}

class SelectDependencia extends React.Component {
  state = {
    dataDependencia: [], 
    id: this.props.idSede
  }

  static getDerivedStateFormProps(props, state){
    if(props.idSede !== state.id){
      return{
        id: props.idSede
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.idSede !== prevProps.idSede){
      // Metodo para actualizar
      this.getDataDependencia();
    }
  }

  componentDidMount() {
    // metodo para refrezcer el compomente
    this.getDataDependencia();
  }

  getDataDependencia = () => {
    fetch(`http://192.168.20.187:7000/api/sgdea/dependence/headquarter/${this.props.idSede}`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json", 
        Authorization: "Basic " + window.btoa('sgdea:123456')
      }
    }).then(response => response.json()).then(data => {
      this.setState({
        dataDependencia: data
      })
    }).catch(err => console.log("Error", err));
  }

  render() {
    return (
      <div>
        <select
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          className={this.props.className}
        >
          <option> -- Seleccione --   </option>
          {
            this.state.dataDependencia.map((aux, id) => {
              return (
                <option key={id}  value={aux.id}>{aux.name}</option>
              )
            })
          }
        </select>
      </div>
    );
  }
}

 function UserList(props) {

  const id = props.id;

  const [data, setdata] = useState([]);
  const firstUpdate = useRef(true);
  const dispatch = useDispatch();
  const AgregarUsuario = (user) => dispatch(agregarUserAction(user));

  const getDataUsers = () => {
    fetch(`http://192.168.20.187:7000/api/sgdea/user/dependence/${id}`,{
      method: "GET", 
      headers: {
        "Content-Type":"application/json", 
        Authorization: "Basic " + window.btoa('sgdea:123456')
      }
    }).then(response => response.json()).then(data => {
      setdata(data);
      console.log(data);
    }).catch(err => console.log("Error", err));
  };


  useEffect(() =>{
    if(firstUpdate.current){
      firstUpdate.current = false;
      return;
    }
      fetch(`http://192.168.20.187:7000/api/sgdea/user/dependence/${id}`,{
      method: "GET", 
      headers: {
        "Content-Type":"application/json", 
        Authorization: "Basic " + window.btoa('sgdea:123456')
      }
    }).then(response => response.json()).then(data => {
      setdata(data);
      console.log(data);
    }).catch(err => console.log("Error", err));
  console.log("componentDidUpdate");
  }, [id]);

  console.log(id);
 
  return (
    <div>
        {/* <div className="form-group">
            <label> Buscar usuario <span className="text-danger">*</span> </label>
            <div className="input-group input-group-sm">
              <input
                type="text"
                className="form-control form-control-sm"
                aria-label="Dollar amount (with dot and two decimal places)"
              />
              <div
                className="input-group-append"
                id="button-addon4"
              >
                <button
                  className="btn btn-secondary"
                  type="button"
                >
                  <i className="fa fa-search" />
                </button>
                
              </div>
            </div>
          </div> */}
         <div style={{ height: "140px", overflow: "scroll", overflowX: "hidden", border: "1px solid #e3e3e3", background: "#e3e3e3", padding: "10px"}}>
            {data.length > 0 ? (data.map((aux, id) => {
            return(
              <ul className="list-unstyled">
               <li className="media">
                <img className="mr-2" src="https://via.placeholder.com/40" alt="Generic placeholder image"/> 
                <div className="media-body">
                  <p className="mt-0 mb-1">{aux.name}</p>
                  <Button 
                    style={{marginTop: "-13px", marginLeft: "-12px"}}  
                    color={"link"} 
                   onClick={() => AgregarUsuario({aux})}>
                  
                      <h6 className="badge badge-secondary">agregar</h6>   
                  </Button>
                </div>
              </li>
              </ul>
            )
          })): <p>Seleccione los usuarios asignar</p>  }
         </div>
      </div>
  );
}

// Fin de la Seccion //