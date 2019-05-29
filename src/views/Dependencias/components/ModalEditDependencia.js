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
  CardBody,
  CustomInput
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
                    Datos {" "}
                  </h5>{" "}
                </div>
                <div className="row">
                <div className="col-md-6">
                <div className="form-group">
                  <label> Conglomerado <span className="text-danger">*</span> </label>
                  <select className="form-control form-control-sm">
                    {" "}
                    <option> Seleccione... </option>{" "}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label> Empresa <span className="text-danger">*</span> </label>
                  <select className="form-control form-control-sm">
                    {" "}
                    <option> Seleccione... </option>{" "}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label> Sede <span className="text-danger">*</span> </label>
                  <select className="form-control form-control-sm">
                    {" "}
                    <option> Seleccione... </option>{" "}
                  </select>
                </div>
              </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label> Código <span className="text-danger">*</span> </label>
                      <input type="text" className="form-control form-control-sm" />
                    </div>
                  </div>

                </div>
                <br/>
              </Col>
              <Col sm="12">
              <div className="row">
              <div className="col-md-6">
              <div className="form-group">
                <label> Nombre <span className="text-danger">*</span> </label>
                <input type="text" className="form-control form-control-sm" />
              </div>
            </div>
            <div className="col-md-6">
            <div className="form-group">
              <label> Cargo responsable <span className="text-danger">*</span> </label>
              <select className="form-control form-control-sm">
              {" "}
              <option> Seleccione... </option>{" "}
            </select>
            </div>
          </div>
            <div className="col-md-12">
              <div className="form-group">
                <label> Descripción </label>
                <textarea  className="form-control" />
              </div>
            </div>
            <div className="col-md-12">
            <div className="form-group">
              <label>
              Estado <span className="text-danger">*</span>
            </label>
            <div className="text-justify">
              <CustomInput
                type="checkbox"
                id="ExampleInputCheckbox"
                label="Si esta opción se encuentra activada, Representa que
               la sede es visible en el sistema y se podrán
               realizar operaciones entre cada uno de los módulos
               correspondientes de la aplicación. En caso contrario
               la sede no se elimina del sistema solo quedará
               inactiva e invisibles para cada uno de los módulos
               correspondiente del sistema."
              />
            </div>
            </div>
              </div>
            </div>
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
