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
  NavLink,
CustomInput
} from "reactstrap";
import Select from "react-select";

import classnames from "classnames";
const dataExmapleRoles = [
  { value: "rol1", label: "rol 1" },
  { value: "rol2", label: "rol 2" },
  { value: "rol3", label: "rol 3" },
  { value: "rol4", label: "rol 4" }
];
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaledit,
      activeTab: "1",
      selectedOptionRoles: null
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
  handleSelectedOptionRoles = selectedOptionRoles => {
    this.setState({ selectedOptionRoles });
    console.log(this.state.selectedOptionRoles);
  };

  render() {
    const{
      selectedOptionRoles
    }=this.state
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
                        Identificación <span className="text-danger">
                        *
                      </span>{" "}
                        <dd>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                          />{" "}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                       Nombre <span className="text-danger">
                       *
                     </span>{" "}
                        <dd>
                          {" "}
                          <input
                            type="text"
                            className="form-control form-control-sm"
                          />{" "}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        E-mail <span className="text-danger">
                        *
                      </span>{" "}
                        <dd>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                          />{" "}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                      Teléfono <span className="text-danger">
                      *
                    </span>{" "}
                        <dd>
                          {" "}
                          <input
                            type="text"
                            className="form-control form-control-sm"
                          />{" "}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        Dirección
                        <dd>
                          {" "}
                          <input
                            type="text"
                            className="form-control form-control-sm"
                          />{" "}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        Fecha de nacimiento
                        <dd>
                          {" "}
                          <input
                            type="date"
                            className="form-control form-control-sm"
                          />{" "}
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
                                  <select className="form-control form-control-sm">
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
                                  <select className="form-control form-control-sm">
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
                                  <select className="form-control form-control-sm">
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
                                  <select className="form-control form-control-sm">
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
                                  <select className="form-control form-control-sm">
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
                                  <input
                                  disabled
                                    type="text"
                                    className="form-control form-control-md"
                                  />
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
                              <Select
                                value={selectedOptionRoles}
                                onChange={this.handleSelectedOptionRoles}
                                options={dataExmapleRoles}
                                placeholder={"Selecciones los roles"}
                                isMulti
                              />
                            </div>
                          </div>
                              <div className="col-md-12">
                                <div className="form-group">
                                <label>
                                {" "}
                                Estado <span className="text-danger">
                                  *
                                </span>{" "}
                              </label>
                              <div className="text-justify">
                                <CustomInput
                                  type="checkbox"
                                  id="CheckBoxEditUser"
                                  label="Si esta opción se encuentra activada,
                                representa que el usuario es visible en el
                                sistema y se podrán realizar operaciones entre
                                cada uno de los módulos correspondientes de la
                                aplicación. En caso contrario el usuario no se
                                elimina del sistema solo quedará inactivo e
                                invisibles para cada uno de los módulos
                                correspondiente del sistema."
                                />
                                </div>
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
          <button type="button" className="btn btn-outline-success btn-sm">
            <i className="fa fa-pencil" /> Actualizar{" "}
          </button>
          <button
            className="btn btn-secondary btn-sm"
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
