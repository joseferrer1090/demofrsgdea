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
  Col,
  Collapse
} from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import IMGCONGLOMERADO from './../../../assets/img/puzzle.svg';
import { es } from 'date-fns/esm/locale';

class ModalViewConglomerado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalviewstate,
      id: this.props.id,
      dataConglomerado: {},
      dataPais: {},
      dataDepartamento: {},
      dataCiudad: {},
      collapase: false
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
        this.setState({
          dataConglomerado: data,
          dataPais: data.city.department.country,
          dataDepartamento: data.city.department,
          dataCiudad: data.city
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

  render() {
    // console.log(this.state.id);
    // console.log(this.state.dataConglomerado);
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
            Conglomerado {this.state.dataConglomerado.name}{' '}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGCONGLOMERADO} className="img-thumbnail" />
              </Col>
              <Col sm="9">
                <div className="">
                  {' '}
                  <h5 className="" style={{ borderBottom: '1px solid black' }}>
                    {' '}
                    Datos{' '}
                  </h5>{' '}
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt> Código </dt>
                        <dd> {this.state.dataConglomerado.code} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt> Nombre </dt>
                        <dd> {this.state.dataConglomerado.name} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt> Descripción </dt>
                        <dd> {this.state.dataConglomerado.description} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt> Estado </dt>
                        <dd>
                          {' '}
                          {statusConglomerado(
                            this.state.dataConglomerado.status
                          )}{' '}
                        </dd>
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
                        <div className="col-md-6">
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
                        <div className="col-md-6">
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
              <i className="fa fa-times" /> Cerrar{' '}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewConglomerado.propTypes = {
  modalviewstate: PropTypes.bool.isRequired
};

export default ModalViewConglomerado;
