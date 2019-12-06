import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Row,
  Col,
  Collapse,
  Card,
  CardHeader,
  Table
} from 'reactstrap';
import PropTypes from 'prop-types';
import IMGROLES from './../../../assets/img/shield.svg';
import moment from 'moment';

class ModalViewRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalviewroles,
      id: this.props.id,
      data: [],
      userName: 'jferrer',
      t: this.props.t
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
    fetch(
      `http://192.168.10.180:7000/api/sgdea/role/${id}?username=${this.state.userName}`,
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
          data: data
        });
      })
      .catch(err => console.log('Error', err));
  };

  FechaCreacionRol(data) {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format('YYYY-MM-DD, h:mm:ss a');
  }
  FechaModificacionRol(data) {
    let updatedAt;
    updatedAt = new Date(data);
    // moment.locale(es);
    return moment(updatedAt).format('YYYY-MM-DD, h:mm:ss a');
  }

  render() {
    const statusRol = data => {
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
            {' '}
            {this.props.t('app_tablas_estado_inactivo')}
          </b>
        );
      }
      return status;
    };
    const t = this.state.t;
    return (
      <Modal className="modal-lg" isOpen={this.state.modal}>
        <ModalHeader>
          {' '}
          {t('app_roles_modal_ver_titulo')} {this.state.data.name}
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col sm="3">
              <img src={IMGROLES} className="img-thumbnail" />
            </Col>
            <Col sm="9">
              <div className="">
                {' '}
                <h5 className="" style={{ borderBottom: '1px solid black' }}>
                  {' '}
                  {t('app_roles_modal_ver_titulo_2')}{' '}
                </h5>{' '}
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt> {t('app_roles_modal_ver_codigo')} </dt>
                      <dd> {this.state.data.code} </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt> {t('app_roles_modal_ver_nombre')} </dt>
                      <dd> {this.state.data.name} </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt> {t('app_roles_modal_ver_descripcion')} </dt>
                      <dd> {this.state.data.description} </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt> {t('app_roles_modal_ver_estado')} </dt>
                      <dd> {statusRol(this.state.data.status)} </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt> {t('app_roles_modal_ver_fecha_creacion')} </dt>
                      <dd>
                        {this.FechaCreacionRol(this.state.data.createdAt)}{' '}
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt> {t('app_roles_modal_ver_fecha_modificacion')} </dt>
                      <dd>
                        {' '}
                        {this.FechaModificacionRol(
                          this.state.data.updatedAt
                        )}{' '}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          {/* <Row>
            <Col sm="12">
              <Card>
                <CardHeader>
                  {" "}
                  <a
                    onClick={() => {
                      this.toggleCollapse();
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {" "}
                    Permisos asignados{" "}
                  </a>{" "}
                </CardHeader>
                <Collapse isOpen={this.state.collapase}>
                  <Row>
                    <Col sm="12">
                      <Table size="sm" striped hover>
                        <thead>
                          <tr className="text-center">
                            <th>Módulo</th>
                            <th>Entidad</th>
                            <th>Permisos </th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          <tr>
                            <td>Módulo</td>
                            <td>
                              <label> Entidad </label>
                            </td>
                            <td>
                              <label>Permisos asignados</label>
                            </td>
                          </tr>
                          <tr>
                            <td>Módulo</td>
                            <td>
                              <label> Entidad </label>
                            </td>
                            <td>
                              <label>Permisos asignados</label>
                            </td>
                          </tr>
                          <tr>
                            <td>Módulo</td>
                            <td>
                              <label> Entidad </label>
                            </td>
                            <td>
                              <label>Permisos asignados</label>
                            </td>
                          </tr>
                          <tr>
                            <td>Módulo</td>
                            <td>
                              <label> Entidad </label>
                            </td>
                            <td>
                              <label>Permisos asignados</label>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </Collapse>
              </Card>
            </Col>
                  </Row>*/}
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
            {t('app_roles_modal_ver_boton_cerrar')}{' '}
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalViewRoles.propTypes = {
  modalviewroles: PropTypes.bool.isRequired
};

export default ModalViewRoles;
