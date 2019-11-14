import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Row,
  Col
} from 'reactstrap';
import ImgRadicacionEmail from './../../../assets/img/message.svg';
import PropTypes from 'prop-types';
import moment from 'moment';

class ModalViewRadicacionEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalview,
      id: this.props.id,
      dataRadicacionEmail: {},
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
      `http://192.168.10.180:8090/api/sgdea/service/configuration/email/accounts/filing/${id}?username=${this.state.username}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer ' +
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzM3NjY0OTksInVzZXJfbmFtZSI6ImNjdWFydGFzIiwiYXV0aG9yaXRpZXMiOlsiQVNJU1RFTlRFIEFETUlOSVNUUkFUSVZPIl0sImp0aSI6IjkxMGRhYzBjLTgyODEtNDFlYi1iNzM2LWU1ZWQ1OTUxZmE5MyIsImNsaWVudF9pZCI6ImZyb250ZW5kYXBwIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.l165cU9w7Yl8eDgKdrYgZ-ZQOazEthA4Cx1jFEpQDjs'
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataRadicacionEmail: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };

  FechaCreacionRadicacionEmail(data) {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format('YYYY-MM-DD, h:mm:ss a');
  }
  FechaModificacionRadicacionEmail(data) {
    let updatedAt;
    updatedAt = new Date(data);
    // moment.locale(es);
    return moment(updatedAt).format('YYYY-MM-DD, h:mm:ss a');
  }

  render() {
    const statusRadicacionEmail = data => {
      let status;
      if (data === true) {
        status = <b className="text-success"> Activo</b>;
      } else if (data === false) {
        status = <b className="text-danger"> Inactivo</b>;
      }
      return status;
    };
    const protocol = this.state.dataRadicacionEmail.protocol;
    const host = this.state.dataRadicacionEmail.host;
    const port = this.state.dataRadicacionEmail.port;
    const email = this.state.dataRadicacionEmail.email;
    const status = this.state.dataRadicacionEmail.status;
    const createdAt = this.state.dataRadicacionEmail.createdAt;
    const updatedAt = this.state.dataRadicacionEmail.updatedAt;
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>Ver correo electrónico {email}</ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={ImgRadicacionEmail} />
              </Col>
              <Col sm="9">
                <div className="">
                  {' '}
                  <h5 className="" style={{ borderBottom: '1px solid black' }}>
                    {' '}
                    Datos
                  </h5>{' '}
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Protocolo</dt>
                        <dd>{protocol} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Host</dt>
                        <dd> {host} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Puerto</dt>
                        <dd> {port} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Email</dt>
                        <dd> {email} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Estado</dt>
                        <dd> {statusRadicacionEmail(status)} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Fecha de creación</dt>
                        <dd>
                          {' '}
                          {this.FechaCreacionRadicacionEmail(createdAt)}{' '}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Fecha de modificación</dt>
                        <dd>
                          {' '}
                          {this.FechaModificacionRadicacionEmail(
                            updatedAt
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
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              {' '}
              <i className="fa fa-times" /> Cerrar
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewRadicacionEmail.propTypes = {
  modalview: PropTypes.bool.isRequired,
  t: PropTypes.any
};

export default ModalViewRadicacionEmail;
