import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Row,
  Col,
  Collapse,
  Card,
  CardHeader,
  Table
} from "reactstrap";
import PropTypes from "prop-types";
import IMGROLES from "./../../../assets/img/shield.svg";

class ModalViewRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalviewroles
    };
  }
  toggleCollapse = () => {
    this.setState({
      collapase: !this.state.collapase
    });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <Modal className="modal-lg" isOpen={this.state.modal}>
        <ModalHeader> Ver rol </ModalHeader>
        <ModalBody>
          <Row>
            <Col sm="3">
              <img src={IMGROLES} className="img-thumbnail" />
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
                    <dl className="param">
                      <dt> Código </dt>
                      <dd> código </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt> Nombre </dt>
                      <dd> nombre </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt> Descripción </dt>
                      <dd> descripción </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt> Estado </dt>
                      <dd> estado </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt> Fecha de creación </dt>
                      <dd> fecha de creación </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt> Fecha de modificación </dt>
                      <dd> fecha de modificación </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                {" "}
                <a
                  onClick={() => {
                    this.toggleCollapse();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {" "}
                  Permisos asignados{" "}
                </a>{" "}
              </CardHeader>
              <Collapse isOpen={this.state.collapase}>
              <Row>
        <Col sm="12">
          <Table size="sm" striped hover>
            <thead>
              <tr className="text-center">
                <th>Módulo</th>
                <th>Entidad</th>
                <th>Permisos </th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td>Módulo</td>
                <td>
                <label> Entidad </label>
                </td>
                <td>
                <label>Permisos asignados</label>
                </td>
              </tr>
              <tr>
              <td>Módulo</td>
              <td>
              <label> Entidad </label>
              </td>
              <td>
              <label>Permisos asignados</label>
              </td>
            </tr>
            <tr>
            <td>Módulo</td>
            <td>
            <label> Entidad </label>
            </td>
            <td>
            <label>Permisos asignados</label>
            </td>
          </tr>
          <tr>
          <td>Módulo</td>
          <td>
          <label> Entidad </label>
          </td>
          <td>
          <label>Permisos asignados</label>
          </td>
        </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
            </Collapse>
              </Card>
              </Col>
              </Row>
        </ModalBody>
        <ModalFooter>
          <button
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
    );
  }
}

ModalViewRoles.propTypes = {
  modalviewroles: PropTypes.bool.isRequired
};

export default ModalViewRoles;
