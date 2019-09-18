import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Collapse
} from 'reactstrap';
import IMGAUDITORIA from './../../../assets/img/auditoria.svg';
import moment from 'moment';

class ModalViewAuditoria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      modal: this.props.modalview,
      collapse: false,
      username: 'ccuartas',
      dataModulo: {},
      dataAccion: {},
      dataEntidad: {},
      dataAudit: {}
    };
  }

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
    fetch(
      `http://192.168.10.180:7000/api/sgdea/audit/${id}?username=${this.state.username}`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Basic ' + window.btoa('sgdea:123456'),
          'Content-Type': 'application/json'
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          dataAudit: data,
          dataModulo: data.pageAction.pageEntity.pageModule,
          dataEntidad: data.pageAction.pageEntity,
          dataAccion: data.pageAction
        });
      })
      .catch(Error => console.log(' ', Error));
  };

  toggleCollapse = () => {
    this.setState({
      collapase: !this.state.collapase
    });
  };

  FechaAuditoria(data) {
    let date;
    date = new Date(data);
    return moment(date).format('YYYY-MM-DD, h:mm:ss a');
  }

  render() {
    const dataAudit = this.state.dataAudit;
    const dataModulo = this.state.dataModulo;
    const dataEntidad = this.state.dataEntidad;
    const dataAccion = this.state.dataAccion;
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader> Detalle de la auditoría </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGAUDITORIA} className="img-thumbnail" />
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
                        <dt>Fecha de la auditoría </dt>
                        <dd>{this.FechaAuditoria(dataAudit.date)} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Módulo</dt>
                        <dd>{dataModulo.name} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Entidad </dt>
                        <dd>{dataEntidad.name} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Acción </dt>
                        <dd> {dataAccion.name} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Usuario que realizo la acción </dt>
                        <dd> {dataAudit.username}</dd>
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
                              <dt>Valores viejos </dt>
                              <dd>
                                {' '}
                                <code>{dataAudit.valueOld} </code>
                              </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <dl className="param">
                              <dt> Valores nuevos </dt>
                              <dd>
                                {' '}
                                <code>{dataAudit.valueNew} </code>
                              </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <dl className="param">
                              <dt> Url </dt>
                              <dd> {dataAudit.url}</dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <dl className="param">
                              <dt> Ip </dt>
                              <dd> {dataAudit.ip} </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <dl className="param">
                              <dt> Agente de usuario </dt>
                              <dd> {dataAudit.userAgent} </dd>
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
              <i className="fa fa-times" /> Cerrar{' '}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewAuditoria.propTypes = {
  modalview: PropTypes.bool.isRequired
};

export default ModalViewAuditoria;
