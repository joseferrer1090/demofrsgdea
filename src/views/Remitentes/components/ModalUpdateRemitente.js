import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Button,
  Row,
  Col,
  Collapse,
  Card,
  CardHeader,
  CardBody,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  CardTitle,
  CardText,
  NavLink,
  CustomInput
} from "reactstrap";
import classnames from "classnames";

import IMGPROFILE from "./../../../assets/img/profile.svg";

class ModalUpdateRemitente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalupdate,
      activeTab: "1"
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  toggleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  render() {
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader> Actualizar tercero </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGPROFILE} className="img-thumbnail" />
              </Col>
              <Col sm="9">
                <div className="">
                  {" "}
                  <h5 className="" style={{ borderBottom: "1px solid black" }}>
                    {" "}
                    Datos{" "}
                  </h5>{" "}
                </div>
                <div className="row">
                <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {" "}
                            Tipo de tercero{" "}
                            <span className="text-danger">*</span>{" "}
                          </label>
                          <select
                            className="form-control form-control-sm"
                          >
                          <option>Selecione...</option>
                          </select>
                        </div>
                        </div>
                        <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {" "}
                            Elemento de comunicación{" "}
                            <span className="text-danger">*</span>{" "}
                          </label>
                          <select
                            className="form-control form-control-sm"
                          >
                          <option>Selecione...</option>
                          </select>
                        </div>
                        </div>
                  <div className="col-md-6">
                    <div className="form-group ">
                      <label> Identificación <span className="text-danger">*</span>{" "} </label>
                      <input type="text" className="form-control form-control-sm" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label> Nombre <span className="text-danger">*</span>{" "} </label>
                      <input type="text" className="form-control form-control-sm" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label> E-mail <span className="text-danger">*</span>{" "}  </label>
                      <input type="text" className="form-control form-control-sm" />
                    </div>
                  </div>


                </div>
              </Col>
              <Col sm="12">
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "1"
                      })}
                      onClick={() => {
                        this.toggleTab("1");
                      }}
                    >
                      Otra información
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <Row>
                    <Col sm="6">
                    <div className="form-group">
                      <label> Teléfono fijo </label>
                      <input type="text" className="form-control form-control-sm" />
                    </div>
                  </Col>
                  <Col sm="6">
                    <div className="form-group">
                      <label> Teléfono celular <span className="text-danger">*</span>{" "} </label>
                      <input type="text" className="form-control form-control-sm" />
                    </div>
                  </Col>
                  <Col sm="12">
                    <div className="form-group">
                      <label> Dirección <span className="text-danger">*</span>{" "} </label>
                      <input type="text" className="form-control form-control-sm" />
                    </div>
                  </Col>
                      <Col sm="4">
                        <div className="form-group">
                          <label> Pais <span className="text-danger">*</span>{" "} </label>
                          <select className="form-control">
                            {" "}
                            <option> Seleccione... </option>{" "}
                          </select>
                        </div>
                      </Col>
                      <Col sm="4">
                        <div className="form-group">
                          <label> Departamento <span className="text-danger">*</span>{" "} </label>
                          <select className="form-control">
                            {" "}
                            <option> Seleccione... </option>{" "}
                          </select>
                        </div>
                      </Col>
                      <Col sm="4">
                      <div className="form-group">
                        <label> Ciudad <span className="text-danger">*</span>{" "} </label>
                        <select className="form-control form-control-sm">
                          <option>Seleccione...</option>
                        </select>
                      </div>
                    </Col>
                      <Col sm="6">
                        <div className="form-group">
                          <label> Referencia </label>
                          <textarea type="text" className="form-control  form-control-sm" />
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="form-group">
                          <label> Observacion </label>
                          <textarea type="text" className="form-control  form-control-sm" />
                        </div>
                      </Col>
                      <Col sm="12">
                        <div className="form-group">
                          <label>
                            {" "}
                            Estado <span className="text-danger">*</span>{" "}
                          </label>
                          <div className="text-justify">
                            <CustomInput
                              type="checkbox"
                              id="CheckboxEditTerceros"
                              label="Si esta opción se encuentra activada, representa
                              que el remitente es visible en el sistema y se
                              podrán realizar operaciones entre cada uno de los
                              módulos correspondientes de la aplicación. En caso
                              contrario el remitente no se elimina del sistema
                              solo quedará inactivo e invisibles para cada uno
                              de los módulos correspondiente del sistema."
                            />
                            </div>
                            </div>
                            </Col>
                    </Row>
                  </TabPane>
                </TabContent>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-outline-success">
              {" "}
              <i className="fa fa-pencil" /> Actualizar{" "}
            </button>
            <Button
              className="btn btn-secodary"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              {" "}
              <i className="fa fa-times" /> Cerrar{" "}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalUpdateRemitente.propTypes = {
  modalupdate: PropTypes.bool.isRequired
};

export default ModalUpdateRemitente;
