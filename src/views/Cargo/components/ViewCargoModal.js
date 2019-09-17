import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Card,
  CardHeader,
  Collapse,
  CardBody,
  Table
} from 'reactstrap';
import PropTypes from 'prop-types';
import IMGCARGO from './../../../assets/img/employee.svg';
import moment from 'moment';

class ModalViewCargo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalviewcargo,
      id: this.props.id,
      datCharge: {},
      collapase: false,
      t: this.props.t,
      username: 'ccuartas'
    };
  }

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
      // username: 'ccuartas'
    });
    this.getDataCargoById(id);
  };

  toggleCollapse = () => {
    this.setState({
      collapase: !this.state.collapase
    });
  };

  getDataCargoById = id => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/charge/${id}?username=${this.state.username}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + window.btoa('sgdea:123456')
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          datCharge: data
        });
      })
      .catch('Error', console.log('Error', Error));
  };
  FechaCreacionCargo(data) {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format('YYYY-MM-DD, h:mm:ss a');
  }
  FechaModificacionCargo(data) {
    let updatedAt;
    updatedAt = new Date(data);
    // moment.locale(es);
    return moment(updatedAt).format('YYYY-MM-DD, h:mm:ss a');
  }

  render() {
    const statusCharge = data => {
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
    return (
      <Modal className="modal-lg" isOpen={this.state.modal}>
        <ModalHeader>
          {' '}
          {this.props.t('app_cargo_modal_ver_titulo')}{' '}
          {this.state.datCharge.name}{' '}
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col sm="3">
              <img src={IMGCARGO} className="img-thumbnail" />
            </Col>
            <Col sm="9">
              <div className="">
                {' '}
                <h5 className="" style={{ borderBottom: '1px solid black' }}>
                  {' '}
                  {this.props.t('app_cargo_modal_ver_titulo_2')}{' '}
                </h5>{' '}
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt> {this.props.t('app_cargo_modal_ver_codigo')} </dt>
                      <dd> {this.state.datCharge.code} </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt> {this.props.t('app_cargo_modal_ver_nombre')} </dt>
                      <dd> {this.state.datCharge.name} </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt>
                        {' '}
                        {this.props.t('app_cargo_modal_ver_descripcion')}{' '}
                      </dt>
                      <dd> {this.state.datCharge.description} </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt> {this.props.t('app_cargo_modal_ver_estado')} </dt>
                      <dd> {statusCharge(this.state.datCharge.status)} </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt>
                        {' '}
                        {this.props.t(
                          'app_cargo_modal_ver_fecha_creacion'
                        )}{' '}
                      </dt>
                      <dd>
                        {this.FechaCreacionCargo(
                          this.state.datCharge.createdAt
                        )}
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt>
                        {' '}
                        {this.props.t(
                          'app_cargo_modal_ver_fecha_modificacion'
                        )}{' '}
                      </dt>
                      <dd>
                        {this.FechaModificacionCargo(
                          this.state.datCharge.updatedAt
                        )}{' '}
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
            <i className="fa fa-times" />{' '}
            {this.props.t('app_cargo_modal_ver_button_cerrar')}{' '}
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalViewCargo.propTypes = {
  modalviewcargo: PropTypes.bool.isRequired,
  t: PropTypes.any
};

export default ModalViewCargo;
