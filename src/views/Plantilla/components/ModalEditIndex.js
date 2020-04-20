import React, { Component } from "react";
import { Modal, ModalHeader, ModalFooter, ModalBody, Alert } from "reactstrap";
import Input from "./PreviewMetadata/Input";
import PropTypes from "prop-types";
import { TEMPLATE_METADATA_BAG_VIEW } from "./../../../services/EndPoints";
import { decode } from "jsonwebtoken";
import * as Yup from "yup";

class ModalEditIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaleditindexes,
      auth: this.props.authorization,
      template: this.props.templateid,
      metadata: this.props.metadataid,
      dataMetadata: {},
      nameMetadata: "",
      optionsMetadata: [],
      typeMetadata: "",
      objMetadata: {
        defaultvalue: "",
        formula: {},
        required: "",
      },
      alertError: false,
      alertErrorMessage: "",
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
      //Perform some operation here
      this.setState({ metadata: this.props.metadataid });
      this.getDataMetadata(this.props.metadataid);
    }
  }

  getDataMetadata = (id) => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(
      `${TEMPLATE_METADATA_BAG_VIEW}/${id}?username=${username.user_name}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataMetadata: data,
          nameMetadata: data.metadata.elementConfig.name,
          // optionsMetadata: data.metadata.elementConfig.options,
          // typeMetadata: data.metadata.elemtConfig.type,
        });
      })
      .catch((err) => {
        console.log(`Error => ${err.message}`);
      });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  updateMetadata = (e) => {
    e.preventDefault();
    Yup.setLocale({
      mixed: {
        required: "my required message",
      },
    });
    const schema = Yup.object().shape({
      formula: Yup.bool().required(),
      requerido: Yup.bool().required(),
    });
    schema
      .validate({
        formula: this.state.objMetadata.formula,
        requerido: this.state.objMetadata.required,
      })
      .then(() => {
        this.putMetadata();
        // console.log("los datos correctos");
      })
      .catch((err) => {
        console.log(err.errors);
      });
  };

  putMetadata = () => {
    console.log(JSON.stringify(this.state.objMetadata, null, 2));
  };

  render() {
    console.log(this.state.dataMetadata);
    // console.log(this.state.typeMetadata);
    // console.log(this.state.objMetadata);
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            Editar valores del Metadato {this.state.nameMetadata}{" "}
          </ModalHeader>
          <form>
            <ModalBody>
              <div className="row">
                <div className="col-md-12">
                  <p className=" alert alert-secondary">
                    <i className="fa fa-exclamation-triangle" /> Los valores que
                    se ingresen en el siguiente formulario solo afecta al valor
                    por defecto que tendra el metadato en la plantilla asociada.
                  </p>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="formula">
                      {" "}
                      Formula <span className="text-danger">*</span>{" "}
                    </label>
                    <select
                      value={this.state.objMetadata.formula}
                      className="form-control form-control-sm"
                      onChange={(e) => {
                        this.setState({
                          objMetadata: {
                            ...this.state.objMetadata,
                            formula: e.target.value,
                          },
                        });
                      }}
                    >
                      <option value="">Seleccione...</option>
                      <option value="true">Si</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      {" "}
                      Requerido <span className="text-danger">*</span>{" "}
                    </label>
                    <select
                      id="required"
                      className="form-control form-control-sm"
                      value={this.state.objMetadata.required}
                      onChange={(e) => {
                        this.setState({
                          objMetadata: {
                            ...this.state.objMetadata,
                            required: e.target.value,
                          },
                        });
                      }}
                    >
                      <option value="">Seleccione...</option>
                      <option value="true">Si</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <div className="card">
                      <div className="card-header">
                        Metadato {this.state.nameMetadata}
                      </div>
                      <div className="card-body">
                        <Input
                          formType={this.state.typeMetadata}
                          options={this.state.optionsMetadata}
                          onChange={(e) => {
                            this.setState({
                              objMetadata: {
                                ...this.state.objMetadata,
                                defaultvalue: e.currentTarget.value,
                              },
                            });
                          }}
                        />
                      </div>
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
            </ModalBody>
            <ModalFooter>
              <button
                type="button"
                onClick={(e) => this.updateMetadata(e)}
                className="btn btn-outline-success btn-sm"
              >
                <i className="fa fa-pencil" /> Editar metadato
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
          </form>
        </Modal>
      </div>
    );
  }
}

ModalEditIndex.propTypes = {
  modaleditindexes: PropTypes.bool.isRequired,
};

export default ModalEditIndex;
