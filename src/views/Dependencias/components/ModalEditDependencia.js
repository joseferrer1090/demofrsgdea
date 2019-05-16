import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardBody
} from "reactstrap";
import classnames from "classnames";
import IMGDEPENDENCIA from "./../../../assets/img/settings-work-tool.svg";

class ModalEditDependencia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalView,
      activeTab: "1"
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  toggleTab = tab => {
    if (this.state.activeTab !== 1) {
      this.setState({
        activeTab: tab
      });
    }
  };

  render() {
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader> Actualizar dependencia </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGDEPENDENCIA} className="img-thumbnail" />
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
                      <label> Código </label>
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
                      <label> Descripción </label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label> Estado </label>
                      <select className="form-control">
                        {" "}
                        <option> Activo </option> <option> Inactivo </option>{" "}
                      </select>
                    </div>
                  </div>
                </div>
              </Col>
              <Col sm="12">
              <Card>
              <CardBody>
              <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label> Conglomerado </label>
                  <select className="form-control">
                    {" "}
                    <option> Seleccione... </option>{" "}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label> Empresa </label>
                  <select className="form-control">
                    {" "}
                    <option> Seleccione... </option>{" "}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label> Sede </label>
                  <select className="form-control">
                    {" "}
                    <option> Seleccione... </option>{" "}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label> Cargo responsable </label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              </div>
              </CardBody>
              </Card>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-outline-success">
              {" "}
              <i className="fa fa-pencil" /> Actualizar{" "}
            </button>
            <Button
              className="btn btn-secondary"
              onClick={() => {
                this.setState({
                  modal: false
                });
              }}
            >
              <i className="fa fa-times" /> Cerrar{" "}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalEditDependencia.propTypes = {
  modalEdit: PropTypes.bool.isRequired
};

export default ModalEditDependencia;
