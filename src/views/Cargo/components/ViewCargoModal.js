import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Card,
  CardHeader,
  Collapse,
  CardBody,
  Table
}
from "reactstrap";
import PropTypes from "prop-types";
import IMGCARGO from "./../../../assets/img/employee.svg";

class ModalViewCargo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalviewcargo
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  toggleCollapse = () => {
    this.setState({
      collapase: !this.state.collapase
    });
  };
  render() {
    return (
      <Modal className="modal-lg" isOpen={this.state.modal}>
        <ModalHeader> Ver cargo </ModalHeader>
        <ModalBody>
          <Row>
            <Col sm="3">
              <img src={IMGCARGO} className="img-thumbnail" />
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
                      Más información{" "}
                    </a>{" "}
                  </CardHeader>
                  <Collapse isOpen={this.state.collapase}>
                  <Row>
            <Col sm="12">
              <Table size="sm" striped hover>
                <thead>
                  <tr className="text-center">
                  <th> Asignar responsabilidades</th>
                    <th>  </th>
                    <th> Responsable </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  <tr>
                    <td>Conglomerado</td>
                    <td>
                    <label> Nombre conglomerado </label>
                    </td>
                    <td>
                    <label>Si / No</label>
                    </td>
                  </tr>
                  <tr>
                    <td>Empresa</td>
                    <td>
                    <label> Nombre empresa </label>
                    </td>
                    <td>
                    <label>Si / No</label>
                    </td>
                  </tr>
                  <tr>
                    <td>Sede</td>
                    <td>
                    <label> Nombre sede </label>
                    </td>
                    <td>
                    <label>Si / No</label>
                    </td>
                  </tr>
                  <tr>
                    <td>Dependencia</td>
                    <td>
                    <label> Nombre dependencia </label>
                    </td>
                    <td>
                      <label>Si / No</label>
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
            <i className="fa fa-times" /> Cerrar{" "}
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalViewCargo.propTypes = {
  modalviewcargo: PropTypes.bool.isRequired
};

export default ModalViewCargo;
