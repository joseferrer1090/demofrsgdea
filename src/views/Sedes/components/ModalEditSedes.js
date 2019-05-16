import React, { Component } from "react";
import { Modal, ModalHeader, ModalFooter, ModalBody, Card, Col, Row, CardBody, CardTitle} from "reactstrap";
import PropTypes from "prop-types";
import IMGSEDE from "./../../../assets/img/teamwork.svg";

class ModalEditSedes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaledit,
      secuencia: 1
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader> Actualizar sede </ModalHeader>
          <ModalBody>
          <Row>
          <Col sm="3">
          <img src={IMGSEDE} className="img-thumbnail" />
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
                    <label>
                      Código <span className="text-danger">*</span>{" "}
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
                    <label> Descripción </label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label> Cargo </label>
                  <select className="form-control">
                    {" "}
                    <option>Seleccione...</option>{" "}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    Estado <span className="text-danger">*</span>{" "}
                  </label>
                  <select className="form-control">
                    {" "}
                    <option> Seleccione... </option>{" "}
                  </select>
                </div>
              </div>
            </div>
          </Col>
          <Col sm="12">
          <form className="form">
          <Card body>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    {" "}
                    Conglomerado <span className="text-danger">*</span>{" "}
                  </label>
                  <select className="form-control">
                    {" "}
                    <option>Seleccione...</option>{" "}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    {" "}
                    Empresa <span className="text-danger">*</span>{" "}
                  </label>
                  <select className="form-control">
                    {" "}
                    <option>Seleccione...</option>{" "}
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    {" "}
                    Prefijo de radicación{" "}
                    <span className="text-danger">*</span>{" "}
                  </label>
                  <input
                        type="text"
                        className="form-control form-control-sm"
                        maxLength={"6"}
                        placeholder=" "
                      />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    {" "}
                    Secuencia de radicación{" "}
                    <span className="text-danger">*</span>{" "}
                  </label>
                  <input
                        type="number"
                        className="form-control form-control-sm"
                        defaultValue={this.state.secuencia}
                        min={0}
                      />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    {" "}
                    Dirección <span className="text-danger">*</span>{" "}
                  </label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="from-group">
                  <label>
                    {" "}
                    Teléfono <span className="text-danger">*</span>{" "}
                  </label>
                  <input type="text" className="form-control" />
                </div>
              </div>
            </div>
            <Card>
            <CardBody>
            <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label> País</label>
                <select className="form-control">
                  {" "}
                  <option>Seleccione...</option>{" "}
                </select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label> Departamento</label>
                <select className="form-control">
                  {" "}
                  <option>Seleccione...</option>{" "}
                </select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>
                  {" "}
                  Ciudad <span className="text-danger">*</span>{" "}
                </label>
                <select className="form-control">
                  {" "}
                  <option> Seleccione... </option>{" "}
                </select>
              </div>
            </div>
          </div>
            </CardBody>
            </Card>
          </Card>
        </form>
          </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-outline-success">
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
      </div>
    );
  }
}

ModalEditSedes.propTypes = {
  modaledit: PropTypes.bool.isRequired
};

export default ModalEditSedes;
