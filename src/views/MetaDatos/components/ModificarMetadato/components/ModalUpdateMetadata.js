import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CustomInput,
  Alert
} from "reactstrap";
import {
  METADATA_VIEW,
  METADATA_UPDATE
} from "./../../../../../services/EndPoints";
import { decode } from "jsonwebtoken";
import IMG from "./../../../../../assets/img/keyboard.png";
import * as Yup from "yup";

class ModalUpdateMetadata extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalupdate,
      auth: this.props.authorization,
      id: this.props.id,
      data: {},
      fechaCreacion: "",
      fechaModificacion: "",
      nombre: "",
      descripcion: "",
      label: "",
      idMetadata: "",
      status: null,
      formula: null,
      alertError: false,
      alertErrorMessage: ""
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
    if (props.id !== state.id) {
      return {
        id: props.id
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.id !== prevProps.id) {
      this.setState({
        auth: this.props.authorization,
        id: this.props.id
      });
      this.getDataMetaDataByID(this.state.id, this.state.auth);
    } else if (this.props.authorization === "" || this.props.id === null) {
    }
    return;
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  getDataMetaDataByID = (id, auth) => {
    const aux = auth;
    const user = decode(aux);
    fetch(`${METADATA_VIEW}${id}?username=${user.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + auth
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          data: data.metadata,
          fechaCreacion: data.metadata.createdAt,
          fechaModificacion: data.metadata.updatedAt,
          nombre: data.metadata.name,
          descripcion: data.metadata.description,
          label: data.metadata.labelText,
          idMetadata: data.metadata.inputId,
          status: data.metadata.status,
          formula: data.metadata.formula
        });
        console.log(data.metadata);
      })
      .catch(err => {
        console.log(`${err.message}`);
      });
  };
  render() {
    return (
      <Modal isOpen={this.state.modal} className="modal-lg">
        <ModalHeader>Edicion de controles {this.state.data.name}</ModalHeader>
        <ModalBody>
          <div className="row">
            <div className={"col-md-4"}>
              <img
                src={IMG}
                width={220}
                className="img-thumbnail"
                style={{ padding: "20px" }}
              />
            </div>
            <div className={"col-md-8"}>
              <form className="form">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        Fecha de creacion <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        type={"text"}
                        className="form-control form-control-sm"
                        value={this.state.fechaCreacion}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        Fecha de modificacion{" "}
                        <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        type={"text"}
                        className="form-control form-control-sm"
                        value={this.state.fechaModificacion}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>
                        Nombre <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={this.state.nombre}
                        onChange={e => {
                          this.setState({
                            nombre: e.target.value
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>
                        Descripcion <span className="text-danger">*</span>{" "}
                      </label>
                      <textarea
                        className="form-control form-control-sm"
                        value={this.state.descripcion}
                        onChange={e => {
                          this.setState({
                            descripcion: e.target.value
                          });
                        }}
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        Label <span className="text-danger">*</span>
                      </label>
                      <input
                        type={"text"}
                        className="form-control form-control-sm"
                        value={this.state.label}
                        onChange={e => {
                          this.setState({
                            label: e.target.value
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        Id tag metadato <span className="text-danger">*</span>
                      </label>
                      <input
                        type={"text"}
                        className="form-control form-control-sm"
                        value={this.state.idMetadata}
                        onChange={e => {
                          this.setState({
                            idMetadata: e.target.value
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <CustomInput
                        // value={this.state.active}
                        defaultValue={!this.state.status}
                        defaultChecked
                        type="checkbox"
                        id={"activeInput"}
                        label={
                          "Activar el metadato, para sea visible el la bolsa de metadatos y asignar en la platilla correspondiente."
                        }
                        onChange={e => {
                          this.setState({
                            status: e.target.checked
                          });
                        }}
                      ></CustomInput>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <CustomInput
                        // value={this.state.active}
                        defaultValue={!this.state.formula}
                        type="checkbox"
                        id={"formula"}
                        label={
                          "Activar el metadato, para sea visible el la bolsa de metadatos y asignar en la platilla correspondiente."
                        }
                        onChange={e => {
                          this.setState({
                            formula: e.target.checked
                          });
                        }}
                      ></CustomInput>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="pull-right">
            <button type="button" className="btn btn-secondary btn-sm">
              {" "}
              <i className="fa fa-pencil" /> Actualizar{" "}
            </button>
            &nbsp;
            <button
              type={"button"}
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({
                  modal: false
                });
              }}
            >
              <i className="fa fa-times" /> Cerrar
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalUpdateMetadata.propTypes = {
  modalupdate: PropTypes.bool.isRequired,
  authorization: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default ModalUpdateMetadata;
