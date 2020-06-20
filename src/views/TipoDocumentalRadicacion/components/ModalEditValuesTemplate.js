import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { TYPE_DOCUMENTARIES_METADATA_BAG_VIEW } from "./../../../services/EndPoints";
import { decode } from "jsonwebtoken";

const Inputs = (props) => {
  // console.log(props);
  let inputElement = null;
  switch (props.formType) {
    case "text":
      inputElement = (
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="">{props.label}</label>
            <input
              type="text"
              className="form-control form-control-sm"
              onChange={props.onChange}
              value={props.value}
              {...props.elementConfig}
            />
          </div>
        </div>
      );
      break;
    case "select":
      inputElement = (
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor={""}>{props.label}</label>
            <select
              className="form-control form-control-sm"
              onChange={props.onChange}
              {...props.elementConfig}
            >
              <option> -- Seleccione -- </option>
              {props.elementConfig.length ? (
                props.elementConfig.map((aux, id) => (
                  <option key={id} value={aux.value}>
                    {aux.displayValue}
                  </option>
                ))
              ) : (
                <option> -- No hay datos -- </option>
              )}
            </select>
          </div>
        </div>
      );
      break;
    case "radio":
      inputElement = (
        <div className="col-md-6">
          {props.elementConfig.length ? (
            props.elementConfig.map((aux, id) => {
              return (
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    onChange={props.onChange}
                    id={aux.id}
                    {...props.elementConfig}
                    value={aux.value}
                  />
                  <label className="form-check-label" htmlFor>
                    {aux.displayValue}
                  </label>
                </div>
              );
            })
          ) : (
            <div>No hay datos asociando al input de tipo radio</div>
          )}
        </div>
      );
      break;
    case "checkbox":
      inputElement = (
        <div className="col-md-6">
          {props.elementConfig.length ? (
            props.elementConfig.map((aux, id) => {
              return (
                <div className="form-group form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={aux.id}
                    value={aux.displayValue}
                    onChange={props.onChange}
                    {...props.elementConfig}
                  />
                  <label className="form-check-label" htmlFor={aux.id}>
                    {aux.displayValue}
                  </label>
                </div>
              );
            })
          ) : (
            <div>No hay dato asociados al checkbox</div>
          )}
        </div>
      );
      break;
    case "date":
      inputElement = (
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor={""}>{props.label}</label>
            <input
              type="date"
              className="form-control form-control-sm"
              onChange={props.onChange}
              value={props.value}
              {...props.elementConfig}
            />
          </div>
        </div>
      );
      break;
    case "textarea":
      inputElement = (
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="">{props.label}</label>
            <textarea
              className="form-control form-control-sm"
              onChange={props.onChange}
              value={props.value}
              {...props.elementConfig}
            ></textarea>
          </div>
        </div>
      );
      break;

    default:
      inputElement = (
        <div className="col-md-6">
          <div className="form-group">
            <label>Etiqueta de metadato no asociada</label>
            <input
              type="text"
              className="form-control form-control-sm"
              disabled
              defaultValue={`El metadato no esta asociado`}
            />
          </div>
        </div>
      );
  }
  return <React.Fragment>{inputElement}</React.Fragment>;
};

class ModalEditValuesTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaledit,
      auth: this.props.authorization,
      type: "",
      id: "",
      idmetadata: this.props.idmetadata,
      data: this.props.data,
      dataGeneralAll: {},
      dataGeneral: {},
      dataMetadata: {},
      dataMetadaOptions: [],
      values: {
        id: "",
        defaultValue: "",
      },
    };
  }

  toggle = (id, type, idmetadata) => {
    this.setState({
      modal: !this.state.modal,
      id: id,
      type: type,
      idmetadata: idmetadata,
    });
    this.getDataMetadata(id);
  };

  getDataMetadata = (id) => {
    const auth = this.props.authorization;
    const username = decode(auth);
    fetch(
      `${TYPE_DOCUMENTARIES_METADATA_BAG_VIEW}${id}?username=${username.user_name}`,
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
          dataGeneralAll: data,
          dataGeneral: data.metadata,
          dataMetadata: data.metadata.elementConfig,
          dataMetadaOptions: data.metadata.elementConfig.options.length
            ? data.metadata.elementConfig.options
            : [],
        });
        console.log(this.state.dataGeneralAll);
      })
      .catch((err) => {
        console.log(`Error => ${err}`);
      });
  };

  putEditValue = () => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(
      `http://localhost:8090/api/sgdea/service/configuration/type/documentary/metadata/bag`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + auth,
        },
        body: JSON.stringify({
          id: this.state.values.id,
          metadataBagId: this.state.idmetadata,
          typeDocumentaryId: this.state.dataGeneralAll.typeDocumentary.id,
          defaultValue: this.state.values.defaultValue,
          userName: username.user_name,
        }),
      }
    ).then((response) =>
      response.json().then((data) => {
        if (response.status === 200) {
          console.log(response);
        } else if (response.status === 500) {
          console.log(response);
        }
      })
    );
  };

  render() {
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>Editar por defecto del metadato</ModalHeader>
          <form>
            <ModalBody>
              <p className="text-justify alert alert-info">
                <i className="fa fa-exclamation-triangle" /> Se asignara un
                nuevo valor por default al metadado en la plantilla asociada al
                tipo documental de radicacion. Este nuevo valor se vera
                reflejado en el modulo de correspondencia.
              </p>
              <div className="card card-body">
                <Inputs
                  label={this.state.dataMetadata.labeltext}
                  formType={this.state.type}
                  value={this.state.dataMetadata.value}
                  elementConfig={this.state.dataMetadaOptions}
                  onChange={(event) => {
                    this.setState({
                      values: {
                        ...this.state.values,
                        id: this.state.id,
                        defaultValue: event.target.value,
                      },
                    });
                  }}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  this.putEditValue();
                }}
              >
                <i className="fa fa-pencil" /> Editar
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() =>
                  this.setState({
                    modal: false,
                  })
                }
              >
                <i className="fa fa-times" /> Cancelar
              </button>
            </ModalFooter>
          </form>
        </Modal>
      </Fragment>
    );
  }
}

ModalEditValuesTemplate.propTypes = {
  data: PropTypes.array,
};

export default ModalEditValuesTemplate;
