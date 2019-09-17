import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Row,
  Col
} from 'reactstrap';
import IMGPAIS from './../../../assets/img/flag.svg';
import moment from 'moment';
class ModalViewPais extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalview,
      dataPais: {},
      id: this.props.id,
      t: this.props.t,
      username: 'ccuartas'
    };
  }

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
    fetch(
      `http://192.168.10.180:7000/api/sgdea/country/${id}?username=${this.state.username}`,
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
        this.setState({
          dataPais: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };

  FechaCreacionPais(data) {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format('YYYY-MM-DD, h:mm:ss a');
  }
  FechaModificacionPais(data) {
    let updatedAt;
    updatedAt = new Date(data);
    // moment.locale(es);
    return moment(updatedAt).format('YYYY-MM-DD, h:mm:ss a');
  }

  render() {
    const statusCountry = data => {
      let status;
      if (data === 1) {
        status = (
          <b className="text-success">
            {' '}
            {this.props.t('app_tablas_estado_activo')}{' '}
          </b>
        );
      } else if (data === 0) {
        status = (
          <b className="text-danger">
            {' '}
            {this.props.t('app_tablas_estado_inactivo')}{' '}
          </b>
        );
      }
      return status;
    };
    const code = this.state.dataPais.code;
    const name = this.state.dataPais.name;
    const status = this.state.dataPais.status;
    const createdAt = this.state.dataPais.createdAt;
    const updatedAt = this.state.dataPais.updatedAt;
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {' '}
            {this.props.t('app_pais_modal_ver_titulo')} {name}{' '}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGPAIS} className="img-thumbnail" />
              </Col>
              <Col sm="9">
                <div className="">
                  {' '}
                  <h5 className="" style={{ borderBottom: '1px solid black' }}>
                    {' '}
                    {this.props.t('app_pais_modal_ver_titulo_2')}{' '}
                  </h5>{' '}
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt> {this.props.t('app_pais_modal_ver_codigo')} </dt>
                        <dd> {code} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt> {this.props.t('app_pais_modal_ver_nombre')} </dt>
                        <dd> {name} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt> {this.props.t('app_pais_modal_ver_estado')} </dt>
                        <dd> {statusCountry(status)} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          {' '}
                          {this.props.t(
                            'app_pais_modal_ver_fecha_creacion'
                          )}{' '}
                        </dt>
                        <dd> {this.FechaCreacionPais(createdAt)} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          {' '}
                          {this.props.t(
                            'app_pais_modal_ver_fecha_modificacion'
                          )}{' '}
                        </dt>
                        <dd> {this.FechaModificacionPais(updatedAt)} </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              {' '}
              <i className="fa fa-times" />{' '}
              {this.props.t('app_pais_modal_ver_button_cerrar')}{' '}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewPais.propTypes = {
  modalview: PropTypes.bool.isRequired,
  t: PropTypes.any
};

export default ModalViewPais;
