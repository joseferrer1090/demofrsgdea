import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  CustomInput
} from "reactstrap";
import PropTypes from "prop-types";
import IMGCONGLOMERADO from "./../../../assets/img/puzzle.svg";
import { Formik, Field } from "formik";
import * as Yup from "yup";

const initialState = {
  codigo: "",
  nombre: "",
  descripcion: "",
  estado: ""
};

class ModalEditConglomerado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaleditstate
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
          <ModalHeader> Actualizar conglomerado </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-md-3">
                <img src={IMGCONGLOMERADO} className="img-thumbnail" />
              </div>
              <div className="col-md-9">
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
                        {" "}
                        Código <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
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

                  <div className="col-md-12">
                    <div className="form-group">
                      <label>
                        {" "}
                        Estado <span className="text-danger">*</span>{" "}
                      </label>
                      <div className="text-justify ">
                        <CustomInput
                          type="checkbox"
                          id="CheckboxEdit"
                          label=" Si esta opción se encuentra activada, representa
                              que el conglomerado es visible en el sistema y se
                              podrán realizar operaciones entre cada uno de los
                              módulos correspondientes de la aplicación. En caso
                              contrario el conglomerado no se elimina del
                              sistema solo quedará inactivo e invisibles para
                              cada uno de los módulos correspondiente del
                              sistema."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-outline-success">
              <i className="fa fa-pencil" /> Actualizar{" "}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              <i className="fa fa-times" /> Cerrar{" "}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalEditConglomerado.propTypes = {
  modaleditstate: PropTypes.bool.isRequired
};

export default ModalEditConglomerado;
