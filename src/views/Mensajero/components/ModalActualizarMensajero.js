import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Row,
  Col,
  CustomInput
} from "reactstrap";
import PropTypes from "prop-types";
import ImgMensajero from "./../../../assets/img/courier.svg";

class ModalActualizarMensajero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalupdate
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  render() {
    return (
      <Modal className="modal-lg" isOpen={this.state.modal}>
        <ModalHeader>Actualizar mensajero</ModalHeader>
        <ModalBody>
          <Row>
            <Col sm="3">
              <img src={ImgMensajero} />
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
                      Identificación <span className="text-danger">
                      *
                    </span>{" "}
                      <dd>
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
                      Nombre <span className="text-danger">
                      *
                    </span>{" "}
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
                        <textarea
                          className="form-control form-control-sm"
                        />{" "}
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
                      id="CheckboxEditMensajero"
                      label=" Si esta opción se encuentra activada, representa
                        que el cargo es visible en el sistema y se podrán
                        realizar operaciones entre cada uno de los módulos
                        correspondientes de la aplicación. En caso
                        contrario el cargo no se elimina del sistema solo
                        quedará inactivo e invisibles para cada uno de los
                        módulos correspondiente del sistema."
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
          <button type="button" className="btn btn-outline-success">
            <i className="fa fa-pencil" /> Actualizar
          </button>
          <button
            className="btn btn-secondary "
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

ModalActualizarMensajero.propTypes = {
  modalupdate: PropTypes.bool.isRequired
};

export default ModalActualizarMensajero;
