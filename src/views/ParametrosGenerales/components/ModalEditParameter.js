import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalEditParameter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalEditParameter,
      idParameter: this.props.id,
      dataResult: {},
      auth: this.props.authorization
    };
  }

  static getDerivedStateFromProps(props, state) {}

  componentDidUpdate(prevProps, prevState) {}

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <Modal isOpen={this.state.modal} onClick={() => this.toggle()}>
        <ModalHeader>Probando apenas</ModalHeader>
        <ModalBody>
          <p>Probando</p>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-secondary btn-sm">
            {" "}
            Editar <i className="fa fa-pencil" />{" "}
          </button>
          <button
            className="btn btn-secondary btn-sm"
            type={"button"}
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

ModalEditParameter.propTypes = {
  authorization: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default ModalEditParameter;
