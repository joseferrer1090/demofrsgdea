import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Card,
  CardTitle,
  CardText,
  UncontrolledAlert
} from "reactstrap";

import ListaRolesEdit from "./../componentsPermission/ListaRolesEdit";
import NuevaListaRolesEdit from "../componentsPermission/NuevaListaRolesEdit";

class ModalEditPermissionRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaleditpermission,
      backdrop: true,
      dataroles: [],
      data: this.props.datamodal
    };
  }
  addrol(id) {
    const newSet = this.state.dataroles.concat([id]);
    console.log("voy por este lado", id);
    this.setState({
      dataroles: newSet
    });
  }

  deleterol(id) {
    const { dataroles } = this.state;
    const newList = [...dataroles.slice(0, id), ...dataroles.slice(id + 1)];
    this.setState({
      dataroles: newList
    });
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  render() {
    console.log(this.state.data);
    return (
      <div>
        <Modal
          className="modal-lg"
          isOpen={this.state.modal}
          backdrop={this.state.backdrop}
        >
          <ModalHeader> Asignar permisos </ModalHeader>
          <ModalBody>
            <form>
              <Row>
                <Col sm="12">
                  <UncontrolledAlert color="warning">
                    <div className="text-center">
                      <i className="fa fa-exclamation-triangle" /> Tenga en
                      cuenta que cuando se editan los permisos, puede afectar la
                      sesión de los usuario{" "}
                      <i className="fa fa-exclamation-triangle" />
                    </div>
                  </UncontrolledAlert>
                </Col>
              </Row>
              <br />
              <Row>
              <Col sm="12">

                  <Row>
                    <Col sm="6">
                      <div className="form-group">
                        <label>
                          {" "}
                          Módulo <span className="text-danger">
                            *
                          </span>{" "}
                        </label>
                        <select className="form-control form-control-sm">
                          {" "}
                          <option> Seleccione... </option>{" "}
                        </select>
                      </div>
                    </Col>
                    <Col sm="6">
                      <div className="form-group">
                        <label>
                          {" "}
                          Entidades{" "}
                          <span className="text-danger">*</span>{" "}
                        </label>
                        <select
                          className="form-control form-control-sm
                        "
                        >
                          {" "}
                          <option> Seleccione... </option>{" "}
                        </select>
                      </div>
                    </Col>
                    {/*  Aqui va la funcionalidad    */}
                    <Row>
                      <div className="col-md-6">
                      <label className="col-md-12"><dt>Permisos disponibles:</dt></label>
                          <ListaRolesEdit
                            data={this.state.data}
                            dataroles={this.state.dataroles}
                            addrol={this.addrol.bind(this)}
                          />
                      </div>
                      <div className="col-md-6">
                      <label className=""><dt>Permisos asignados:</dt></label>
                          <NuevaListaRolesEdit
                            data={this.state.data}
                            dataroles={this.state.dataroles}
                            addrol={this.addrol.bind(this)}
                          />
                      </div>
                      </Row>
                    {/*  Fin   */}

                  </Row>
              </Col>
            </Row>
              <Row />
            </form>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-outline-warning">
              {" "}
              <i className="fa fa-lock" /> Editar permiso{" "}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              {" "}
              <i className="fa fa-times" /> Cerrar{" "}
            </button>
          </ModalFooter>
        </Modal>

      </div>

    );
  }
}

ModalEditPermissionRoles.propTypes = {
  modaleditpermission: PropTypes.bool.isRequired,
  datamodal: PropTypes.array.isRequired
};

export default ModalEditPermissionRoles;
