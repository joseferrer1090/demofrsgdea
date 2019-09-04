import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Row
} from 'reactstrap';
import PropTypes from 'prop-types';
import IMGTERCERO from './../../../assets/img/supply.svg';
import moment from 'moment';

class ModalViewTipoTercero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalview,
      id: this.props.id,
      dataTipoTercero: {}
    };
  }

  toggle = id => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      id: id
    }));
    fetch(
      `http://192.168.10.180:7000/api/sgdea/typethirdparty/${id}/ccuartas`,
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
          dataTipoTercero: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };
  FechaCreacionTipoTecero(data) {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format('YYYY-MM-DD, h:mm:ss a');
  }
  FechaModificacionTipoTercero(data) {
    let updatedAt;
    updatedAt = new Date(data);
    // moment.locale(es);
    return moment(updatedAt).format('YYYY-MM-DD, h:mm:ss a');
  }

  render() {
    const statusTipoTercero = data => {
      let status;
      if (data === 1) {
        status = <b className="text-success"> Activo </b>;
      } else if (data === 0) {
        status = <b className="text-danger"> Inactivo </b>;
      }
      return status;
    };
    const code = this.state.dataTipoTercero.code;
    const name = this.state.dataTipoTercero.name;
    const description = this.state.dataTipoTercero.description;
    const status = this.state.dataTipoTercero.status;
    const createdAt = this.state.dataTipoTercero.createdAt;
    const updatedAt = this.state.dataTipoTercero.updatedAt;
    return (
      <div className="animated fadeIn">
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader> Tipo de tercero {name}</ModalHeader>
          <ModalBody>
            <Row>
              <Col sm={3}>
                <img src={IMGTERCERO} className={'img-thumbnail'} />
              </Col>
              <Col sm={9}>
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
                        <dd> {code} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt> Nombre </dt>
                        <dd> {name} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt> Descripción </dt>
                        <dd> {description} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt> Estado </dt>
                        <dd> {statusTipoTercero(status)} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt> Fecha de creación </dt>
                        <dd> {this.FechaCreacionTipoTecero(createdAt)} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt> Fecha de modificación </dt>
                        <dd>
                          {' '}
                          {this.FechaModificacionTipoTercero(updatedAt)}{' '}
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
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              {' '}
              <i className="fa fa-times" /> Cerrar{' '}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewTipoTercero.propTypes = {
  modalview: PropTypes.bool.isRequired
};

export default ModalViewTipoTercero;
