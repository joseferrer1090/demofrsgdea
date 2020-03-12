import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  METADATA_VIEW,
  METADATA_UPDATE
} from "./../../../../../services/EndPoints";
import { decode } from "jsonwebtoken";

class ModalUpdateMetadata extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalupdate,
      auth: this.props.authorization,
      id: this.props.id,
      data: {}
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
        console.log(data);
      })
      .catch(err => {
        console.log(`${err.message}`);
      });
  };

  render() {
    return (
      <Modal isOpen={this.state.modal} className="modal-xl">
        <ModalHeader>Probando</ModalHeader>
        <ModalBody>
          <p>{this.state.id} </p>
        </ModalBody>
        <ModalFooter>
          <div className="pull-right">
            <button
              type={"button"}
              className="form-control form-control-sm"
              onClick={() => {
                this.setState({
                  modal: false
                });
              }}
            >
              {" "}
              Cerrar
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
