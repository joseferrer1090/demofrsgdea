import React, { Component } from "react";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import Input from "./PreviewMetadata/Input";
import PropTypes from "prop-types";

class ModalAddIndexes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaleditindexes,
      auth: this.props.authorization,
      template: this.props.templateid,
      metadata: this.props.metadataid,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization,
        metadata: props.metadataid,
        template: props.templateid,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization,
      });
    }
    if (this.props.metadataid !== prevProps.metadataid) {
      this.setState({
        metadata: this.props.metadataid,
      });
    }
    if (this.props.templateid !== prevProps.templateid) {
      this.setState({
        template: this.props.templateid,
      });
    }
  }

  toggle = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  render() {
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>Editar valores del Metadato</ModalHeader>
          <ModalBody>
            <form className="form">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      {" "}
                      Formula <span className="text-danger">*</span>{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <div className="card">
                      <div className="card-header">Metadato</div>
                      <div className="card-body">
                        <Input formType="select" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      {" "}
                      Requerido <span className="text-danger">*</span>{" "}
                    </label>
                  </div>
                </div>  
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-outline-success btn-sm">
              <i className="fa fa-pencil" /> Editar índice
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

ModalAddIndexes.propTypes = {
  modaleditindexes: PropTypes.bool.isRequired,
};

export default ModalAddIndexes;
