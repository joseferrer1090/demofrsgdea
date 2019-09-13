import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Row,
  Col,
  Collapse,
  Card,
  CardBody,
  CardFooter,
  CardHeader
} from 'reactstrap';
import IMGCOMPANY from './../../../assets/img/company.svg';
import moment from 'moment';

class ModalViewEmpresa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalviewempresa,
      collapase: false,
      id: this.props.id,
      dataCompany: {},
      dataCompanyConglomerate: {},
      dataCargo: {},
      dataPais: {},
      dataDepartamento: {},
      dataCiudad: {},
      t: this.props.t
    };
  }

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
    fetch(`http://192.168.10.180:7000/api/sgdea/company/${id}/jferrer`, {
      method: 'GET',
      headers: {
        Authorization: 'Basic ' + window.btoa('sgdea:123456'),
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataCompany: data,
          dataCompanyConglomerate: data.conglomerate,
          dataCargo: data.charge,
          dataPais: data.city.department.country,
          dataDepartamento: data.city.department,
          dataCiudad: data.city
        });
      })
      .catch(Error => console.log(Error));
  };

  toggleCollapse = () => {
    this.setState({
      collapase: !this.state.collapase
    });
  };
  FechaCreacionCompany(data) {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format('YYYY-MM-DD, h:mm:ss a');
  }
  FechaModificacionCompany(data) {
    let updatedAt;
    updatedAt = new Date(data);
    // moment.locale(es);
    return moment(updatedAt).format('YYYY-MM-DD, h:mm:ss a');
  }

  render() {
    const company = this.state.dataCompany;
    const companyconglomerate = this.state.dataCompanyConglomerate;
    // console.log(company);
    // console.log(companyconglomerate);
    const statusCompany = data => {
      let status;
      if (data === 1) {
        status = (
          <b className="text-success">
            {this.props.t('app_tablas_estado_activo')}
          </b>
        );
      } else if (data === 0) {
        status = (
          <b className="text-danger">
            {this.props.t('app_tablas_estado_inactivo')}
          </b>
        );
      }
      return status;
    };

    const CargoInfo = () => {
      const data = this.state.dataCargo;
      let status;
      if (data === null)
        status = (
          <b className="text-danger">{this.props.t('app_modals_sin_cargo')}</b>
        );
      else if (data !== null) {
        status = <div>{data.name}</div>;
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
            {this.props.t('app_empresa_modal_ver_titulo')} {company.name}{' '}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGCOMPANY} className="img-thumbnail" />
              </Col>
              <Col sm="9">
                <div className="">
                  {' '}
                  <h5 className="" style={{ borderBottom: '1px solid black' }}>
                    {' '}
                    {this.props.t('app_empresa_modal_ver_titulo_2')}{' '}
                  </h5>{' '}
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          {this.props.t('app_empresa_modal_ver_conglomerado')}{' '}
                        </dt>
                        <dd>{companyconglomerate.name}</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>{this.props.t('app_empresa_modal_ver_codigo')} </dt>
                        <dd> {company.code} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>{this.props.t('app_empresa_modal_ver_nit')} </dt>
                        <dd>{company.nit} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>{this.props.t('app_empresa_modal_ver_nombre')} </dt>
                        <dd>{company.name}</dd>
                      </dl>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          {this.props.t('app_empresa_modal_ver_descripcion')}{' '}
                        </dt>
                        <dd>{company.description}</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>{this.props.t('app_empresa_modal_ver_estado')} </dt>
                        <dd>{statusCompany(company.status)}</dd>
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
                      {this.props.t('app_empresa_modal_ver_collapse')}{' '}
                    </a>{' '}
                  </CardHeader>
                  <Collapse isOpen={this.state.collapase}>
                    <CardBody>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <dl className="param">
                              <dt>
                                {' '}
                                {this.props.t(
                                  'app_empresa_modal_ver_pais'
                                )}{' '}
                              </dt>
                              <dd> {dataPais.name} </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <dl className="param">
                              <dt>
                                {' '}
                                {this.props.t(
                                  'app_empresa_modal_ver_departamento'
                                )}{' '}
                              </dt>
                              <dd> {dataDepartamento.name} </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <dl className="param">
                              <dt>
                                {' '}
                                {this.props.t(
                                  'app_empresa_modal_ver_ciudad'
                                )}{' '}
                              </dt>
                              <dd> {dataCiudad.name} </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <dl className="param">
                              <dt>
                                {this.props.t(
                                  'app_empresa_modal_ver_cargo_responsable'
                                )}{' '}
                              </dt>
                              <dd> {CargoInfo()}</dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <dl className="param">
                              <dt>
                                {' '}
                                {this.props.t(
                                  'app_empresa_modal_ver_fecha_creacion'
                                )}{' '}
                              </dt>
                              <dd>
                                {' '}
                                {this.FechaCreacionCompany(
                                  company.createdAt
                                )}{' '}
                              </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <dl className="param">
                              <dt>
                                {' '}
                                {this.props.t(
                                  'app_empresa_modal_ver_fecha_modificacion'
                                )}{' '}
                              </dt>
                              <dd>
                                {' '}
                                {this.FechaModificacionCompany(
                                  company.updatedAt
                                )}
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
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              {' '}
              <i className="fa fa-times" />{' '}
              {this.props.t('app_empresa_modal_ver_boton_cerrar')}{' '}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewEmpresa.propTypes = {
  modalviewempresa: PropTypes.bool.isRequired,
  t: PropTypes.any
};

export default ModalViewEmpresa;
