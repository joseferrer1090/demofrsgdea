import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col
} from 'reactstrap';
import IMGPackage from './../../../assets/img/package.svg';
import PropTypes from 'prop-types';
import moment from 'moment';

class ModalViewTipoLlegada extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalview,
      id: this.props.id,
      dataTipoLlegada: {},
      t: this.props.t,
      username: 'ccuartas'
    };
  }

  toggle = id => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      id: id
    }));
    fetch(
      `http://192.168.10.180:7000/api/sgdea/typeshipmentarrival/${id}?username=${this.state.username}`,
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
          dataTipoLlegada: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };
  FechaCreacionTipoLlegada(data) {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format('YYYY-MM-DD, h:mm:ss a');
  }
  FechaModificacionTipoLlegada(data) {
    let updatedAt;
    updatedAt = new Date(data);
    // moment.locale(es);
    return moment(updatedAt).format('YYYY-MM-DD, h:mm:ss a');
  }
  render() {
    const statusTipoLlegada = data => {
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
    const code = this.state.dataTipoLlegada.code;
    const createdAt = this.state.dataTipoLlegada.createdAt;
    const description = this.state.dataTipoLlegada.description;
    const id = this.state.dataTipoLlegada.id;
    const name = this.state.dataTipoLlegada.name;
    const status = this.state.dataTipoLlegada.status;
    const updatedAt = this.state.dataTipoLlegada.updatedAt;
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {this.props.t('app_tipoLlegada_modal_ver_titulo')} {name}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGPackage} />
              </Col>
              <Col sm="9">
                <div className="">
                  {' '}
                  <h5 className="" style={{ borderBottom: '1px solid black' }}>
                    {' '}
                    {this.props.t('app_tipoLlegada_modal_ver_titulo_2')}{' '}
                  </h5>{' '}
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          {this.props.t('app_tipoLlegada_modal_ver_codigo')}{' '}
                        </dt>
                        <dd> {code} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          {this.props.t('app_tipoLlegada_modal_ver_nombre')}{' '}
                        </dt>
                        <dd> {name} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          {this.props.t(
                            'app_tipoLlegada_modal_ver_descripcion'
                          )}{' '}
                        </dt>
                        <dd> {description} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          {this.props.t('app_tipoLlegada_modal_ver_estado')}{' '}
                        </dt>
                        <dd> {statusTipoLlegada(status)} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          {this.props.t(
                            'app_tipoLlegada_modal_ver_fecha_creacion'
                          )}{' '}
                        </dt>
                        <dd>{this.FechaCreacionTipoLlegada(createdAt)}</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          {this.props.t(
                            'app_tipoLlegada_modal_ver_fecha_modificacion'
                          )}{' '}
                        </dt>
                        <dd>
                          {' '}
                          {this.FechaModificacionTipoLlegada(updatedAt)}{' '}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
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
              {this.props.t('app_tipoLlegada_modal_ver_button_cerrar')}{' '}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewTipoLlegada.propTypes = {
  modalview: PropTypes.bool.isRequired
};

export default ModalViewTipoLlegada;
