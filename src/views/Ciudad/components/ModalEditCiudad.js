import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Row,
  Col,
  CustomInput
} from "reactstrap";

import IMGCITY from "./../../../assets/img/skyline.svg";

class ModalEditCiudad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaledit
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
          <ModalHeader> Actualizar ciudad </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGCITY} className="img-thumbnail" />
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
                        País <span className="text-danger">*</span>{" "}
                        <dd>
                          {" "}
                          <select className="form-control form-control-sm">
                            {" "}
                            <option> Seleccione... </option>{" "}
                          </select>{" "}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                     Departamento <span className="text-danger">*</span>{" "}
                      <dd>
                        {" "}
                        <select className="form-control form-control-sm">
                          {" "}
                          <option> Seleccione... </option>{" "}
                        </select>{" "}
                      </dd>
                    </dl>
                  </div>
                </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        Código <span className="text-danger">*</span>{" "}
                        <dd>
                          {" "}
                          <input
                            type="text"
                            className="form-control form-control-sm"
                          />
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
                      <label>
                      {" "}
                      Estado <span className="text-danger">*</span>{" "}
                    </label>
                    <div className="text-justify">
                      <CustomInput
                        type="checkbox"
                        id="CheckboxEditCiudad"
                        label=" Si esta opción se encuentra activada, representa que
                      el departamento es visible en el sistema y se podrán
                      realizar operaciones entre cada uno de los módulos
                      correspondientes de la aplicación. En caso contrario
                      el departamento no se elimina del sistema solo
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
            <button type="button" className="btn btn-outline-success btn-sm ">
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

ModalEditCiudad.propTypes = {
  modaledit: PropTypes.bool.isRequired
};

export default ModalEditCiudad;
