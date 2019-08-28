import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Collapse
} from "reactstrap";
import IMGSEDE from "./../../../assets/img/teamwork.svg";

class ModalViewSedes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalview,
      collapse: false,
      id: this.props.id,
      dataSedes: {},
      dataEmpresa: {},
      dataConglomerado: {},
      dataCiudad: {},
      dataDepartamento: {},
      dataCargo: {},
      dataPais: {}
    };
  }

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
    fetch(`http://192.168.10.180:7000/api/sgdea/headquarter/${id}/ccuartas`, {
      method: "GET",
      headers: {
        Authorization: "Basic " + window.btoa("sgdea:123456"),
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.charge);
        this.setState({
          dataSedes: data,
          dataEmpresa: data.company,
          dataConglomerado: data.company.conglomerate,
          dataCiudad: data.city,
          dataDepartamento: data.city.department,
          dataPais: data.city.department.country,
          dataCargo: data.charge
        });
      })
      .catch(Error => console.log(" ", Error));
  };

  toggleCollapse = () => {
    this.setState({ collapse: !this.state.collapse, collapse2: false });
  };

  render() {
    const dataSede = this.state.dataSedes;
    const dataEmpresa = this.state.dataEmpresa;
    const dataConglomerado = this.state.dataConglomerado;
    const dataPais = this.state.dataPais;
    const dataDepartamento = this.state.dataDepartamento;
    const dataCiudad = this.state.dataCiudad;

    const CargoInfo = () => {
      const data = this.state.dataCargo;
      let status;
      if (data === null)
        status = <b className="text-danger">No hay cargos asociados.</b>;
      else if (data !== null) {
        status = <div>{data.name}</div>;
      }
      return status;
    };

    const statusHeadquarter = data => {
      let status;
      if (data === 1) {
        status = <b className="text-success"> Activo </b>;
      } else if (data === 0) {
        status = <b className="text-danger"> Inactivo </b>;
      }
      return status;
    };
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader> Sede {this.state.dataSedes.name} </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGSEDE} className="img-thumbnail" />
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
                        <dt>Conglomerado </dt>
                        <dd>{dataConglomerado.name}</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Empresa </dt>
                        <dd>{dataEmpresa.name}</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Código </dt>
                        <dd> {dataSede.code}</dd>
                      </dl>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Nombre </dt>
                        <dd> {dataSede.name}</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Descripción </dt>
                        <dd> {dataSede.description}</dd>
                      </dl>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Prefijo de radicación </dt>
                        <dd> {dataSede.prefix}</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Secuencia de radicación </dt>
                        <dd>{dataSede.sequence} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Estado </dt>
                        <dd> {statusHeadquarter(dataSede.status)}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm="12">
                <Card>
                  <CardHeader>
                    {" "}
                    <a
                      onClick={() => {
                        this.toggleCollapse();
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {" "}
                      Más información{" "}
                    </a>{" "}
                  </CardHeader>
                  <Collapse isOpen={this.state.collapse}>
                    <CardBody>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <dl className="param">
                              <dt>País </dt>
                              <dd> {dataPais.name}</dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <dl className="param">
                              <dt>Departamento </dt>
                              <dd> {dataDepartamento.name}</dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <dl className="param">
                              <dt>Ciudad </dt>
                              <dd> {dataCiudad.name}</dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <dl className="param">
                              <dt>Dirección </dt>
                              <dd> {dataSede.address}</dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <dl className="param">
                              <dt>Teléfono </dt>
                              <dd> {dataSede.phone}</dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <dl className="param">
                              <dt>Cargo responsable </dt>
                              <dd> {CargoInfo()}</dd>
                            </dl>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <dl className="param">
                              <dt> Fecha de creación </dt>
                              <dd>{dataSede.createdAt} </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <dl className="param">
                              <dt>Fecha de modificación </dt>
                              <dd> {dataSede.updateAt}</dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Collapse>
                </Card>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              {" "}
              <i className="fa fa-times" /> Cerrar{" "}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewSedes.propTypes = {
  modalview: PropTypes.bool.isRequired
};

export default ModalViewSedes;
