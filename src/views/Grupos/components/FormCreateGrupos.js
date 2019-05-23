import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  CardText,
  CardTitle,
  CustomInput
} from "reactstrap";
const dataGrupouser=[
{
conglomerado:"conglomerado1",
empresa:"empresa1",
sede:"sede1",
dependencia:"dependencia1",
id:1,
nombre:"nombreUsuario"
},
{
  conglomerado:"conglomerado2",
  empresa:"empresa2",
  sede:"sede2",
  dependencia:"dependencia2",
  id:2,
  nombre:"nombreUsuario"
  },
  {
    conglomerado:"conglomerado3",
    empresa:"empresa3",
    sede:"sede3",
    dependencia:"dependencia3",
    id:3,
    nombre:"nombreUsuario"
    },
    {
      conglomerado:"conglomerado4",
      empresa:"empresa4",
      sede:"sede4",
      dependencia:"dependencia4",
      id:4,
      nombre:"nombreUsuario"
      },
      {
        conglomerado:"conglomerado5",
        empresa:"empresa5",
        sede:"sede5",
        dependencia:"dependencia5",
        id:5,
        nombre:"nombreUsuario"
        }
]

class FormCreateGrupos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataOk: false,
      items:dataGrupouser
    };
  }



  render() {
    const {dataOk, items} = this.state;
    const tryrhis = items.map(item => (
          <option key={item.id}>
            Name: {item.nombre} - Id: {item.id}
          </option>
        ))

    return (
      <div className="animated fadeIn">
        <div className="container">
          <Row>
            <Col sm="8" md={{ offset: 2 }}>
              <Card>
                <CardHeader> Registro grupo de usuarios </CardHeader>
                <CardBody>
                  <form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {" "}
                            Código <span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {" "}
                            Nombre <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>
                            {" "}
                            Descripción <span className="text-danger">
                              *{" "}
                            </span>{" "}
                          </label>
                          <textarea className="form-control form-control-sm" />
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="row">
                    <div className="col-md-12">
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
                                  <select className="form-control form-control-sm">
                                    {" "}
                                    <option> Seleccione </option>{" "}
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div className="form-group">
                                  <label>
                                    {" "}
                                    Empresa{" "}
                                    <span className="text-danger">*</span>{" "}
                                  </label>
                                  <select className="form-control form-control-sm">
                                    {" "}
                                    <option> Seleccione </option>{" "}
                                  </select>
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
                                  <select className="form-control form-control-sm">
                                    {" "}
                                    <option> Seleccione </option>{" "}
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div className="form-group">
                                  <label>
                                    {" "}
                                    Dependencia{" "}
                                    <span className="text-danger">*</span>{" "}
                                  </label>
                                  <select className="form-control form-control-sm">
                                    {" "}
                                    <option> Seleccione </option>{" "}
                                  </select>
                                </div>
                              </div>
                            </div>

                            {dataOk ? (
                                <div className="form-group">
                                  <label>Usuarios disponibles</label>
                                  <select className="form-control form-control-sm"  multiple >
                                  {tryrhis}
                                  </select>

                                </div>
                            ) : null}

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
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>
                          {" "}
                          Seleccione usuario(s) asignados{" "}
                          <span className="text-danger">*</span>{" "}
                        </label>
                        <select className="form-control form-control-sm">
                          {" "}
                          <option> Seleccione </option>{" "}
                        </select>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <div className="">
                          <div className="form-group">
                            <label>
                              {" "}
                              Estado <span className="text-danger">*</span>{" "}
                            </label>
                            <div className="">
                              <CustomInput
                                type="checkbox"
                                id="ExampleCheckBoxInput"
                                label="Si esta opción se encuentra activada, Representa
                                que el grupo es visible en el sistema y se
                                podrán realizar operaciones entre cada uno de
                                los módulos correspondientes de la aplicación.
                                En caso contrario el grupo no se elimina del
                                sistema solo quedará inactiva e invisibles para
                                cada uno de los módulos correspondiente del
                                sistema"
                              />
                              {/* <label
                                className="form-check-label"
                                htmlFor="exampleCheck1"
                              >
                                Activar
                              </label> */}
                              {/* <p
                                className="text-muted"
                                style={{ textAlign: "justify" }}
                              >
                                Si esta opción se encuentra activada, Representa
                                que el grupo es visible en el sistema y se
                                podrán realizar operaciones entre cada uno de
                                los módulos correspondientes de la aplicación.
                                En caso contrario el grupo no se elimina del
                                sistema solo quedará inactiva e invisibles para
                                cada uno de los módulos correspondiente del
                                sistema
                              </p> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="float-right">
                    <button type="button" className="btn btn-secondary btn-sm">
                      {" "}
                      <i className="fa fa-plus" /> Registrar{" "}
                    </button>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default FormCreateGrupos;
