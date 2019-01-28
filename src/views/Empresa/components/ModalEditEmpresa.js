import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  CardHeader,
  CardFooter
} from "reactstrap";

import IMGEMPRESA from "./../../../assets/img/company.svg";

import Select from "react-select";

const dataConglomeradoExample = [
  { value: "1", label: "Conglomerado 1" },
  { value: "2", label: "Conglomerado 2" },
  { value: "3", label: "Conglomerado 3" }
];

class ModalEditEmpresa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaleditempresa,
      selectedOptionUpdateConglomerado: null
    };
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleChangeSelectedOptionUpdateConglomerado = selectedOptionUpdateConglomerado => {
    this.setState({ selectedOptionUpdateConglomerado });
    console.log(`Option selected:`, selectedOptionUpdateConglomerado);
  };

  render() {
    const { selectedOptionUpdateConglomerado } = this.state;
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader> Actualizar empresa </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGEMPRESA} className="img-thumbnail" />
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
                        <dt>
                          Conglomerado <span className="text-danger">*</span>{" "}
                        </dt>
                        <dd>
                          {" "}
                          <input type="text" className="form-control" />
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          Código <span className="text-danger">*</span>{" "}
                        </dt>
                        <dd>
                          <input type="text" className="form-control" />
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          NIT <span className="text-danger">*</span>{" "}
                        </dt>
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
                        <dt>
                          Nombre<span className="text-danger">*</span>{" "}
                        </dt>
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
            <br />
            <Row>
              <Col sm="12">
                <Card>
                  <CardHeader> Mas informacion </CardHeader>
                  <CardBody>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label> Descripción </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>
                            {" "}
                            Cargo responsable{" "}
                            <span className="text-danger">*</span>{" "}
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>
                            {" "}
                            Estado <span className="text-danger">*</span>{" "}
                          </label>
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
              <i className="fa fa-pencil" /> Actualizar
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              <i className="fa fa-times" /> Cerrar
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalEditEmpresa.propTypes = {
  modaleditempresa: PropTypes.bool.isRequired
};

export default ModalEditEmpresa;
