import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  CustomInput
} from "reactstrap";
import IMGPackage from "./../../../assets/img/package.svg";
import PropTypes from "prop-types";

class ModalEditTipoLlegada extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaledit
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  render() {
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>Actualizar tipo de envío / llegada</ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGPackage} />
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
                        Código <span className="text-danger">*</span>{" "}
                        <dd>
                          {" "}
                          <input
                            type="text"
                            className="form-control form-control-sm"
                          />{" "}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        Nombre <span className="text-danger">*</span>{" "}
                        <dd>
                          {" "}
                          <input
                            type="text"
                            className="form-control form-control-sm"
                          />{" "}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <dl className="param">
                        Descripción
                        <dd>
                          {" "}
                          <textarea className="form-control form-control-sm" />
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <dl className="param">
                      <label>
                      {" "}
                      Estado <span className="text-danger">*</span>{" "}
                    </label>
                    <div className="text-justify">
                      <CustomInput
                        type="checkbox"
                        id="CheckboxEditTipoLlegada"
                        label="Si esta opción se encuentra activada, Representa que
                         la sede es visible en el sistema y se podrán
                         realizar operaciones entre cada uno de los módulos
                         correspondientes de la aplicación. En caso contrario
                         la sede no se elimina del sistema solo quedará
                         inactiva e invisibles para cada uno de los módulos
                         correspondiente del sistema."
                      />
                    </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <div className="float-right">
              <button className="btn btn-outline-success">
                <i className="fa fa-pencil" /> Actualizar
              </button>
              &nbsp;
              <button
                className="btn btn-secondary "
                onClick={() => {
                  this.setState({ modal: false });
                }}
              >
                <i className="fa fa-times" /> Cerrar
              </button>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalEditTipoLlegada.propTypes = {
  modaledit: PropTypes.bool.isRequired
};

export default ModalEditTipoLlegada;
