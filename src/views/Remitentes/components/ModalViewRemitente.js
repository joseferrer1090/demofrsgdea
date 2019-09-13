import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Button,
  Row,
  Col,
  Collapse,
  Card,
  CardHeader,
  CardBody
} from 'reactstrap';
import IMGPROFILE from './../../../assets/img/profile.svg';
import moment from 'moment';

class ModalViewRemitente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalview,
      collapse: false,
      id: this.props.id,
      userLogged: 'ccuartas',
      dataTercero: {},
      datTipoTecero: {}
    };
  }

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
    fetch(`http://192.168.10.180:7000/api/sgdea/thirdparty/${id}/ccuartas`, {
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
          dataTercero: data,
          datTipoTecero: data.typeThirdParty
        });
      })
      .catch(Error => console.log(Error));
  };

  toggleCollapse = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  FechaCreacionTerceros(data) {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format('YYYY-MM-DD, h:mm:ss a');
  }
  FechaModificacionTerceros(data) {
    let updatedAt;
    updatedAt = new Date(data);
    // moment.locale(es);
    return moment(updatedAt).format('YYYY-MM-DD, h:mm:ss a');
  }

  render() {
    const statusTercero = data => {
      let status;
      if (data === 1) {
        return (status = <b className="text-success"> Activo</b>);
      } else if (data === 0) {
        return (status = <b className="text-danger"> Inactivo </b>);
      }
      return status;
    };
    const elementoComunicacion = data => {
      let elemento;
      if (data === 1) {
        return (elemento = <p> Remitente</p>);
      } else if (data === 2) {
        return (elemento = <p>Destinatario</p>);
      } else if (data === 3) {
        return (elemento = <p>Mixto</p>);
      }
      return elemento;
    };
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>Tercero {this.state.dataTercero.name}</ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGPROFILE} className="img-thumbnail" />
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
                        <dt>Tipo de tercero </dt>
                        <dd> {this.state.datTipoTecero.name} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Elemento de comunicación </dt>
                        <dd>
                          {' '}
                          {elementoComunicacion(
                            this.state.dataTercero.communicationElement
                          )}{' '}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Identificación </dt>
                        <dd> {this.state.dataTercero.identification} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Nombre </dt>
                        <dd> {this.state.dataTercero.name}</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>E-mail </dt>
                        <dd> {this.state.dataTercero.email} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt> Estado </dt>
                        <dd>
                          {' '}
                          {statusTercero(this.state.dataTercero.status)}{' '}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </Col>
              <Col sm="12">
                <Card>
                  <CardHeader>
                    {' '}
                    <a
                      onClick={this.toggleCollapse}
                      style={{ cursor: 'pointer' }}
                    >
                      {' '}
                      Más información{' '}
                    </a>{' '}
                  </CardHeader>
                  <Collapse isOpen={this.state.collapse}>
                    <CardBody>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <dl className="param">
                              <dt>Teléfono fijo </dt>
                              <dd> {this.state.dataTercero.landline} </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <dl className="param">
                              <dt>Teléfono celular </dt>
                              <dd> {this.state.dataTercero.cellPhone} </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <dl className="param">
                              <dt>Dirección </dt>
                              <dd> {this.state.dataTercero.address}</dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <dl className="param">
                              <dt>Ciudad </dt>
                              <dd> </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <dl className="param">
                              <dt>Referencia </dt>
                              <dd> {this.state.dataTercero.reference} </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <dl className="param">
                              <dt>Observación </dt>
                              <dd> {this.state.dataTercero.observation} </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <dl className="param">
                              <dt>Fecha de creación </dt>
                              <dd>
                                {' '}
                                {this.FechaCreacionTerceros(
                                  this.state.dataTercero.createdAt
                                )}{' '}
                              </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <dl className="param">
                              <dt>Fecha de modificación </dt>
                              <dd>
                                {' '}
                                {this.FechaModificacionTerceros(
                                  this.state.dataTercero.updatedAt
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
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              <i className="fa fa-times" /> Cerrar
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewRemitente.propTypes = {
  modalview: PropTypes.bool.isRequired
};

export default ModalViewRemitente;
