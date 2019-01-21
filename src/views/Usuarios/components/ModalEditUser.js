import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Card,
  CardBody,
  Col,
  Row,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  CardTitle,
  CardText,
  NavLink
} from "reactstrap";

import classnames from "classnames";

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaledit,
      activeTab: "1"
    };
    this.inputOpenFileRef = React.createRef();
  }

  toogleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  showOpenFileDlg = () => {
    this.inputOpenFileRef.current.click();
  };
  render() {
    return (
      <Modal className="modal-lg" isOpen={this.state.modal}>
        <ModalHeader> Actualizar usuario</ModalHeader>
        <ModalBody>
          <form className="form">
            <Row>
              <Col sm="3">
                <img
                  src={"https://via.placeholder.com/150"}
                  className="img-thumbnail"
                />
                <input
                  type="file"
                  style={{ display: "none" }}
                  ref={this.inputOpenFileRef}
                />
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={this.showOpenFileDlg}
                  style={{ width: "160px" }}
                >
                  <i className="fa fa-camera" /> Cambiar imagen{" "}
                </button>
              </Col>
              <Col sm="9">
                <div className="">
                  {" "}
                  <h5 className="" style={{ borderBottom: "1px solid black" }}>
                    {" "}
                    Datos personales{" "}
                  </h5>{" "}
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Identificación </dt>
                        <dd>
                          <input type="text" className="form-control" />{" "}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Nombre </dt>
                        <dd>
                          {" "}
                          <input type="text" className="form-control" />{" "}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>E-mail </dt>
                        <dd>
                          <input type="text" className="form-control" />{" "}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Teléfono </dt>
                        <dd>
                          {" "}
                          <input type="text" className="form-control" />{" "}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Dirección </dt>
                        <dd>
                          {" "}
                          <input type="text" className="form-control" />{" "}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Fecha de nacimiento </dt>
                        <dd>
                          {" "}
                          <input type="text" className="form-control" />{" "}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm="12">
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "1"
                      })}
                      onClick={() => {
                        this.toogleTab("1");
                      }}
                    >
                      Datos laborales
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "2"
                      })}
                      onClick={() => {
                        this.toogleTab("2");
                      }}
                    >
                      Datos de seguridad
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <Row>
                      <Col sm="12">
                        <Card body>
                          <form className="form">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>
                                    {" "}
                                    Conglomerado{" "}
                                    <span className="text-danger">*</span>{" "}
                                  </label>
                                  <select className="form-control">
                                    {" "}
                                    <option> Seleccione... </option>{" "}
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>
                                    {" "}
                                    Empresa{" "}
                                    <span className="text-danger">*</span>{" "}
                                  </label>
                                  <select className="form-control">
                                    {" "}
                                    <option> Seleccione... </option>{" "}
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>
                                    {" "}
                                    Sede <span className="text-danger">
                                      *
                                    </span>{" "}
                                  </label>
                                  <select className="form-control">
                                    {" "}
                                    <option> Seleccione... </option>{" "}
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>
                                    {" "}
                                    Dependencia{" "}
                                    <span className="text-danger">*</span>{" "}
                                  </label>
                                  <select className="form-control">
                                    {" "}
                                    <option> Seleccione... </option>{" "}
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label>
                                    {" "}
                                    Cargo <span className="text-danger">
                                      *
                                    </span>{" "}
                                  </label>
                                  <select className="form-control">
                                    {" "}
                                    <option> Seleccione... </option>{" "}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </form>
                        </Card>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      <Col sm="12">
                        <Card body>
                          <form className="form">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>
                                    Usuario{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>
                                    {" "}
                                    Roles <span className="text-danger">
                                      *
                                    </span>{" "}
                                  </label>
                                  <select className="form-control">
                                    {" "}
                                    <option> Seleccione... </option>{" "}
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label>
                                    {" "}
                                    Estado{" "}
                                    <span className="text-danger">*</span>{" "}
                                  </label>
                                  <select className="form-control">
                                    {" "}
                                    <option> Activo </option>{" "}
                                    <option> Desactivado </option>{" "}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </form>
                        </Card>
                      </Col>
                    </Row>
                  </TabPane>
                </TabContent>
              </Col>
            </Row>
          </form>
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-outline-success">
            <i className="fa fa-pencil" /> Actualizar{" "}
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              this.setState({ modal: false });
            }}
          >
            <i className="fa fa-times" /> Cerrar{" "}
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalEditUser.propTypes = {
  modaledit: PropTypes.bool.isRequired
};

export default ModalEditUser;
