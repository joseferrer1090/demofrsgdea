import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";

class ModalPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalPreview: this.props.modalpreview,
      type: this.props.inputType,
      field: this.props.field,
      valueexample: ""
    };
  }
  toggle = () => {
    this.setState({
      modalPreview: !this.state.modalPreview
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (props.inputType !== state.type) {
      return {
        type: props.inputType
      };
    } else if (props.field !== state.field) {
      return {
        field: props.field
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.inputType !== prevProps.inputType) {
      this.setState({
        type: this.props.inputType
      });
    } else if (this.props.field !== prevProps.field) {
      this.setState({
        field: this.props.field
      });
    }
  }

  renderType = data => {
    let component;
    if (data === undefined) {
      component = (
        <div className="text-center text-danger">
          {" "}
          error en la vista previa{" "}
        </div>
      );
    } else if (data.type === "Text" || data.type === "text") {
      component = (
        <div
          className="col-md-12"
          style={{ border: "1px solid #c8ced3", padding: "10px " }}
        >
          <div className="form-group">
            <label>{data.title}</label>
            <input
              name={data.name}
              type={data.type}
              className="form-control form-control-sm"
              defaultValue={data.defaultValue}
              placeholder={data.placeholder}
              disabled={data.validation.isReadOnly}
              required={data.validation.isRequired}
            />
            <small className="form-text text-muted">{data.helpertext}</small>
          </div>
        </div>
      );
    } else if (data.type === "select" || data.type === "SELECT") {
      component = (
        <div
          className="col-md-12"
          style={{ border: "1px solid #c8ced3 ", padding: "10px" }}
        >
          <div className="form-group">
            <label>{data.title}</label>
            {data.multiple ? (
              <select
                className="form-control form-control-sm"
                multiple={data.multiple}
                disabled={data.validation.isReadOnly}
                required={data.validation.isRequired}
              >
                {data.options.map((aux, id) => {
                  return aux.selected ? (
                    <option selected={aux.selected} key={id} value={aux.value}>
                      {" "}
                      {aux.title}{" "}
                    </option>
                  ) : (
                    <option key={id} value={aux.value}>
                      {aux.title}
                    </option>
                  );
                })}
              </select>
            ) : (
              <select
                className="form-control form-control-sm"
                value={data.defaultValue}
                disabled={data.validation.isReadOnly}
                required={data.validation.isRequired}
              >
                {data.options.map((aux, id) => {
                  return (
                    <option key={id} value={aux.value}>
                      {aux.title}
                    </option>
                  );
                })}
              </select>
            )}
            <small className="form-text text-muted">{data.helpertext}</small>
          </div>
        </div>
      );
    } else if (
      data.toolType === "check_boxes" ||
      data.toolType === "CHECK_BOXES"
    ) {
      component = (
        <div
          className=""
          style={{ border: "1px solid #c8ced3", padding: "10px" }}
        >
          <label>{data.title}</label>
          <React.Fragment>
            {data.checkBoxes.length ? (
              data.checkBoxes.map((aux, id) => {
                return (
                  <div
                    key={id}
                    className={data.inline ? "form-check-inline" : "form-check"}
                  >
                    <input
                      name={aux.value}
                      // checked={aux.selected}
                      defaultChecked={aux.selected}
                      className="form-check-input"
                      type="checkbox"
                      id={aux.value}
                      disabled={data.validation.isReadOnly}
                    />
                    <label className="form-check-label" htmlFor={aux.value}>
                      {aux.title}
                    </label>
                  </div>
                );
              })
            ) : (
              <div className="form-group">
                <p className="text-center"> No hay opciones creadas </p>
              </div>
            )}
          </React.Fragment>
        </div>
      );
    } else if (
      data.toolType === "RADIO_BUTTONS" ||
      data.toolType === "radio_buttons"
    ) {
      component = (
        <div style={{ border: "1px solid #c8ced3", padding: "10px" }}>
          <label>{data.title}</label>
          {data.radios.length ? (
            data.radios.map((aux, id) => {
              return (
                <React.Fragment>
                  <div
                    key={id}
                    className={data.inline ? "form-check-inline" : "form-check"}
                  >
                    <input
                      name={data.multiple ? id : "radio-group"}
                      className="form-check-input"
                      type="radio"
                      checked={aux.selected || id === data.defaultValue}
                      value={aux.selected}
                      id={aux.value}
                      disabled={data.validation.isReadOnly ? "disabled" : ""}
                    />
                    <label className="form-check-label" htmlFor={aux.value}>
                      {aux.title}
                    </label>
                  </div>
                </React.Fragment>
              );
            })
          ) : (
            <div>no hay elementos</div>
          )}
        </div>
      );
    } else if (data.toolType === "PARAGRAPH" || data.toolType === "paragraph") {
      component = (
        <div
          className="col-md-12"
          style={{ border: "1px solid #c8ced3", padding: "10px " }}
        >
          <div className="form-group">
            <label>{data.title}</label>
            <textarea
              className="form-control form-control-sm"
              style={{
                textAlign: data.aling,
                backgroundColor: data.background,
                color: data.colorText,
                fontSize: data.fontSize
              }}
              disabled={data.disabled ? "disabled" : ""}
              readOnly={data.validation.isReadOnly ? "isReadOnly" : ""}
              required={data.validation.isRequired ? "isRequired" : ""}
            >
              {data.content}
            </textarea>
          </div>
        </div>
      );
    } else if (data.type === "date" || data.type === "DATE") {
      component = (
        <div
          className="col-md-12"
          style={{ border: "1px solid  #c8ced3", padding: "10px" }}
        >
          <div className="form-group">
            <label>{data.title}</label>
            <input
              type="date"
              className="form-control form-control-sm"
              max={data.validation.max}
              min={data.validation.min}
              disabled={data.validation.isReadOnly}
            />
          </div>
        </div>
      );
    }
    return component;
  };

  render() {
    const aux = this.state.field;
    return (
      <Modal
        isOpen={this.state.modalPreview}
        // toggle={this.toggle}
      >
        <ModalHeader>
          {" "}
          Metadato {aux.name ? aux.name : "Nombre del metadado"}{" "}
        </ModalHeader>
        <ModalBody>
          <p className="text-justify">
            <i className="fa fa-info-circle" /> &nbsp; El campo que está siendo
            pre visualizado será visible y operará cuando se asigne a la
            plantilla correspondiente y esta a su vez se asocie a un tipo
            documental de radicación en el modulo de configuración.
          </p>
          {this.renderType(aux)}
        </ModalBody>
        <ModalFooter>
          <div className="pull-right">
            <button
              className="btn btn-secondary btn-sm"
              onClick={e => {
                this.setState({ modalPreview: false });
              }}
            >
              <i className="fa fa-times" style={{ color: "red" }} /> Cerrar
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalPreview.propType = {
  inputType: PropTypes.string,
  modalpreview: PropTypes.bool.isRequired
};

export default ModalPreview;
