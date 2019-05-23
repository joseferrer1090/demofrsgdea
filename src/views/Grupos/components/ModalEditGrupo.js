import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  CustomInput
} from "reactstrap";

class ModalEditPais extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalgitedit,
      dataOk: false
    };
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  render() {
    const { dataOk } = this.state;
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader> Actualizar grupo </ModalHeader>
          <ModalBody>
            <form className="form">
              <div className="container">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>
                        {" "}
                        Código <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        className="form-control form-control-sm"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>
                        {" "}
                        Nombre <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label> Descripción </label>
                      <textarea className="form-control form-control-sm" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <Card>
                      <CardBody>
                        <CardTitle className="">
                          {" "}
                          Búsqueda de usuarios{" "}
                        </CardTitle>
                        <form className="form">
                          <div className="row">
                            <div className="col-md-3">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  Conglomerado{" "}
                                  <span className="text-danger"> *</span>{" "}
                                </label>
                                <select className="form-control form-control-sm">
                                  {" "}
                                  <option> Seleccione... </option>{" "}
                                </select>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  Empresa <span className="text-danger">
                                    *
                                  </span>{" "}
                                </label>
                                <select className="form-control form-control-sm">
                                  {" "}
                                  <option> Seleccione </option>{" "}
                                </select>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  Sede <span className="text-danger">
                                    *
                                  </span>{" "}
                                </label>
                                <select className="form-control form-control-sm">
                                  {" "}
                                  <option> Seleccione </option>{" "}
                                </select>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  Dependencia{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <select className="form-control form-control-sm">
                                  {" "}
                                  <option> Seleccione </option>{" "}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="">
                            <button
                              type="button"
                              className="btn btn-secondary btn-sm "
                              onClick={() => {
                                this.setState({ dataOk: true });
                              }}
                              style={{ width: "150px" }}
                            >
                              {" "}
                              <i className="fa fa-search" /> Buscar
                            </button>{" "}
                          </div>
                          <br />
                          {dataOk ? (
                            <div className="form-group">
                              <label> Usuarios disponibles </label>
                              <textarea
                                className="form-control form-control-sm"
                                disabled
                              />
                            </div>
                          ) : null}
                        </form>
                      </CardBody>
                    </Card>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label>
                        {" "}
                        Seleccione usuario(s) asignados{" "}
                        <span className="text-danger">*</span>{" "}
                      </label>
                      <select className="form-control form-control-sm">
                        {" "}
                        <option> Seleccione </option>{" "}
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-12">
                  <div className="form-group">
                  <label>
                  {" "}
                  Estado <span className="text-danger">*</span>{" "}
                </label>
                <div className="">
                  <CustomInput
                    type="checkbox"
                    id="CheckBoxEditGrupos"
                    label="Si esta opción se encuentra activada, Representa
                    que el grupo es visible en el sistema y se
                    podrán realizar operaciones entre cada uno de
                    los módulos correspondientes de la aplicación.
                    En caso contrario el grupo no se elimina del
                    sistema solo quedará inactiva e invisibles para
                    cada uno de los módulos correspondiente del
                    sistema"
                  />
                  </div>
                  </div>
                </div>
                </div>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-outline-success btn-sm">
              {" "}
              <i className="fa fa-pencil" /> Actualizar{" "}
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
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

ModalEditPais.propTypes = {
  modaledit: PropTypes.bool.isRequired
};

export default ModalEditPais;
