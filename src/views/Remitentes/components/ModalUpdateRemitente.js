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
  NavLink
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
          <ModalHeader> Actualizar remitente </ModalHeader>
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
                    Datos personales{" "}
                  </h5>{" "}
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label> Idenfiticación </label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label> Nombre </label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label> E-mail </label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label> Telefono </label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label> Dirección </label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label> Ciudad </label>
                      <select className="form-control">
                        <option>Seleccione...</option>
                      </select>
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
                      Otra informacion
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <Row>
                      <Col sm="6">
                        <div className="form-group">
                          <label> Pais </label>
                          <select className="form-control">
                            {" "}
                            <option> Seleccione... </option>{" "}
                          </select>
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="form-group">
                          <label> Departamento </label>
                          <select className="form-control">
                            {" "}
                            <option> Seleccione... </option>{" "}
                          </select>
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="form-group">
                          <label> Observacion </label>
                          <input type="text" className="form-control" />
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="form-group">
                          <label> Estado </label>
                          <select className="form-control">
                            <option> Activo </option>
                            <option> Inactivo </option>
                          </select>
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
