import React, { Component } from "react";
import { CustomInput, Modal, ModalHeader, ModalFooter, ModalBody, Card, Col, Row, CardBody, CardTitle, CardHeader, Collapse} from "reactstrap";
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
  toggleCollapse = () => {
    this.setState({ collapse: !this.state.collapse, collapse2: false });
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
                    {" "}
                    Conglomerado <span className="text-danger">*</span>{" "}
                  </label>
                  <select className="form-control form-control-sm">
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
                <select className="form-control form-control-sm">
                  {" "}
                  <option>Seleccione...</option>{" "}
                </select>
              </div>
            </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      Código <span className="text-danger">*</span>{" "}
                    </label>
                    <input type="text" className="form-control form-control-sm" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      {" "}
                      Nombre <span className="text-danger">*</span>{" "}
                    </label>
                    <input type="text" className="form-control form-control-sm" />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label> Descripción </label>
                    <textarea  className="form-control" />
                  </div>
                </div>
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
            </div>
          </Col>

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
          <Collapse isOpen={this.state.collapse}>
            <CardBody>
          <form className="form">
            <div className="row">
            </div>

            <div className="row">
            <div className="col-md-12">
            <div className="form-group">
              <label> Cargo responsable </label>
              <select className="form-control form-control-sm">
                {" "}
                <option>Seleccione...</option>{" "}
              </select>
            </div>
          </div>
          <div className="col-md-4">
              <div className="form-group">
                <label> País</label>
                <select className="form-control form-control-sm">
                  {" "}
                  <option>Seleccione...</option>{" "}
                </select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label> Departamento</label>
                <select className="form-control form-control-sm">
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
                <select className="form-control form-control-sm">
                  {" "}
                  <option> Seleccione... </option>{" "}
                </select>
              </div>
            </div>

              <div className="col-md-8">
                <div className="form-group">
                  <label>
                    {" "}
                    Dirección <span className="text-danger">*</span>{" "}
                  </label>
                  <input type="text" className="form-control form-control-sm" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="from-group">
                  <label>
                    {" "}
                    Teléfono <span className="text-danger">*</span>{" "}
                  </label>
                  <input type="text" className="form-control form-control-sm" />
                </div>
              </div>
            </div>

            <div className="row">

          </div>

          <div className="form-group">
          <label>
          {" "}
          Estado <span className="text-danger">*</span>{" "}
        </label>
        <div className="text-justify">
          <CustomInput
            type="checkbox"
            id="CheckboxEditSedes"
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

        </form>
        </CardBody>
                  </Collapse>
                </Card>
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
