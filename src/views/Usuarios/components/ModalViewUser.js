import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import PropTypes from "prop-types";
import classnames from "classnames";
import moment from "moment";
import { decode } from "jsonwebtoken";
import { USER, USER_PHOTO } from "./../../../services/EndPoints";
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
      userlogged: "",
      activeTab: "1",
      t: this.props.t,
      auth: this.props.authorization
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization
      });
    }
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
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${USER}${id}/?username=${username.user_name}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          data: data,
          dataRoles: data.listRoleResponses
        });
      })
      .catch(Error => console.log(" ", Error));
  };

  toggleCollapse = () => {
    this.setState({ collapse: !this.state.collapse, collapse2: false });
  };

  toogleCollapse2 = () => {
    this.setState({ collapse2: !this.state.collapse2, collapse: false });
  };

  FechaCreacionUsuario(data) {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format("DD-MM-YYYY, h:mm:ss a");
  }
  FechaModificacionActualizacion(data) {
    let updatedAt;
    updatedAt = new Date(data);
    return moment(updatedAt).format("DD-MM-YYYY, h:mm:ss a");
  }

  FechaNacimiento(data) {
    let birthDate;
    birthDate = new Date(data);
    return moment(birthDate).format("DD-MM-YYYY");
  }

  render() {
    const dataRoles = this.state.dataRoles.map((aux, id) => {
      return <div key={id}>{aux.name}</div>;
    });
    const { t } = this.props;
    return (
      <Modal className="modal-lg" isOpen={this.state.modal}>
        <ModalHeader>
          {" "}
          {t("app_usuarios_modal_ver_titulo")} {this.state.data.name}{" "}
        </ModalHeader>
        <ModalBody role="document">
          <Row>
            <Col sm="3">
              <img
                src={`${USER_PHOTO}${this.state.id}`}
                className="img-thumbnail"
              />
            </Col>
            <Col sm="9">
              <div className="">
                {" "}
                <h5 className="" style={{ borderBottom: "1px solid black" }}>
                  {" "}
                  {t("app_usuarios_modal_ver_titulo_2")}{" "}
                </h5>{" "}
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt>{t("app_usuarios_modal_ver_identificacion")} </dt>
                      <dd>{this.state.data.identification} </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt>{t("app_usuarios_modal_ver_nombre")} </dt>
                      <dd>{this.state.data.name}</dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt>{t("app_usuarios_modal_ver_email")} </dt>
                      <dd>{this.state.data.email}</dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt>{t("app_usuarios_modal_ver_telefono")} </dt>
                      <dd>{this.state.data.phone} </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt>{t("app_usuarios_modal_ver_direccion")} </dt>
                      <dd>{this.state.data.address}</dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt>{t("app_usuarios_modal_ver_fecha_nacimiento")} </dt>
                      <dd>
                        {this.FechaCreacionUsuario(this.state.data.birthDate)}
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
                className={classnames({ active: this.state.activeTab === "1" })}
                onClick={() => {
                  this.toggleTab("1");
                }}
              >
                {t("app_usuarios_modal_ver_tab")}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === "2" })}
                onClick={() => {
                  this.toggleTab("2");
                }}
              >
                {t("app_usuarios_modal_ver_tab_2")}
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
                          <dt>{t("app_usuarios_modal_ver_conglomerado")} </dt>
                          <dd>{this.state.data.conglomerateName} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_usuarios_modal_ver_empresa")} </dt>
                          <dd> {this.state.data.companyName} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_usuarios_modal_ver_sede")} </dt>
                          <dd> {this.state.data.headquarterName} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_usuarios_modal_ver_dependencia")} </dt>
                          <dd> {this.state.data.dependenceName} </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_usuarios_modal_ver_cargo")} </dt>
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
                      <dt>{t("app_usuarios_modal_ver_usuario")} </dt>
                      <dd>{this.state.data.username}</dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt>{t("app_usuarios_modal_ver_roles")} </dt>
                      <dd>{dataRoles}</dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt>{t("app_usuarios_modal_ver_estado")} </dt>
                      <dd>
                        {this.state.data.enabled ? (
                          <p className="text-success">
                            <b>{t("app_tablas_estado_activo")}</b>
                          </p>
                        ) : (
                          <p className="text-danger">
                            <b>{t("app_tablas_estado_inactivo")}</b>
                          </p>
                        )}{" "}
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt>{t("app_usuarios_modal_ver_fecha_creacion")} </dt>
                      <dd>
                        {this.FechaCreacionUsuario(this.state.data.createdAt)}
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt>{t("app_usuarios_modal_ver_fecha_modificacion")} </dt>
                      <dd>
                        {this.FechaModificacionActualizacion(
                          this.state.data.updatedAt
                        )}
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
              {" "}
              <i className="fa fa-times" />{" "}
              {t("app_usuarios_modal_ver_boton_cerrar")}{" "}
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalViewUser.propTypes = {
  modalview: PropTypes.bool.isRequired,
  id: PropTypes.any.isRequired,
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired
};

export default ModalViewUser;
