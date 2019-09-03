import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Row,
<<<<<<< HEAD
  Col
} from "reactstrap";
import PropTypes from "prop-types";
import IMGCONGLOMERADO from "./../../../assets/img/puzzle.svg";
import { Trans } from "react-i18next";
=======
  Col,
  Collapse
} from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import IMGCONGLOMERADO from './../../../assets/img/puzzle.svg';
import { es } from 'date-fns/esm/locale';
>>>>>>> bbadc5fd4a3b3bd367ac75e712f1935d00cbbcf8

class ModalViewConglomerado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalviewstate,
      id: this.props.id,
      dataConglomerado: {},
<<<<<<< HEAD
      t: this.props.t
=======
      dataPais: {},
      dataDepartamento: {},
      dataCiudad: {},
      collapase: false,
      dataCharge: {}
>>>>>>> bbadc5fd4a3b3bd367ac75e712f1935d00cbbcf8
    };
  }
  toggleCollapse = () => {
    this.setState({
      collapase: !this.state.collapase
    });
  };
  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
    fetch(`http://192.168.10.180:7000/api/sgdea/conglomerate/${id}/ccuartas`, {
      method: 'GET',
      headers: {
        Authorization: 'Basic ' + window.btoa('sgdea:123456'),
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          dataConglomerado: data,
          dataPais: data.city.department.country,
          dataDepartamento: data.city.department,
          dataCiudad: data.city,
          dataCharge: data.charge
        });
      })
      .catch(Error => console.log(' ', Error));
  };

  FechaCreacionConglomerado(data) {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format('YYYY-MM-DD, h:mm:ss a');
  }
  FechaModificacionConglomerado(data) {
    let updatedAt;
    updatedAt = new Date(data);
    // moment.locale(es);
    return moment(updatedAt).format('YYYY-MM-DD, h:mm:ss a');
  }

  CargoInfo = () => {
    const data = this.state.dataCharge;
    let status;
    if (data === null)
      status = <b className="text-danger">No hay cargos asociados.</b>;
    else if (data !== null) {
      status = <div>{data.name}</div>;
    }
    return status;
  };

  render() {
    const statusConglomerado = data => {
      let status;
      if (data === 1) {
        status = <b className="text-success"> Activo </b>;
      } else if (data === 0) {
        status = <b className="text-danger"> Inactivo </b>;
      }
      return status;
    };
    const dataPais = this.state.dataPais;
    const dataDepartamento = this.state.dataDepartamento;
    const dataCiudad = this.state.dataCiudad;
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
<<<<<<< HEAD
            <Trans>{this.props.t("app_conglomerado_modal_ver_titulo")}</Trans>{" "}
            {this.state.dataConglomerado.name}{" "}
=======
            Conglomerado {this.state.dataConglomerado.name}{' '}
>>>>>>> bbadc5fd4a3b3bd367ac75e712f1935d00cbbcf8
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGCONGLOMERADO} className="img-thumbnail" />
              </Col>
              <Col sm="9">
                <div className="">
<<<<<<< HEAD
                  {" "}
                  <h5 className="" style={{ borderBottom: "1px solid black" }}>
                    {" "}
                    <Trans>
                      {this.props.t("app_conglomerado_modal_ver_titulo_2")}
                    </Trans>{" "}
                  </h5>{" "}
=======
                  {' '}
                  <h5 className="" style={{ borderBottom: '1px solid black' }}>
                    {' '}
                    Datos{' '}
                  </h5>{' '}
>>>>>>> bbadc5fd4a3b3bd367ac75e712f1935d00cbbcf8
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          {" "}
                          {this.props.t(
                            "app_conglomerado_modal_ver_codigo"
                          )}{" "}
                        </dt>
                        <dd> {this.state.dataConglomerado.code} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          {" "}
                          {this.props.t(
                            "app_conglomerado_modal_ver_nombre"
                          )}{" "}
                        </dt>
                        <dd> {this.state.dataConglomerado.name} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          {" "}
                          {this.props.t(
                            "app_conglomerado_modal_ver_descripcion"
                          )}{" "}
                        </dt>
                        <dd> {this.state.dataConglomerado.description} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          {" "}
                          {this.props.t(
                            "app_conglomerado_modal_ver_estado"
                          )}{" "}
                        </dt>
                        <dd>
                          {' '}
                          {statusConglomerado(
                            this.state.dataConglomerado.status
                          )}{' '}
                        </dd>
                      </dl>
                    </div>
                  </div>
<<<<<<< HEAD
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          {this.props.t(
                            "app_conglomerado_modal_ver_fecha_creacion"
                          )}{" "}
                        </dt>
                        <dd> {this.state.dataConglomerado.createdAt} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          {this.props.t(
                            "app_conglomerado_modal_ver_fecha_modificacion"
                          )}{" "}
                        </dt>
                        <dd> {this.state.dataConglomerado.updatedAt} </dd>
                      </dl>
                    </div>
                  </div>
=======
>>>>>>> bbadc5fd4a3b3bd367ac75e712f1935d00cbbcf8
                </div>
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm="12">
                <Card>
                  <CardHeader>
                    {' '}
                    <a
                      onClick={() => {
                        this.toggleCollapse();
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {' '}
                      Más información{' '}
                    </a>{' '}
                  </CardHeader>
                  <Collapse isOpen={this.state.collapase}>
                    <CardBody>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <dl className="param">
                              <dt> País </dt>
                              <dd> {dataPais.name} </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <dl className="param">
                              <dt> Departamento </dt>
                              <dd> {dataDepartamento.name} </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <dl className="param">
                              <dt> Ciudad </dt>
                              <dd> {dataCiudad.name} </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <dl className="param">
                              <dt> Cargo responsable </dt>
                              <dd> {this.CargoInfo()} </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <dl className="param">
                              <dt> Fecha de creación </dt>
                              <dd>
                                {' '}
                                {this.FechaCreacionConglomerado(
                                  this.state.dataConglomerado.createdAt
                                )}{' '}
                              </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <dl className="param">
                              <dt> Fecha de modificación </dt>
                              <dd>
                                {' '}
                                {this.FechaModificacionConglomerado(
                                  this.state.dataConglomerado.updatedAt
                                )}{' '}
                              </dd>
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
            <Button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
<<<<<<< HEAD
              <i className="fa fa-times" />{" "}
              {this.props.t("app_conglomerado_modal_ver_botom")}{" "}
=======
              <i className="fa fa-times" /> Cerrar{' '}
>>>>>>> bbadc5fd4a3b3bd367ac75e712f1935d00cbbcf8
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewConglomerado.propTypes = {
  modalviewstate: PropTypes.bool.isRequired,
  t: PropTypes.any
};

export default ModalViewConglomerado;
