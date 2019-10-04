import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Row,
  Col,
  Card,
  CardBody,
  Collapse,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  CardTitle,
  CardText,
  Button
} from 'reactstrap';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from "moment";

class ModalViewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalview,
      collapse: false,
      collapse2: false,
      id: this.props.id,
      data: [],
      dataRoles: [],
      userlogged: 'ccuartas',
      activeTab: '1'
    };
  }

  toggleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
    fetch(
      `http://192.168.10.180:7000/api/sgdea/user/${id}/?username=${this.state.userlogged}`,
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
          data: data,
          dataRoles: data.listRoleResponses
        });
      })
      .catch(Error => console.log(' ', Error));
    //this.getDataById(this.state.id);
  };

  // getDataById = id => {
  //   fetch(`http://192.168.10.180:7000/api/sgdea/user/${id}/ccuartas`, {
  //     method: "GET",
  //     headers: {
  //       Authorization: "Basic " + window.btoa("sgdea:123456"),
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data);
  //       this.setState({
  //         data: data
  //       });
  //     })
  //     .catch(Error => console.log(" ", Error));
  // };

  toggleCollapse = () => {
    this.setState({ collapse: !this.state.collapse, collapse2: false });
  };

  toogleCollapse2 = () => {
    this.setState({ collapse2: !this.state.collapse2, collapse: false });
  };

  FechaCreacionUsuario(data) {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format('YYYY-MM-DD, h:mm:ss a');
  }
  FechaModificacionActualizacion(data) {
    let updatedAt;
    updatedAt = new Date(data);
    // moment.locale(es);
    return moment(updatedAt).format('YYYY-MM-DD, h:mm:ss a');
  }

  FechaNacimiento(data){
    let birthDate;
    birthDate = new Date(data);
    return moment(birthDate).format('YYYY-MM-DD');
  }

  render() {
    console.log(this.state.id);
    const dataUser = this.state.data;
    const dataRoles = this.state.dataRoles.map((aux, id) => {
      return <div key={id}>{aux.name}</div>;
    });

    return (
      <Modal className="modal-lg" isOpen={this.state.modal}>
        <ModalHeader> Ver usuario {this.state.data.name} </ModalHeader>
        <ModalBody role="document">
          <Row>
            <Col sm="3">
              <img
                src={`http://192.168.10.180:7000/api/sgdea/user/photo/view/${this.state.id}`}
                className="img-thumbnail"
              />
            </Col>
            <Col sm="9">
              <div className="">
                {' '}
                <h5 className="" style={{ borderBottom: '1px solid black' }}>
                  {' '}
                  Datos personales{' '}
                </h5>{' '}
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt>Identificación </dt>
                      <dd>{this.state.data.identification} </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt>Nombre </dt>
                      <dd>{this.state.data.name}</dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt>E-mail </dt>
                      <dd>{this.state.data.email}</dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt>Teléfono </dt>
                      <dd>{this.state.data.phone} </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt>Dirección </dt>
                      <dd>{this.state.data.address}</dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt>Fecha de nacimiento </dt>
                      <dd>
                        {
                          this.FechaCreacionUsuario(this.state.data.birthDate)
                        }
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <br />
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => {
                  this.toggleTab('1');
                }}
              >
                Datos laborales
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => {
                  this.toggleTab('2');
                }}
              >
                Datos de seguridad
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row>
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>Conglomerado </dt>
                          <dd>{this.state.data.conglomerateName} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>Empresa </dt>
                          <dd> {this.state.data.companyName} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>Sede </dt>
                          <dd> {this.state.data.headquarterName} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>Dependencia </dt>
                          <dd> {this.state.data.dependenceName} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>Cargo </dt>
                          <dd>{this.state.data.chargeName} </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt>Usuario </dt>
                      <dd>{this.state.data.username}</dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt>Roles </dt>
                      <dd>
                        {dataRoles}
                        {/* {this.state.data.listRoleResponses !==null ? (
                                <p>no hay datos</p>
                              ) : (
                                <p>hay datos</p>
                                //dataRoles(this.state.data.listRoleResponses)
                              )} */}
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt>Estado </dt>
                      <dd>
                        {this.state.data.enabled ? (
                          <p className="text-success">
                            <b>Activo</b>
                          </p>
                        ) : (
                          <p className="text-danger">
                            <b>Inactivo</b>
                          </p>
                        )}{' '}
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt>Fecha de creación </dt>
                      <dd>
                        {this.FechaCreacionUsuario(this.state.data.createdAt)}
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt>Fecha de modificación </dt>
                      <dd>
                       {this.FechaModificacionActualizacion(this.state.data.updatedAt)}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </TabPane>
          </TabContent>
        </ModalBody>
        <ModalFooter>
          <div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              {' '}
              <i className="fa fa-times" /> Cerrar{' '}
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalViewUser.propTypes = {
  modalview: PropTypes.bool.isRequired,
  id: PropTypes.any.isRequired
};

export default ModalViewUser;
