import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Row,
  Card,
  CardHeader,
  CardBody,
  Collapse
} from "reactstrap";
import IMGTIPODOCUMENTAL from "./../../../assets/img/list-document-interface-symbol.svg";

class FormEditTipoDocumental extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaledit,
      collapse: false
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  toggleCollapse = () => {
    this.setState({
      collapse: !this.state.collapse
    });
  };
  render() {
    return (
      <Modal className="modal-lg" isOpen={this.state.modal}>
        <ModalHeader> Actualizar tipo documental </ModalHeader>
        <ModalBody>
          <Row>
            <Col sm="3">
              <img
                src={IMGTIPODOCUMENTAL}
                className="img-thumbnail"
                width="170"
              />
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
                      Codigo <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      {" "}
                      Nombre <span className="text-danger">*</span>{" "}
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      {" "}
                      Dependencia <span className="text-danger">*</span>{" "}
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
                      Descripción <span className="text-danger">*</span>{" "}
                    </label>
                    <input type="text" className="form-control" />
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
                    Otros datos
                  </a>{" "}
                </CardHeader>
                <Collapse isOpen={this.state.collapse}>
                  <CardBody>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label> Tiempo de respuesta </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {" "}
                            Estado <span className="text-danger">*</span>{" "}
                          </label>
                          <select className="form-control">
                            {" "}
                            <option> Seleccione... </option>{" "}
                          </select>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Collapse>
              </Card>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-outline-success">
            {" "}
            <i className="fa fa-pencil" /> Actualizar{" "}
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
    );
  }
}

FormEditTipoDocumental.propTypes = {
  modaledit: PropTypes.bool.isRequired
};

export default FormEditTipoDocumental;
