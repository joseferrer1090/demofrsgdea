import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Row,
  Col
} from 'reactstrap';
import IMGDEPARTAMENTO from './../../../assets/img/map-marker.svg';
import moment from 'moment';

class ModalViewDepartamento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalview,
      id: this.props.id,
      dataDepartamento: {},
      dataPais: {}
    };
  }

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
    fetch(`http://192.168.10.180:7000/api/sgdea/department/${id}/ccuartas`, {
      method: 'GET',
      headers: {
        Authorization: 'Basic ' + window.btoa('sgdea:123456'),
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataPais: data.country,
          dataDepartamento: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };
  FechaCreacionDeparment(data) {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format('YYYY-MM-DD, h:mm:ss a');
  }
  FechaModificacionDeparment(data) {
    let updatedAt;
    updatedAt = new Date(data);
    // moment.locale(es);
    return moment(updatedAt).format('YYYY-MM-DD, h:mm:ss a');
  }

  render() {
    const department = this.state.dataDepartamento;
    const country = this.state.dataPais;

    const statusDepartamento = data => {
      let status;
      if (data === 1) {
        status = <b className="text-success">Activo</b>;
      } else if (data === 0) {
        status = <b className="text-danger">Inactivo</b>;
      }
      return status;
    };

    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader> Departamento {department.name} </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGDEPARTAMENTO} className="img-thumbnail" />
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
                    <dl className="param">
                      <dt> País </dt>
                      <dd> {country.name} </dd>
                    </dl>
                  </div>
                  <div className="col-md-6">
                    <dl className="param">
                      <dt> Código </dt>
                      <dd> {department.code} </dd>
                    </dl>
                  </div>
                  <div className="col-md-6">
                    <dl className="param">
                      <dt> Nombre </dt>
                      <dd> {department.name} </dd>
                    </dl>
                  </div>
                  <div className="col-md-6">
                    <dl className="param">
                      <dt> Estado </dt>
                      <dd> {statusDepartamento(department.status)} </dd>
                    </dl>
                  </div>
                  <div className="col-md-6">
                    <dl className="param">
                      <dt> Fecha de creación </dt>
                      <dd>
                        {' '}
                        {this.FechaCreacionDeparment(department.createdAt)}{' '}
                      </dd>
                    </dl>
                  </div>
                  <div className="col-md-6">
                    <dl className="param">
                      <dt> Fecha de modificacíon </dt>
                      <dd>
                        {' '}
                        {this.FechaModificacionDeparment(
                          department.updatedAt
                        )}{' '}
                      </dd>
                    </dl>
                  </div>
                </div>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn  btn-sm btn-secondary"
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

ModalViewDepartamento.propTypes = {
  modalview: PropTypes.bool.isRequired
};

export default ModalViewDepartamento;
