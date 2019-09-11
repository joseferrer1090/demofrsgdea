import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Row,
  Col
} from 'reactstrap';
import ImgMensajero from './../../../assets/img/courier.svg';
import PropTypes from 'prop-types';
import moment from 'moment';

class ModalViewMensajero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalview,
      id: this.props.id,
      dataMessenger: {},
      t: this.props.t
    };
  }

  toggle = id => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      id: id
    }));
    fetch(`http://192.168.10.180:7000/api/sgdea/messenger/${id}/ccuartas`, {
      method: 'GET',
      headers: {
        Authorization: 'Basic ' + window.btoa('sgdea:123456'),
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataMessenger: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };

  FechaCreacionMensajero(data) {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format('YYYY-MM-DD, h:mm:ss a');
  }
  FechaModificacionMensajero(data) {
    let updatedAt;
    updatedAt = new Date(data);
    // moment.locale(es);
    return moment(updatedAt).format('YYYY-MM-DD, h:mm:ss a');
  }

  render() {
    const statusMessenger = data => {
      let status;
      if (data === 1) {
        status = <b className="text-success"> Activo </b>;
      } else if (data === 0) {
        status = <b className="text-danger"> Inactivo </b>;
      }
      return status;
    };
    const identification = this.state.dataMessenger.identification;
    const name = this.state.dataMessenger.name;
    const description = this.state.dataMessenger.description;
    const status = this.state.dataMessenger.status;
    const createdAt = this.state.dataMessenger.createdAt;
    const updatedAt = this.state.dataMessenger.updatedAt;
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {this.props.t('app_mensajero_modal_ver_titulo')} {name}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={ImgMensajero} />
              </Col>
              <Col sm="9">
                <div className="">
                  {' '}
                  <h5 className="" style={{ borderBottom: '1px solid black' }}>
                    {' '}
                    {this.props.t('app_mensajero_modal_ver_titulo_2')}{' '}
                  </h5>{' '}
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          {this.props.t(
                            'app_mensajero_modal_ver_identificacion'
                          )}{' '}
                        </dt>
                        <dd>{identification} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          {this.props.t('app_mensajero_modal_ver_nombre')}{' '}
                        </dt>
                        <dd> {name} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          {this.props.t('app_mensajero_modal_ver_descripcion')}{' '}
                        </dt>
                        <dd> {description} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          {this.props.t('app_mensajero_modal_ver_estado')}{' '}
                        </dt>
                        <dd> {statusMessenger(status)} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          {this.props.t(
                            'app_mensajero_modal_ver_fecha_creacion'
                          )}{' '}
                        </dt>
                        <dd> {this.FechaCreacionMensajero(createdAt)} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          {this.props.t(
                            'app_mensajero_modal_ver_fecha_modificacion'
                          )}{' '}
                        </dt>
                        <dd> {this.FechaModificacionMensajero(updatedAt)} </dd>
                      </dl>
                    </div>
                  </div>
                </div>
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
              {' '}
              <i className="fa fa-times" />{' '}
              {this.props.t('app_mensajero_modal_ver_cerrar')}{' '}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewMensajero.propTypes = {
  modalview: PropTypes.bool.isRequired,
  t: PropTypes.any
};

export default ModalViewMensajero;
