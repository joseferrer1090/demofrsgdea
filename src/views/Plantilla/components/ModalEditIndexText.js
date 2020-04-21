import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from "reactstrap";
import Input from "./PreviewMetadata/Input";
import { TEMPLATE_METADATA_BAG_VIEW } from "./../../../services/EndPoints";
import { decode } from "jsonwebtoken";
import * as Yup from "yup";

class ModalEditIndexText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaledittext,
      template: this.props.templateid,
      auth: this.props.authorization,
      metadata: this.props.metadataid,
      dataMetadata: {},
      nameMetadata: "",
      typeMetadata: "",
      objMetada: {
        defaultValue: "",
        formula: "",
        required: "",
      },
      alertError: false,
      alertMessage: "",
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization,
        metadata: props.metadataid,
        template: props.templateid,
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.metadataid !== prevProps.metadataid) {
      this.setState({ metadata: this.props.metadataid });
      this.getDataMetadata(this.props.metadataid);
    }
  }

  getDataMetadata = (id) => {
    const auth = this.state.auth;
    const username = decode(auth);
    console.log(id);
    fetch(
      `${TEMPLATE_METADATA_BAG_VIEW}/${id}?username=${username.user_name}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + auth,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataMetadata: data,
          nameMetadata: data.metadata.elementConfig.name,
          typeMetadata: data.metadata.elementConfig.type,
        });
        // console.log(this.state.dataMetadata);
      })
      .catch((err) => {
        console.log(`Error => ${err.message}`);
      });
  };

  updatedMetadata = (e) => {
    e.preventDefault();
    Yup.setLocale({});

    const schema = Yup.object().shape({
      formula: Yup.bool().required(),
      requerido: Yup.bool().required(),
      defaultValue: Yup.string().required(),
    });

    schema
      .validate({
        formula: this.state.objMetada.formula,
        requerido: this.state.objMetada.required,
        defaultValue: this.state.objMetada.defaultValue,
      })
      .then(() => {
        this.updateMetadataText();
      })
      .catch((err) => {
        this.setState({
          alertMessage: err.message,
          alertError: true,
        });
        setTimeout(() => {
          this.setState({
            alertError: false,
          });
        }, 1200);
        // console.log(`Error => ${err.message}`);
      });
  };

  updateMetadataText = () => {
    console.log(JSON.stringify(this.state.objMetada, null, 2));
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  render() {
    console.log(this.state.dataMetadata);
    console.log(this.state.typeMetadata);
    return (
      <Modal className="modal-lg" isOpen={this.state.modal}>
        <ModalHeader>
          Editar valores del metadato {this.state.nameMetadata}
        </ModalHeader>
        <ModalBody>
          <p className=" alert alert-secondary">
            <i className="fa fa-exclamation-triangle" /> Los valores que se
            ingresen en el siguiente formulario solo afecta al valor por defecto
            que tendra el metadato en la plantilla asociada.
          </p>
          <Alert color="danger" isOpen={this.state.alertError}>
            <i className="fa fa-exclamation-triangle" />{" "}
            {this.state.alertMessage}
          </Alert>
          <form className="form">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    Formula<span className="text-danger"> *</span>{" "}
                  </label>
                  <select
                    className="form-control form-control-sm"
                    value={this.state.objMetada.formula}
                    onChange={(e) => {
                      this.setState({
                        objMetada: {
                          ...this.state.objMetada,
                          formula: e.target.value,
                        },
                      });
                    }}
                  >
                    <option value="">Seleccione</option>
                    <option value="true">Si</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    {" "}
                    Requerido <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-control form-control-sm"
                    value={this.state.objMetada.required}
                    onChange={(e) => {
                      this.setState({
                        objMetada: {
                          ...this.state.objMetada,
                          required: e.target.value,
                        },
                      });
                    }}
                  >
                    <option value="">Seleccione</option>
                    <option value="true">Si</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    Metadato {this.state.nameMetadata}
                  </div>
                  <div className="card-body">
                    <Input
                      formType={this.state.typeMetadata}
                      value={this.state.objMetada.defaultValue}
                      onChange={(e) => {
                        this.setState({
                          objMetada: {
                            ...this.state.objMetada,
                            defaultValue: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <p className="text-helper">
                  <span className="text-danger">*</span> El valor que se
                  seleccione, sera definido como valor por defecto en la
                  plantilla donde se asocio el metadato.
                </p>
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <div className="float-right">
            <button
              type="button"
              onClick={(e) => {
                this.updatedMetadata(e);
              }}
              className="btn btn-outline-success btn-sm"
            >
              {" "}
              <i className="fa fa-pencil" /> Editar metadato{" "}
            </button>
            &nbsp;
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({
                  modal: false,
                });
              }}
            >
              {" "}
              <i className="fa fa-times" /> Cerrar
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalEditIndexText.propTypes = {
  authorization: PropTypes.string.isRequired,
};

export default ModalEditIndexText;
